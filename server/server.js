const {Turtle , OPcodes} = require('../core/turtle.js');
const WebS = require("ws");
const url = require("url");
const fs = require("fs");

const wss = new WebS.Server({port:8081})

let turtleList = [];
//let world = fs.readFileSync('world.json');
wss.on("connection", function connection(ws, req){

    const parameters = url.parse(req.url, true);
    ws.uid = parameters.query.uid; // THIS IS A STRING 
    console.log("connection with: " + ws.uid);
    if (ws.uid.startsWith("0"))  { // this means it's a turtle
        ws.fuelLevel = parseInt(parameters.query.fuelLevel); 
        console.log("its fuelLevel is: " + ws.fuelLevel);
        turtleList.push(new Turtle(ws.uid,[0,0,0], ws.fuelLevel)) // could 2 websockets try 2 change this at the same time? Might crash
        console.log(turtleList)
    }
    ws.isBusy = false;
    ws.msgQueue = [];

    ws.on("message", function (msg){

        ws.isBusy = false;
        let rawData = msg.toString();
        let OPcode = msg.slice(0,4);
        OPcode = OPcode.toString();

        if (ws.msgQueue.length != 0){
            wss.broadcast(ws.uid, ws.msgQueue[0]);
            ws.msgQueue.shift();
        }

        if (OPcode.startsWith("0")){
            let remoteFunctionCall = msg.slice(4);
            remoteFunctionCall = remoteFunctionCall.toString();
            wss.broadcast(turtleList[0].uid , JSON.stringify({rfc:remoteFunctionCall}))
           
            console.log("Frontend: "+ remoteFunctionCall);
        }
        else {
            console.log(ws.uid)
            console.log(rawData)
        }
    })
    function notTurtle (turtle) {
        return !(turtle.uid == ws.uid)
    }
    ws.onclose = function (event) {
        if (ws.uid.startsWith("0"))  {
            console.log(" The connection with " + ws.uid + " has been closed");
            turtleList = turtleList.filter(notTurtle);
            console.log(turtleList);
        };
      }

});



wss.broadcast = function broadcast(clientID, msg){
    wss.clients.forEach(function each(client) {

        if (clientID == client.uid){
            if (client.isBusy){
                console.log("client is busy - adding msg to queue")
                client.msgQueue.push(msg);
            }
            else {
                client.isBusy = true;
                console.log("msg was send")
                client.send(msg);
                return
            }
        }
    });
    console.log("can't find client")
};