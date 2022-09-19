  import {c, ctx} from "../canvas.js";

class King {

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
        var allPieces = whitePieces
        allPieces = allPieces.concat(blackPieces)
        this.possibleMoove = []
        this.x = parseInt(this.x)
        this.y = parseInt(this.y)
        var stop = false

        //norm
        this.possibleMoove.push((this.x)+'.'+(this.y+1))
        this.possibleMoove.push((this.x)+'.'+(this.y-1))
        this.possibleMoove.push((this.x+1)+'.'+(this.y))
        this.possibleMoove.push((this.x-1)+'.'+(this.y))
        //diag
        this.possibleMoove.push((this.x-1)+'.'+(this.y-1))
        this.possibleMoove.push((this.x+1)+'.'+(this.y-1))
        this.possibleMoove.push((this.x-1)+'.'+(this.y+1))
        this.possibleMoove.push((this.x+1)+'.'+(this.y+1))
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
        ctx.fillText(`K`, this.x*100+(25+30/2),this.y*100+55);
    }

}

function checkStop(allPieces,toCheck,stop,x,y){
    for (let i = 0;i<allPieces.length;i++){
        if (allPieces[i].case == toCheck && allPieces[i].case != x+"."+y){
            stop = true
            return stop
        }
    }
    stop = false
    return stop
}

export {King};