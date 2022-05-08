// https://www.youtube.com/watch?v=TDC4aEKD7-I&ab_channel=Wirdymgar
const OPcodes = {
    //all turtle OPcodes start with 0
    FORWARD: '0001',
    TURNRIGHT: '0002',
    TURNLEFT: '0003',
    BACK: '0004',
    UP: '0005',
    DOWN: '0006',
    INSPECT: '0007',
    CRAFT: '0008',
    SELECT: '0009',
    GETITEMCOUNT: '0010',
    GETITEMSPACE: '0011',
    GETITEMDETAIL: '0012',
    EQUIPLEFT: '0013',
    DIG: '0014',
    DIGUP: '0015',
    DIGDOWN: '0016',
    };

class Turtle {
    
    constructor(uid, pos, fuelLevel) {
      this.uid = uid;
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