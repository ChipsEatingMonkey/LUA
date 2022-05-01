const WebS = require("ws")
const wss = new WebS.Server({port:8081})

wss.on("connection",ws=>{
    console.log("connection!")
    ws.on("message",msg=>{
        let stringFromData = msg.toString();
        
        if (stringFromData.startsWith("return")){
            wss.broadcast(JSON.stringify({peter:msg.toString()}))
            console.log("Frontend: "+ stringFromData)
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