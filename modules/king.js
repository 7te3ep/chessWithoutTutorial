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
        this.width = 50
        this.height = 50
        this.possibleMoove = []
        this.case = `${this.x}.${this.y}`
        this.img = new Image();
        this.img.src = "/assets/white/king.png";
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
        var img = this.img
        if (this.white == true){
            this.img.src = "/assets/white/king.png";
        }
        else {
            this.img.src = "/assets/black/king.png";
        }
        this.img.addEventListener("load", (e) => {
              ctx.drawImage(
              img,
              this.x*100+(25),
              this.y*100+25,
              this.width,
              this.height
            );
        })
        ctx.drawImage(
        img,
        this.x*100+(25),
        this.y*100+25,
        this.width,
        this.height
        );
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