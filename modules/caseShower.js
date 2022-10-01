import {c, ctx} from "../canvas.js";

class Shower {

    constructor(caseToShow,selectOrMoove) {
        this.x  = caseToShow[0,0]*100
        this.y  = caseToShow[1,2]*100
        if (selectOrMoove == true){
            ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
            ctx.fillRect((caseToShow[0,0]*100+0.5),(caseToShow[1,2]*100+0.5),100,100);
        }
        else {
            ctx.fillStyle = "rgba(0, 255, 60, 0.4)"
            ctx.beginPath();
            ctx.arc((caseToShow[0,0]*100+0.5)+50, (caseToShow[1,2]*100+0.5)+50, 50, 0, 2 * Math.PI, false);
            ctx.fill();
        }

    }

    moove(whitePieces,blackPieces){

    }
    draw() {
        
    }
}

export {Shower};