import { OPcodes } from '../../core/turtle.js'
console.log(OPcodes)


const ws = new WebSocket("ws://localhost:8081")

const forwardButton = document.getElementById("forward");
const turnRightButton = document.getElementById("turnRight");
const turnLeftButton = document.getElementById("turnLeft");
const backButton = document.getElementById("back");
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const inspectButton = document.getElementById("inspect");
const craftButton = document.getElementById("craft");
const selectButton = document.getElementById("select");
const getItemCountButton = document.getElementById("getItemCount");
const getItemSpaceButton = document.getElementById("getItemSpace");
const getItemDetailButton = document.getElementById("getItemDetail");
const equipLeftButton = document.getElementById("equipLeft");
const digButton = document.getElementById("dig");
const digUpButton = document.getElementById("digUp");
const digDownButton = document.getElementById("digDown");

forwardButton.onclick = forward;
turnRightButton.onclick = turnRight;
turnLeftButton.onclick = turnLeft;
backButton.onclick = back;
upButton.onclick = up;
downButton.onclick = down;
inspectButton.onclick = inspect;
craftButton.onclick = craft;
selectButton.onclick = select;
getItemCountButton.onclick = getItemCount;
getItemSpaceButton.onclick = getItemSpace;
getItemDetailButton.onclick = getItemDetail;
equipLeftButton.onclick = equipLeft;
digButton.onclick = dig;
digUpButton.onclick = digUp;
digDownButton.onclick = digDown;


function forward(){
    ws.send(OPcodes.FORWARD + "return turtle.forward()")
}
function turnRight(){
    ws.send(OPcodes.TURNRIGHT + "return turtle.turnRight()")
}
function turnLeft(){
    ws.send(OPcodes.TURNLEFT + "return turtle.inspect()")
}



ws.addEventListener("message",msg=>{
    console.log(msg.data)
});
