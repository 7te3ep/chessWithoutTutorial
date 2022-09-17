

import {c, ctx} from "./canvas.js";
import {Tower} from "./modules/tower.js";
import {Fou} from "./modules/fou.js";
import {Cheval} from "./modules/cheval.js";
import {Queen} from "./modules/queen.js";

var whitePieces = []
var blackPieces = []
var allPieces =[]
var caseClicked = ''
var pieceSelected = 'none'
var playerPlaying = "black"

function setGame(){
    whitePieces = [
        new Tower(true,false,0,0,"Tw0"),
        new Tower(true,false,7,0,"Tw1"),
        new Fou(true,false,6,0,"Fw0"),
        new Fou(true,false,1,0,"Fw1"),
        new Cheval(true,false,2,0,"Cw0"),
        new Cheval(true,false,5,0,"Cw1"),
        new Queen(true,false,4,0,"Qw")
    ]

    blackPieces = [
        new Tower(false,true,0,7,"Tb0"),
        new Tower(false,true,7,7,"Tb1"),
        new Fou(false,true,6,7,"fb0"),
        new Fou(false,true,1,7,"fb1"),
        new Cheval(false,true,2,7,"Cb0"),
        new Cheval(false,true,5,7,"Cb1"),
        new Queen(false,true,3,7,"Qb")
    ]
}

function drawAndNextTurn(){
    ctx.clearRect(0, 0, c.width, c.height)
    for (let i = 0; i<whitePieces.length; i++) {
        whitePieces[i].moove(blackPieces,whitePieces)
        whitePieces[i].draw()
    }
    for (let i = 0; i<blackPieces.length; i++) {
        blackPieces[i].moove(blackPieces,whitePieces)
        blackPieces[i].draw()
    }
    if (playerPlaying == "white"){
        playerPlaying = "black"
    }else{
        playerPlaying = "white"
    }
}

function userPlay(){
    redirectAction(whitePieces,blackPieces,playerPlaying)
}



setGame()
drawAndNextTurn()


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