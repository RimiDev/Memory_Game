"use strict";

var midPics =
 [
    "elephant.png",
    "giraffe.png",
    "kangaroo.png",
    "kitty.png",
    "lion.png",
    "monkey.png",
    "rhino.png",
    "tiger.png",
    "elephant.png",
    "giraffe.png",
    "kangaroo.png",
    "kitty.png",
    "lion.png",
    "monkey.png",
    "rhino.png",
    "tiger.png"
  ];


var alreadyInBoard = [];

var topPics =
  [
    "A.png",
    "B.png",
    "C.png",
    "D.png",
    "E.png",
    "F.png",
    "G.png",
    "H.png",
    "I.png",
    "J.png",
    "K.png",
    "L.png",
    "M.png",
    "N.png",
    "O.png",
    "P.png",
  ];

  var keypresses =
  {A:"0",B:"1",C:"2",D:"3",E:"4",F:"5",G:"6",H:"7",I:"8",
   J:"9",K:"10",L:"11",M:"12",N:"13",O:"14",P:"15"};

var turns = 0;
var tileCount = 0;
var firstTileClicked;
var secondTileClicked;
var img1;
var img2;
var tempImg;
var tile1;
var tile2;
var input1Img;
var input2Img;
var input1;
var input2;
var midlayer;
var toplayer;
var newGame = false;

function preloadMid() {
if(newGame){
  var elements = document.getElementById('middlelayerDIV').getElementsByTagName('img');
  for(var i = 0; i<elements.length; i++){
    var random = (Math.floor(Math.random() * 16)) + 0;
    if (!checktwoimg(random,alreadyInBoard)){
        alreadyInBoard.push(random);
        elements[i].src =  "images/" + midPics[random];
        elements[i].height = 200;
        elements[i].width = 200;
  }else{
    i--;
  }
}
}else{
console.log("DOM LOADED");
for (var i = 0; i < 16; i++){
  var random = (Math.floor(Math.random() * 16)) + 0;
    if (!checktwoimg(random,alreadyInBoard)){
        alreadyInBoard.push(random);
        var img = document.createElement("img");
        img.src = "images/" + midPics[random];
        img.height = 200;
        img.width = 200;
        var div = document.getElementById("animal" + i);
        div.appendChild(img);
    }else{
      i--;
    }
  }
}
}

function removeImages() {
  var elements = document.getElementById('middlelayerDIV').getElementsByTagName('img');
  var elements2 = document.getElementById('toplayerDIV').getElementsByTagName('img');
  for (var i = 0; i < elements.length; i++){
    elements2[i].style.display = 'none';
  }
}



function checktwoimg(random,alreadyInBoard){
  for (var i = 0; i < alreadyInBoard.length; i++){
    if (random == alreadyInBoard[i]){
      return true;
    }

  }
    return false;
}

function preloadTop() {
  for (var i = 0; i < 16; i++){
    var img = document.createElement("img");
    img.src = "images/" + topPics[i];
    img.height = 200;
    img.width = 200;
    var div = document.getElementById("tile" + i);
    div.appendChild(img);
 }
}

function playAgain() {
  newGame = true;
  removeImages();
  firstTileClicked = undefined;
  secondTileClicked = undefined;
  img1 = undefined;
  img2 = undefined;
  input1 = undefined;
  input2 = undefined;
  alreadyInBoard = [];
  for (var i = 0; i < 16; i++){
    document.getElementById('animal' + i).style.visibility = "visible";
    document.getElementById('tile' + i).style.visibility = "visible";
  }
  preloadTop();
  preloadMid();
  turns = 0;
  updateTurns();
}

function endGame(){
for (var i = 0; i < 16; i++){
  document.getElementById('animal' + i).style.visibility = "visible";
  //document.getElementById(toplayer).firstChild.getAttribute("src").style.visibility = "visible";
}

}

function updateTurns(){
  document.getElementById("turn").innerHTML = "TURNS: " + turns;
}

function clickTile(e){
if(e.type == "click"){
  if (!firstTileClicked)
  {
    input1 = e.target
    input1.style.visibility = "hidden";
    tile1 = input1.parentElement.id;
    console.log("tile1 = "+tile1);
    tempImg = "animal" + tile1.substring(4,6);
    console.log("temImag = "+tempImg);
    firstTileClicked = tempImg;
    console.log("firstTile"+firstTileClicked);
    img1 = document.getElementById(firstTileClicked).firstChild.getAttribute("src");
    console.log("img="+img1);

  }else{
    input2 = e.target;
    input2.style.visibility = "hidden";
    tile2 = input2.parentElement.id;
    tempImg = "animal" + tile2.substring(4,6);
    secondTileClicked = tempImg;
    img2 = document.getElementById(secondTileClicked).firstChild.getAttribute("src");
    document.getElementById('toplayerDIV').removeEventListener("click", clickTile);
    setTimeout(checkIfTwoMatching, 1000);
  }

}else{

    if (!firstTileClicked){
      input1 = e.key;
      input1 = input1.toUpperCase();
      var tile1 = keypresses[input1];
      input1Img = document.getElementById('tile' + tile1);
      input1Img.style.visibility = "hidden";
      tempImg = "animal" + tile1;
      firstTileClicked = tempImg;
      img1 = document.getElementById(firstTileClicked).firstChild.getAttribute("src");
      input1 = input1Img;
    }else{
      input2 = e.key;
      input2 = input2.toUpperCase();
      var tile2 = keypresses[input2];
      input2Img = document.getElementById('tile' + tile2);
      input2Img.style.visibility = "hidden";
      tempImg = "animal" + tile2;
      secondTileClicked = tempImg;
      img2 = document.getElementById(secondTileClicked).firstChild.getAttribute("src");
      input2 = input2Img;
      setTimeout(checkIfTwoMatching, 1000);
      }

    }
}

function checkIfTwoMatching(){
  if (img1 === img2){
    document.getElementById(firstTileClicked).style.visibility = "hidden";
    document.getElementById(secondTileClicked).style.visibility = "hidden";
    firstTileClicked = undefined;
    secondTileClicked = undefined;
    document.getElementById('toplayerDIV').addEventListener("click", clickTile);
    turns++;
    updateTurns();
  } else {
    input1.style.visibility = "visible";
    input2.style.visibility = "visible";
    firstTileClicked = undefined;
    secondTileClicked = undefined;
    document.getElementById('toplayerDIV').addEventListener("click", clickTile);
    turns++;
    updateTurns();

  }
}


document.addEventListener("DOMContentLoaded", function(){
preloadMid();
preloadTop();
updateTurns();
document.getElementById('toplayerDIV').addEventListener("click", clickTile);
document.addEventListener("keydown", clickTile);
document.getElementById('endButton').addEventListener("click", endGame);
document.getElementById('playAgainButton').addEventListener("click", playAgain);
});
