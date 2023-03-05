import blocks from "./Blocks.js";
import { blockWidth, blockHeight, p } from "./Blocks.js";

const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockCountDisplay = document.querySelector('#blocksRemain')
const startButton = document.querySelector("#start");
const restartButton = document.querySelector("#restart");
//blockWidth + blcokHeight was in this file but adjustments were made and it didnt match user so new variables
const userBlockWidth = 50;
const userBlockHeight = 10;
const boardWidth = 560;
const boardHeight = 550;

let ballSpeed = 10 //hardcoding initial value but is there a beter way?
let totalBlocksRemaining = p;
let m = false // utilizing for mouse control

// YO THIS SHIT IS FUCKING ANNOYING WAS TRYING TO INSPECT DETAILS OF THIS WEBSITE BUT THIS SHIT PREVENTED ME
//document.addEventListener('contextmenu', event => event.preventDefault());
const colors = [
  "#FD0318",
  "#03FD23",
  "#BA00FF",
  "#05CEFB",
  "#0528FB",
  "#000000",
  "yellow",
  "teal",
  "pink",
];

let timerId;
let ballStartID = true
let xDirection = -2;
let yDirection = 2;
let score = 0;

const userStart = [260, 10];
let currentPosition = userStart;

let ballStart = [currentPosition[0] + 17, currentPosition[1] + 10];
const ballDiameter = 15;
let ballCurrentPosition = ballStart;




// audio files / control
  let aud = {
    hit: new Audio("audio/bingbong.mp3"), //youtube
    gO: new Audio("audio/GameOver.mp3"), //youtube
    uH: new Audio("audio/userHit.wav"), //https://freesound.org/people/acollier123/sounds/122670/
    wHM: new Audio("audio/wHM.wav"), // https://freesound.org/people/cabled_mess/sounds/350865/
    gS: new Audio("audio/GameMusic.wav"), // https://freesound.org/people/djgriffin/sounds/202077/
    shoot: new Audio("audio/retro-shoot.wav"),//https://freesound.org/people/MATRIXXX_/sounds/459145/
  }

  aud.gS.loop = true;
  aud.gS.volume = 0.1;





  document.addEventListener("DOMContentLoaded", aud.gS.play());
  document.addEventListener("keypress", (e) => {
    if (e.key === "m") {
      aud.gS.volume = (aud.gS.volume === 0) ? 0.1 : aud.gS.volume - 0.1;
    }
  });
  

document.addEventListener('keypress',(e) =>{
  if(e.key === "s"){
    aud.shoot.play()}
    console.log("pew")

});


//add block
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    block.style.backgroundColor = randomColor;
    grid.appendChild(block);
  }
}

addBlocks();

// add user
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

// draw the user
function drawUser() {
  user.style.left = currentPosition[0] + "px"; //[260, 10];
  user.style.bottom = currentPosition[1] + "px";
}
// move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - userBlockWidth) { 
        //270 <560 - 50 (50 so the end of the user stops at width of grid)
        currentPosition[0] += 10;
      }
      break;
  }
  attachBall();
  drawUser();
  
  
}


//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
drawBall();

// draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

//move the ball
function moveBall() {
  ballCurrentPosition[0] += xDirection; //277, 20
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

//attach the ball for starting position
function attachBall(){
  if(!timerId && ballStartID == true){
    ballStart=[currentPosition[0] + 17, currentPosition[1] + 10]
    ballCurrentPosition = ballStart
    drawBall()
   }
  
}

//check for collisions
function checkForCollisions() {
  //check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] >= blocks[i].bottomLeft[0] && 
      ballCurrentPosition[0] <= blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter >= blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] <= blocks[i].topLeft[1]
      ) {
          const allBlocks = Array.from(document.querySelectorAll(".block"));
          allBlocks[i].classList.remove("block");
          blocks.splice(i, 1);
          changeDirection();
          totalBlocksRemaining--
          console.log(totalBlocksRemaining)
          score += (100* scoreMultiply);
          aud.hit.play();
          scoreDisplay.innerHTML = "Current Score:  " + score;
          blockCountDisplay.innerHTML = "Total Number of Remaining Blocks: " + totalBlocksRemaining
          if (blocks.length == 0) {
            scoreDisplay.innerHTML = "You Win!";
            clearInterval(timerId);
            clearEvent();
          }
        }
  }
  //check for wall collisions
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
    aud.wHM.play();
  }

  //check for user collisions
  if (
    ballCurrentPosition[0] >= currentPosition[0] &&
    ballCurrentPosition[0] <= currentPosition[0] + userBlockWidth &&
    ballCurrentPosition[1] >= currentPosition[1] &&
    ballCurrentPosition[1] <= currentPosition[1] + userBlockHeight
  ) {
    changeDirection();
    aud.uH.play();
  }
  /*ballCurrentPosition[0] >= currentPosition[0] && ballCurrentPosition[0] <= currentPosition[0] + userBlockWidth &&
        ballCurrentPosition[1] >= currentPosition[1] && ballCurrentPosition[1] <= currentPosition[1] + userBlockHeight*/

  //check for Game Over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "You lose Final Score is " + score;
    scoreDisplay.classList.add('youLose')
    clearEvent();
    timerId = null
    aud.gS.pause();
    aud.gO.play();
  }
}



// move ball direction
function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}

//start buttons
document.addEventListener("keypress", (e) => {
  if (e.key === " ") {
    // had to use https://www.toptal.com/developers/keycode
    start();
  }
});
startButton.addEventListener("click", start);

function start(){
  if(timerId) {
      clearInterval(timerId)
      aud.gS.pause();
      timerId= null
      startButton.innerHTML ="Start"
      //clearMouseMovement()
  } else{
    timerId = setInterval(moveBall, ballSpeed); 
    aud.gS.play()
    startButton.innerHTML = "Pause"
    //startMouseMovement()
  }
   ballStartID = false 
}

//restart buttons
restartButton.addEventListener("click", () => {
  window.location.reload();
});
document.addEventListener("keypress", (e) => {
  if (e.key === "r")
    window.location.reload();
});




// use to remove EventListeners
function clearEvent() {
  document.removeEventListener("keydown", moveUser);
  startButton.removeEventListener("click", start);
  grid.removeEventListener('mousemove', mouseMovement)
  document.removeEventListener("keypress", (e) => {
    //doesnt work fix later intention was to remove event listner of spacebar when game is over
    if (e.key === " ") start();
  });
}




/*function shoot(e){
    let laserId
    let currentLaserIndex = currentPosition

    function moveLaser(){
     
      if(currentLaserIndex[1] <= boardHeight){
        currentLaserIndex.classList.remove('laser')
        currentLaserIndex[1] += 1
        console.log(currentLaserIndex)
       
        currentLaserIndex.classList.add('laser')
       
        }
      
       
      }
  
    laserId = setInterval(moveLaser, 10)
    console.log("pew")
  }


document.addEventListener('click', shoot)*/



document.addEventListener('mousedown', (e) => 
{
currentPosition[0] = e.offsetX 
  m = true
})
grid.addEventListener('mousemove', mouseMovement)

document.addEventListener('mouseup', (e) =>{
  m = false
})

document.addEventListener("keydown", moveUser);


function startMouseMovement(){
  document.addEventListener('mousedown', (e) => {
  currentPosition[0] = e.offsetX 
    m = true
  })
  grid.addEventListener('mousemove', mouseMovement)

  document.addEventListener('mouseup', (e) =>{
    m = false
  })

  document.addEventListener("keydown", moveUser);
  }



function clearMouseMovement(){
  document.removeEventListener('mousedown', (e) => {
    currentPosition[0] = e.offsetX 
      m = true
    })
    grid.removeEventListener('mousemove', mouseMovement)

   document.removeEventListener('mouseup', (e) => {
      m = false
      })

    document.removeEventListener("keydown", moveUser);
      }


function mouseMovement(e){
  if (m)
        if((e.offsetX <= (boardWidth - userBlockWidth) && e.offsetX >= 0 )){
        currentPosition[0] = e.offsetX 
       // console.log(e.offsetX)
        attachBall()
        drawUser()
    }
 
 }  //works to an extent but not the way i want it to IT WAS GRID.ADDEVENTLISTENER NOT DOCUMENT DAMN

 //form functionality
let scoreMultiply = 1 // hard coded  value to match the hard coded difficulty value but is there a bettter way? 

document.getElementById('difficulty').addEventListener('click', changeDifficulty)
function changeDifficulty(){
          let difficultyValue = document.getElementById('difficulty').value
          console.log("the diffculty is " + difficultyValue)
          if(difficultyValue == .5){
            ballSpeed = 15
          }
          if(difficultyValue == 1){
            ballSpeed = 10
          }
          if(difficultyValue == 1.2){
            ballSpeed = 7
          }
          if(difficultyValue == 1.5){
            ballSpeed = 5
          }
          if(difficultyValue == 2){
            ballSpeed = 1
          }
          scoreMultiply = difficultyValue
}


