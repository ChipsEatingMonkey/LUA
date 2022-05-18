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
    ws.send(JSON.stringify({"instruction": OPcodes.TURNRIGHT, "rfc" : "return turtle.turnRight()"}))
}
function turnLeft(){
    ws.send(JSON.stringify({"instruction": OPcodes.TURNLEFT, "rfc" : "return turtle.turnLeft()"}))
}
function back(){
    ws.send(JSON.stringify({"instruction": OPcodes.BACK, "rfc" : "return turtle.back()"}))
}
function up(){
    ws.send(JSON.stringify({"instruction": OPcodes.UP , "rfc" : "return turtle.up()"}))
}
function down(){
    ws.send(JSON.stringify({"instruction": OPcodes.DOWN, "rfc" : "return turtle.down()"}))
}
function inspect(){
    ws.send(JSON.stringify({"instruction": OPcodes.INSPECT, "rfc" : "return turtle.inspect()"}))
}
function craft(){
    ws.send(JSON.stringify({"instruction": OPcodes.CRAFT , "rfc" : "return turtle.craft()"}))
}
function select(){
    ws.send(JSON.stringify({"instruction": OPcodes.SELECT, "rfc" : "return turtle.select()"}))
}
// function getItemCount(){
//     ws.send(OPcodes.GETITEMCOUNT + "return turtle.getItemCount()")
// }
// function getItemSpace(){
//     ws.send(OPcodes.GETITEMSPACE + "return turtle.getItemSpace()")
// }
// function getItemDetail(){
//     ws.send(OPcodes.GETITEMDETAIL + "return turtle.getItemDetail()")
// }
// function equipLeft(){
//     ws.send(OPcodes.EQUIPLEFT + "return turtle.equipLeft()")
// }
function dig(){
    ws.send(JSON.stringify({"instruction": OPcodes.DIG , "rfc" : "return turtle.dig()"}))
}
function digUp(){
    ws.send(JSON.stringify({"instruction": OPcodes.DIGUP, "rfc" : "return turtle.digUp()"}))
   
}
function digDown(){
    ws.send(JSON.stringify({"instruction": OPcodes.DIGDOWN, "rfc" : "return turtle.forward()"}))
}
// function doubleLeft(){
//     ws.send(OPcodes.TURNLEFT + "return turtle.getItemDetail()")
// }


ws.addEventListener("message",msg=>{
    console.log(msg.data)
});
