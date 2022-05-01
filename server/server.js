const {Turtle , OPcodes} = require('../core/turtle.js');

const WebS = require("ws")
const wss = new WebS.Server({port:8081})

wss.on("connection",ws=>{
    console.log("connection!")
    ws.on("message",msg=>{
        let stringFromData = msg.toString();
        let OPcode = msg.slice(0,4);
        msg = msg.slice(4);
        if (stringFromData.startsWith("0")){
            wss.broadcast(JSON.stringify({peter:msg.toString()}))
            console.log(JSON.stringify({peter:msg.toString()}));
            console.log("Frontend: "+ stringFromData);
        }
        else {
            console.log("Turtle: ")
            console.log(stringFromData)
        }
    })

});

wss.broadcast = function broadcast(msg){
    wss.clients.forEach(function each(client) {
        client.send(msg)
    });
};