import { OPcodes } from '../../core/turtle.js'


const ws = new WebSocket("ws://localhost:8081?uid=9999")

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
const doubleLeftButton = document.getElementById("180");

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
doubleLeftButton.onclick = doubleLeft;


function forward(){
    ws.send(JSON.stringify({"instruction": OPcodes.FORWARD, "rfc" : "return turtle.forward()"}))
}
function turnRight(){
    ws.send(OPcodes.TURNRIGHT + "return turtle.turnRight()")
}
function turnLeft(){
    ws.send(OPcodes.TURNLEFT + "return turtle.turnLeft()")
}
function back(){
    ws.send(OPcodes.BACK + "return turtle.back()")
}
function up(){
    ws.send(OPcodes.UP + "return turtle.up()" )
}
function down(){
    ws.send(OPcodes.DOWN + "return turtle.down()")
}
function inspect(){
    ws.send(OPcodes.INSPECT + "return turtle.inspect()")
}
function craft(){
    ws.send(OPcodes.CRAFT + "return turtle.craft()")
}
function select(){
    ws.send(OPcodes.SELECT + "return turtle.select()")
}
function getItemCount(){
    ws.send(OPcodes.GETITEMCOUNT + "return turtle.getItemCount()")
}
function getItemSpace(){
    ws.send(OPcodes.GETITEMSPACE + "return turtle.getItemSpace()")
}
function getItemDetail(){
    ws.send(OPcodes.GETITEMDETAIL + "return turtle.getItemDetail()")
}
function equipLeft(){
    ws.send(OPcodes.EQUIPLEFT + "return turtle.equipLeft()")
}
function dig(){
    ws.send(OPcodes.DIG + "return turtle.dig()")
}
function digUp(){
    ws.send(OPcodes.DIGUP + "return turtle.digUp()")
}
function digDown(){
    ws.send(OPcodes.DIGDOWN + " return turtle.digDown()")
}
function doubleLeft(){
    ws.send(OPcodes.TURNLEFT + "return turtle.getItemDetail()")
}


ws.addEventListener("message",msg=>{
    console.log(msg.data)
});
