const {Turtle , OPcodes} = require('../core/turtle.js');

const WebS = require("ws")
const wss = new WebS.Server({port:8081})

wss.on("connection",ws=>{
    console.log("connection!")
    console.log(" ws url is: ");
    console.log(ws.url);
    ws.on("message",msg=>{

        let rawData = msg.toString();
        let OPcode = msg.slice(0,4);
        OPcode = OPcode.toString();

        if (OPcode.startsWith("0")){
            let remoteFunctionCall = msg.slice(4);
            remoteFunctionCall = remoteFunctionCall.toString();
            wss.broadcast(JSON.stringify({peter:remoteFunctionCall}))
            console.log("Frontend: "+ remoteFunctionCall);
        }
        else {
            console.log("Turtle: ")
            console.log(rawData)
        }
    })

});

wss.broadcast = function broadcast(msg){
    wss.clients.forEach(function each(client) {
        client.send(msg)
    });
};