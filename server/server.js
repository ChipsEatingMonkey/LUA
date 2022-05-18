var {Turtle , OPcodes} = require('../core/turtle.js');
const WebS = require("ws");
const url = require("url");
const fs = require("fs");
const { parse } = require('path');

const wss = new WebS.Server({port:8081})

function finishedWriting(err){
    console.log("done writing file ")
    // if (err){
    //     console.log(err)
    // }
}
var turtleList = [];
let msgCount = 0;

//let world = fs.readFileSync('world.json');
wss.on("connection", function connection(ws, req){

    const parameters = url.parse(req.url, true);
    ws.uid = parameters.query.uid; // THIS IS A STRING 
    console.log("connection with: " + ws.uid);
    if (ws.uid.startsWith("0"))  { // this means it's a turtle
        ws.fuelLevel = parseInt(parameters.query.fuelLevel); 
        console.log("its fuelLevel is: " + ws.fuelLevel);
        // check for tutle on database // memory first
        fs.open("./turtle_DB/"+ws.uid+".json", function(err, fd){
            if (fd){
                console.log("file descriptor found: ", fd);
                let file = fs.readFileSync("./turtle_DB/"+ws.uid+".json");
                let turtleFromFile = JSON.parse(file);
                turtleFromFile.fuelLevel = ws.fuelLevel;
                  turtleList.push(turtleFromFile)
            }
            else {
                if (err){
                   // console.log("error : ",err)
                    turtleList.push(new Turtle(ws.uid,[-363, 69, -147], ws.fuelLevel))
                    json_turtle = JSON.stringify(turtleList[turtleList.length-1])
                    fs.writeFile("./turtle_DB/"+ws.uid+".json",json_turtle, finishedWriting );
                }
            }

            console.log(" turtleList after new connection is: ", turtleList)
        });
        //turtleList.push(new Turtle(ws.uid,[-363, 69, -147], ws.fuelLevel)) // could 2 websockets try 2 change this at the same time? Might crash
        
    }
    ws.isBusy = false;
    ws.msgQueue = [];

    ws.on("message", function (msg){

        ws.isBusy = false;
        let parsedMsg = JSON.parse(msg);
        let rawData = msg.toString();
        let OPcode = parsedMsg.instruction;

        if (ws.msgQueue.length != 0){
            wss.broadcast(ws.uid, ws.msgQueue[0]);
            ws.msgQueue.shift();
        }

        if (OPcode){ // if true this is a Msg from the frontend
            let remoteFunctionCall = parsedMsg.rfc;
            wss.broadcast(turtleList[0].uid , JSON.stringify({rfc:remoteFunctionCall,code:OPcode}))
           
            console.log("Frontend: "+ JSON.stringify({rfc:remoteFunctionCall,code:OPcode}));
        }
        if (parsedMsg.code){ // if true this is a response from a turtle
            for (let i = 0; i < turtleList.length; i++){ 
                if (turtleList[i].uid = ws.uid){
                  turtleList[i].update(parsedMsg.code);
                  console.log(turtleList[i])
                }
            }
        }
                
    })
    function notTurtle (turtle) {
        return !(turtle.uid == ws.uid)
    }
    ws.onclose = function (event) {
        if (ws.uid.startsWith("0"))  {
            console.log(" The connection with " + ws.uid + " has been closed");
            // save data to file/database
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
};