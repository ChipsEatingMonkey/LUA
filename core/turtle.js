// https://www.youtube.com/watch?v=TDC4aEKD7-I&ab_channel=Wirdymgar
const OPcodes = {
    //all turtle OPcodes start with 0
    FORWARD: 1,
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
      this.pos = pos; // x,y,z
      this.dir = [1,0]; // [x,y] [1,0] is looking in x, [0,1] in y, [-1,0] in -x and [0,1] in -y
      this.dirCode = 0; // 0 , 1 , 2 , 3
      this.fuelLevel = fuelLevel;
    }
    updateTurtle(OPcode){ // takes opcode to update turtle variables 
        switch (OPcode){
            case OPcodes.FORWARD:
                this.forward();
                break;
            case OPcodes.TURNRIGHT:
                this.turnRight();
                break;
            case OPcodes.TURNLEFT:
                this.turnLeft();
                break;
            case OPcodes.BACK:
                this.back();
                break;
            case OPcodes.UP:
                this.up();
                break;
            case OPcodes.DOWN:
                this.down();
                break;
        }
    }
    
    turnRight(){
        switch(this.dirCode){  // 0->1->2->3 [1,0]->[0,1]->[-1,0]->[0,-1]->[1,0]
            case 0:
                this.dir = [0,1];
                this.dirCode = 1;
                break;
            case 1:
                this.dir = [-1,0];
                this.dirCode = 2;
                break;
            case 2:
                this.dir = [0,-1];
                this.dirCode = 3;
                break;
            case 3:
                this.dir = [1,0];
                this.dirCode = 0;
                break;
            default:
                console.log("You broke the Matrix NEO");
        }
    }
    turnLeft(){
        switch(this.dirCode){ //[1,0]<-[0,1]<-[-1,0]<-[0,-1]<-[1,0] 0<-1<-2<-3
            case 0:
                this.dir = [0,-1];
                this.dirCode = 3;
                break;
            case 3:
                this.dir = [-1,0];
                this.dirCode = 2;
                break;
            case 2:
                this.dir = [0,1];
                this.dirCode = 1;
                break;
            case 1:
                this.dir = [1,0];
                this.dirCode = 0;
                break;
            default:
                console.log("You broke the Matrix NEO");
        }
    }
    forward(){
        this.pos[0] += this.dir[0]
        this.pos[2] += this.dir[1]
        console.log(" turtle pos now: ", this.pos)
    }
    back(){
        this.pos[0] -= this.dir[0]
        this.pos[2] -= this.dir[1]
        console.log(" turtle pos now: ", this.pos)
    }
    up(){
        this.pos[1] += 1
        console.log(" turtle pos now: ", this.pos)
    }
    down(){
        this.pos[1] -= 1
        console.log(" turtle pos now: ", this.pos)
    }
  }

  module.exports = {
      Turtle,
      OPcodes,
  }