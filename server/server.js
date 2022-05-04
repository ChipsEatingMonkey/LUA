const {Turtle , OPcodes} = require('../core/turtle.js');

const WebS = require("ws")
const wss = new WebS.Server({port:8081})

wss.on("connection", function connection(ws, req){

    //https://myhost:8081?isFrontend=true&uid=9999
    const parameters = url.parse(req.url, true);
    ws.uid = parameters.query.uid;
    ws.isFrontend = parameters.query.isFrontend;
    console.log("connection with: " + ws.uid + " , is frontend: " + ws.isFrontend);
    console.log ("types are:");
    console.log(typeof(ws.uid));
    console.log(typeof(ws.isFrontend));

    ws.on("message", function (msg){

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