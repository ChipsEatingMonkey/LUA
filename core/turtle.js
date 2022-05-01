
const OPcodes = {
    //assinging values to constants
    FORWARD: '0001',
    RIGHT: '0002',
    BACK: '0003',
    LEFT: '0004',
    INSPECT: '0005',
    PURPLE: '0006',
    ORANGE: '0007',
    NAVY: '0008'
    };

class Turtle {
    
    constructor(name, pos, fuelLevel) {
      this.name = name;
      this.pos = pos;
      this.fuelLevel = fuelLevel;
    }
    updateTurtle(turtleResponse){ // takes string the turtle returns to server and parse it 

    }
    
    updatePos(x, y, z){
        this.pos[0] += x;
        this.pos[1] += y;
        this.pos[2] += z;
    }
  }

  module.exports = {
      Turtle,
      OPcodes,
  }