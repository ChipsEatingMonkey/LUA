const {Turtle , OPcodes} = require('../core/turtle.js');

const WebS = require("ws")
const url = require("url");
const wss = new WebS.Server({port:8081})
wss.on("connection", function connection(ws, req){

    //https://myhost:8081?isFrontend=true&uid=9999
    const parameters = url.parse(req.url, true);
    ws.uid = parameters.query.uid; // THIS IS A STRING 
    // ws.isFrontend = parameters.query.isFrontend;
    console.log("connection with: " + ws.uid);
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
            wss.broadcast("04", JSON.stringify({rfc:remoteFunctionCall}))
           
            console.log("Frontend: "+ remoteFunctionCall);
        }
        else {
            console.log(ws.uid)
            console.log(rawData)
        }
    })

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
                client.send(msg);
            }
            return
        }
    });
};