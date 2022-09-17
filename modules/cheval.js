  import {c, ctx} from "../canvas.js";

class Cheval {

    constructor(white,black,x,y,id) {
        this.id = id
        this.black = black
        this.white = white
        this.lignes = 8
        this.colonnes = 8
        this.x = x
        this.y = y
        this.width = 30
        this.height = 50
        this.possibleMoove = []
        this.case = `${this.x}.${this.y}`
    }

    moove(whitePieces,blackPieces){
        this.possibleMoove = []
        this.x = parseInt(this.x)
        this.y = parseInt(this.y)
        this.possibleMoove.push(/*top rigth*/(this.x+1)+"."+(this.y+2))
        this.possibleMoove.push(/*top left*/(this.x-1)+"."+(this.y+2))
        this.possibleMoove.push(/*left top*/(this.x-2)+"."+(this.y+1))
        this.possibleMoove.push(/*left bottom*/(this.x-2)+"."+(this.y-1))
        this.possibleMoove.push(/*bottom left*/(this.x-1)+"."+(this.y-2))
        this.possibleMoove.push(/*bottom right*/(this.x+1)+"."+(this.y-2))
        this.possibleMoove.push(/*right bottom*/(this.x+2)+"."+(this.y-1))
        this.possibleMoove.push(/*right top*/(this.x+2)+"."+(this.y+1))
    }
// il faut modifier pour ajouter des moove en partant de la piece d'echec
    draw() {
        if (this.white == true){
            ctx.fillStyle = 'lightGrey';
        }
        else {
            ctx.fillStyle = 'black';
        }
        ctx.fillRect(this.x*100+(25+30/2-5),this.y*100+25, this.width,this.height);
        ctx.font = "bold 20px arial";
        ctx.fillStyle = "blue";
        ctx.fillText(`C`, this.x*100+(25+30/2),this.y*100+55);

    }

}


export {Cheval};