// j'importe l'environement canvas et les classes des pieces

import {c, ctx} from "./canvas.js";
import {Tower} from "./modules/tower.js";
import {Fou} from "./modules/fou.js";
import {Cheval} from "./modules/cheval.js";
import {Queen} from "./modules/queen.js";
import {Pion} from "./modules/pion.js";
import {King} from "./modules/king.js";

// je definis mes variables et arrays
var whitePieces = []
var blackPieces = []
var allPieces =[]
var caseClicked = ''
var pieceSelected = 'none'
var playerPlaying = "black"

// fonction d'init

function setGame(){
    whitePieces = [
        new Tower(true,false,0,0,"Tw0"),
        new Tower(true,false,7,0,"Tw1"),
        new Fou(true,false,5,0,"Fw0"),
        new Fou(true,false,2,0,"Fw1"),
        new Cheval(true,false,1,0,"Cw0"),
        new Cheval(true,false,6,0,"Cw1"),
        new Queen(true,false,4,0,"Qw"),
        new King(true,false,3,0,"Dw")
    ]
    for (let i = 0;i<=7;i++){
        whitePieces.push(new Pion(true,false,i,1,"Pw"+i))
    }

    blackPieces = [
        new Tower(false,true,0,7,"Tb0"),
        new Tower(false,true,7,7,"Tb1"),
        new Fou(false,true,5,7,"fb0"),
        new Fou(false,true,2,7,"fb1"),
        new Cheval(false,true,1,7,"Cb0"),
        new Cheval(false,true,6,7,"Cb1"),
        new Queen(false,true,3,7,"Qb"),
        new King(false,true,4,7,"Db")
    ]
    for (let i = 0;i<=7;i++){
        blackPieces.push(new Pion(false,true,i,6,"Pb"+i))
    }
}

// fonction qui draw une nouvelle frame

function drawAndNextTurn(){
    // clear all
    ctx.clearRect(0, 0, c.width, c.height)

    // white queen alive check
    var whiteHaveQueen = false
    for (let g = 0; g<whitePieces.length; g++) {
        if (whitePieces[g].id[0,0] == "Q"){
            whiteHaveQueen = true
        }
    }
    // black queen alive check
    var blackHaveQueen = false
    for (let g = 0; g<blackPieces.length; g++) {
        if (blackPieces[g].id[0,0] == "Q"){
            blackHaveQueen = true
        }
    }

    // draw all
    for (let i = 0; i<whitePieces.length; i++) {
        if (whitePieces[i].id[0,0] == "P" && whitePieces[i].case[1,2]=="7" && whiteHaveQueen == false){
                whitePieces.push(new Queen(true,false,whitePieces[i].case[0,0],7,"Qw"))
                whitePieces.splice(i, 1)
            }
            whitePieces[i].moove(blackPieces,whitePieces)
            whitePieces[i].draw()
        }

    for (let i = 0; i<blackPieces.length; i++) {
        if (blackPieces[i].id[0,0] == "P" && blackPieces[i].case[1,2]=="0" && blackHaveQueen == false){
            blackPieces.push(new Queen(true,false,blackPieces[i].case[0,0],0,"Qw"))
            blackPieces.splice(i, 1)
        }
        blackPieces[i].moove(blackPieces,whitePieces)
        blackPieces[i].draw()
    }

    // change le joueur qui joue

    if (playerPlaying == "white"){
        playerPlaying = "black"
    }else{
        playerPlaying = "white"
    }
}

function userPlay(){
    redirectAction(whitePieces,blackPieces,playerPlaying)
}

// redirige le deplacement et la select en fonction de la piece cliquer

function redirectAction(whitePieces,blackPieces,playerPlaying){
    if (playerPlaying == "black"){
        for (let i = 0;i<blackPieces.length;i++){
            if (blackPieces[i].case == caseClicked){
                selectBlackPiece(blackPieces,caseClicked,pieceSelected)
            }else{
                mooveBlackPieceSelected(blackPieces,caseClicked,pieceSelected)
            }
        }
    }else{
        for (let i = 0;i<whitePieces.length;i++){
            if (whitePieces[i].case == caseClicked){
                selectWhitePiece(whitePieces,caseClicked,pieceSelected)
            }else{
                mooveWhitePieceSelected(whitePieces,caseClicked,pieceSelected)
            }
        }
    }
}

// fonction qui recupere l'id de la piece cliquer

function selectBlackPiece(blackPieces,caseClicked){
    for (let i = 0;i<blackPieces.length;i++){
        if (blackPieces[i].case == caseClicked){
            pieceSelected = blackPieces[i].id
            caseClicked = "none"
        }
    }
}

function selectWhitePiece(whitePieces,caseClicked){
    for (let i = 0;i<whitePieces.length;i++){
        if (whitePieces[i].case == caseClicked){
            pieceSelected = whitePieces[i].id
            caseClicked = "none"
        }
    }
}

// fonctions de deplacement des pieces

function mooveBlackPieceSelected(blackPieces,caseClicked,pieceSelected){
    for (let i = 0;i<blackPieces.length;i++){
        if (blackPieces[i].id == pieceSelected){
            for (let g = 0;g<blackPieces[i].possibleMoove.length;g++){
                if (caseClicked == blackPieces[i].possibleMoove[g] && checkCollision("black",blackPieces[i].possibleMoove[g],whitePieces,blackPieces)){
                    blackPieces[i].x = caseClicked.substring(0,1)
                    blackPieces[i].y = caseClicked.substring(2,3)
                    blackPieces[i].case =`${blackPieces[i].x}.${blackPieces[i].y}`
                    pieceSelected = "none"
                    drawAndNextTurn()
                    return
                }
            }
        }
    }
}

function mooveWhitePieceSelected(whitePieces,caseClicked,pieceSelected){
    for (let i = 0;i<whitePieces.length;i++){
        if (whitePieces[i].id == pieceSelected){
            for (let g = 0;g<=whitePieces[i].possibleMoove.length;g++){
                if (caseClicked == whitePieces[i].possibleMoove[g] && checkCollision("white",whitePieces[i].possibleMoove[g],whitePieces,blackPieces)){
                    whitePieces[i].x = caseClicked.substring(0,1)
                    whitePieces[i].y = caseClicked.substring(2,3)
                    whitePieces[i].case =`${whitePieces[i].x}.${whitePieces[i].y}`
                    pieceSelected = "none"
                    drawAndNextTurn()
                    return
                }
            }
        }
    }
}

// si deux piece se superpose, modifie le comportement

function checkCollision(pieceColor,caseToCheck,whitePieces,blackPieces){
    for (let i = 0;i<blackPieces.length;i++){
        if (caseToCheck == blackPieces[i].case){
            if (pieceColor == "black"){
                return false
            }else{
                blackPieces.splice(i, 1)
            }
        }
    }
    for (let i = 0;i<whitePieces.length;i++){
        if (caseToCheck == whitePieces[i].case){
            if (pieceColor == "white"){
                return false
            }else {
                whitePieces.splice(i, 1)
            }
        }
    }
    return true
}

// recupere le click dans le navigateur et les coordonnés dans le canvas
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    var x = event.clientX - rect.left
    var y = event.clientY - rect.top
    x = (100*Math.floor(x/100))/100
    y = (100*Math.floor(y/100))/100
    caseClicked = x+"."+y
    userPlay()
}

const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

// lance le jeux

setGame()
drawAndNextTurn()