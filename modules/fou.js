  import {c, ctx} from "../canvas.js";

class Fou {

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
        this.img.src = "/assets/white/tower.png";
    }

    moove(whitePieces,blackPieces){
        var allPieces = whitePieces
        allPieces = allPieces.concat(blackPieces)
        this.possibleMoove = []
        this.x = parseInt(this.x)
        this.y = parseInt(this.y)
        var stop = false

        var dx = this.x
        var dy = this.y
        stop = false
        // bottom left
        while (0<=dx && dx<=7 & 0<=dy && dy<=7 && stop == false){
                dx = dx + 1
                dy = dy + 1
                if (dx<=7 && dy<=7){
                    this.possibleMoove.push(dx+"."+dy)
                    stop = checkStop(allPieces,dx+"."+dy,stop,this.x,this.y)
                }
        }
        dx = this.x
        dy = this.y
        stop = false
        // top left
        while (0<=dx && dx<=7 & 0<=dy && dy<=7 && stop == false){
            dx = dx + 1
            dy = dy - 1
            if (dx<=7 && dy<=7){
                this.possibleMoove.push(dx+"."+dy)
                stop = checkStop(allPieces,dx+"."+dy,stop,this.x,this.y)
            }
        }
        dx = this.x
        dy = this.y
        stop = false
        // bottom right
        while (0<=dx && dx<=7 & 0<=dy && dy<=7 && stop == false){
            dx = dx - 1
            dy = dy + 1
            if (dx<=7 && dy<=7){
                this.possibleMoove.push(dx+"."+dy)
                stop = checkStop(allPieces,dx+"."+dy,stop,this.x,this.y)
            }
        }
        dx = this.x
        dy = this.y
        stop = false
        // top right
        while (0<=dx && dx<=7 & 0<=dy && dy<=7 && stop == false){
            dx = dx - 1
            dy = dy - 1
            if (dx<=7 && dy<=7){
                this.possibleMoove.push(dx+"."+dy)
                stop = checkStop(allPieces,dx+"."+dy,stop,this.x,this.y)
            }
        }
        dx = this.x
        dy = this.y
        
    }
// il faut modifier pour ajouter des moove en partant de la piece d'echec
    draw() {
        var img = this.img
        if (this.white == true){
            this.img.src = "/assets/white/bishop.png";
        }
        else {
            this.img.src = "/assets/black/bishop.png";
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

export {Fou};