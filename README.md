me no liky ze WEB

Instructions: 

cd server

node server.js

new terminal : cd trash-frontend

npm start

open Minecraft with CC:Tweaked MOD
build turtle
pastebin turtlePrograms/startup.lua on the turtle (current is: pastebin get YMNdX3EZ startup.lua )

turn it off and on again

profit

TO DO: 
    ✓ make turtle object on server on connection 
    ✓ update turtle object list on turtle disconnect
    ✓ write data about turtle to json filebase
    ✓ load data from filebase if 
    - make frontend to server communication with json so the code is more readable
    - update internal database of turtle position upon the turtleresponse
    - add a movelist to turtles of moves of the performed to have a easy path back to start
    - give turtles specific roles: queen ( spawns more turtles ), sorter (sorts chest of coal / not coal), miner(clears blocks and gives them to sorter), builder (takes blocks from sorter and builds them)
    - make a function that takes in a 3D model and gives out instructions to builders to build that model
