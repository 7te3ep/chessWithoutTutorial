  import {c, ctx} from "../canvas.js";

class Pion {

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
        this.baseCases = `${this.x}.${this.y}`
        this.firsPlay = true
        this.img = new Image();
        this.img.src = "/assets/white/tower.png";
    }

    moove(whitePieces,blackPieces){
        if (this.baseCases != this.case){
            this.firsPlay = false
        }
        var allPieces = whitePieces
        allPieces = allPieces.concat(blackPieces)
        this.possibleMoove = []
        this.x = parseInt(this.x)
        this.y = parseInt(this.y)
        var canAdvance = false
        var dy = this.y
        var dx = this.x

        canAdvance = eatCheck(whitePieces,blackPieces,this.x,this.y,this.white,this.possibleMoove,this.firstPlay)
        //white
        if (this.white == true){
            // first play 2 cases
            if (this.firsPlay == true && canAdvance == false){
                dy = dy + 2
                this.possibleMoove.push(this.x+"."+dy)
                dy = this.y
            }
            dy = dy + 1
            dx = this.x
            if (canAdvance == false){
                this.possibleMoove.push(dx+"."+dy)
            }
        }
        //black
        else {
            // first play 2 cases
            if(this.firsPlay == true){
                dy = dy - 2
                this.possibleMoove.push(this.x+"."+dy)
                dy = this.y
            }
            dy = dy - 1 
            dx = this.x
            if (canAdvance == false){
                this.possibleMoove.push(dx+"."+dy)
            }
        }
        
    }
// il faut modifier pour ajouter des moove en partant de la piece d'echec
    draw() {
        var img = this.img
        if (this.white == true){
            this.img.src = "/assets/white/pawn.png";
        }
        else {
            this.img.src = "/assets/black/pawn.png";
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

function eatCheck(blackPieces,whitePieces,x,y,color,possibleMoove,firstPlay){
    var check = false
    if (color == true){
        // blanc
        for (let i = 0;i<blackPieces.length;i++){
            if (blackPieces[i].case == (x+1)+"."+(y+1)||blackPieces[i].case == (x-1)+"."+(y+1)){
                possibleMoove.push(blackPieces[i].case)
            }
            if (blackPieces[i].case == (x)+"."+(y+1)){
                check = true
            }
            if (blackPieces[i].case == (x)+"."+(y+2)&& firstPlay == true){
                check = true
            }
        }
    }else {
        // blanc
        for (let i = 0;i<whitePieces.length;i++){
            if (whitePieces[i].case == (x+1)+"."+(y-1)||whitePieces[i].case == (x-1)+"."+(y-1)){
                possibleMoove.push(whitePieces[i].case)
            }
            if (whitePieces[i].case == (x)+"."+(y-1)){
                check = true
            }
            if (whitePieces[i].case == (x)+"."+(y-2)&& firstPlay == true){
                check = true
            }
        }
    }
    return check
}

export {Pion};