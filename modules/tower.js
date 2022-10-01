  import {c, ctx} from "../canvas.js";

class Tower {

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
        var allPieces = []
        allPieces = whitePieces.concat(blackPieces)
        this.possibleMoove = []
        this.x = parseInt(this.x)
        this.y = parseInt(this.y)
        var stop = false

        // add on right axis
        for (let i = 0; i<8; i++) {
            if ((this.x+i)+"."+this.y != this.case && stop == false) {
                stop = checkStop(allPieces,(this.x+i)+"."+this.y,stop,this.x,this.y)
                this.possibleMoove.push((this.x+i)+"."+this.y)
            }
        }
        
        // add on left axis
        stop = false

        for (let i = 0; i<8; i++) {
            if ((this.x-i)+"."+this.y != this.case && stop == false) {
                stop = checkStop(allPieces,(this.x-i)+"."+this.y,stop,this.x,this.y)
                this.possibleMoove.push((this.x-i)+"."+this.y)
            }
        }
        // add on bottom axis
        stop = false

        for (let i = 0; i<8;i++) {
            if (this.x+"."+(this.y+i) != this.case && stop == false) {
                stop = checkStop(allPieces,this.x+"."+(this.y+i),stop,this.x,this.y)
                this.possibleMoove.push(this.x+"."+(this.y+i))
            }
        }
        // add on top axis
        stop = false

        for (let i = 0; i<8;i++) {
            if (this.x+"."+(this.y-i) != this.case && stop == false) {
                stop = checkStop(allPieces,this.x+"."+(this.y-i),stop,this.x,this.y)
                this.possibleMoove.push(this.x+"."+(this.y-i))
            }
        }
    }
// il faut modifier pour ajouter des moove en partant de la piece d'echec
    draw() {
        var img = this.img
        if (this.white == true){
            this.img.src = "/assets/white/tower.png";
        }
        else {
            this.img.src = "/assets/black/tower.png";
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

export {Tower};