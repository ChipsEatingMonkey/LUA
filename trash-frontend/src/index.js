import { OPcodes } from '../../core/turtle.js'
console.log(OPcodes)


const ws = new WebSocket("ws://localhost:8081")

const forwardButton = document.getElementById("forward");
forwardButton.onclick = moveTurtleForward;

const rButton = document.getElementById("r");
rButton.onclick = turnTurtleRight;

const iButton = document.getElementById("i");
iButton.onclick = turtleInspect;

function moveTurtleForward(){
    ws.send(OPcodes.FORWARD + "return turtle.forward()")
}
function turnTurtleRight(){
    ws.send(OPcodes.RIGHT + "return turtle.turnRight()")
}
function turtleInspect(){
    ws.send(OPcodes.INSPECT + "return turtle.inspect()")
}        
ws.addEventListener("message",msg=>{
    console.log(msg.data)
});
