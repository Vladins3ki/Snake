
let ctx;
let speedX = 0, speedY = 0;
let gameBoard = 400;
let snakeX = snakeY = gameBoard / 2;
let dimension  = 20;
let body = [];
let gameOver;
let score = 0;
window.onload = function() {
        let game = document.getElementById("games");
        ctx = game.getContext("2d");
        game.width = 400;
        game.height = 400;
        document.addEventListener("keyup",Direction);
        gameOver =  setInterval(draw,1000/10);
        Food();
    } 
function draw(){
    ctx.clearRect(0,0,gameBoard,gameBoard);
    Eat();
    bodyConstruction();
    snakeHead();
    gameCondition();
}
function Food(){
    foodX = Math.floor(Math.random() * (gameBoard/dimension)) * dimension;
    foodY = Math.floor(Math.random() * (gameBoard/dimension)) * dimension;
    
}
function Eat(){
    if(foodX == snakeX && foodY == snakeY){
        body.push([foodX,foodY]);
        Food();
        ++score;
        document.getElementById("score").innerHTML = score;
    }
}
function bodyConstruction(){
    for(let i = 0; i < body.length;++i){
        body[i] = body[i + 1];
    }
    if(body.length > 0){
        body[body.length - 1] = [snakeX,snakeY];
    }
    for(let i = 0; i < body.length; ++i){
        ctx.strokeStyle = "green";
        ctx.strokeRect(body[i][0],body[i][1],dimension,dimension);
    }
}
function snakeHead(){
    ctx.lineWidth = "3";
    ctx.strokeStyle = "red";
    snakeX += speedX;
    snakeY += speedY;
    ctx.strokeRect(snakeX,snakeY,dimension,dimension);
    ctx.fillRect(snakeX,snakeY,dimension,dimension);
    ctx.fillRect(foodX,foodY,dimension,dimension);
}
function text(){
    ctx.font = "50px serif";
    ctx.strokeText("GAME OVER",70,200);
    ctx.font = "40px";
    ctx.strokeText("Your score is:",70,300);
    ctx.strokeText(score,350,300);
    clearInterval(gameOver);
}
function gameCondition(){
    if(snakeX < 0 || snakeX > gameBoard - dimension || snakeY < 0 || snakeY > gameBoard - dimension){
        text();
    }
        

    for(let i = 0; i < body.length;++i){
        if(body[i][0] == snakeX && body[i][1] == snakeY){
            text();
            
            
        }
    }
}
function Direction(e){
    if(e.code == "KeyD" && speedX > -1){
        speedX = dimension;
        speedY = 0;
        
    }
    if(e.code == "KeyA" && speedX < 1 ){
        speedX = -dimension;
        speedY = 0;
    
    } 
    if(e.code == "KeyW" && speedY < 1){
        speedY = -dimension;
        speedX = 0;
    
    }
    if(e.code == "KeyS" && speedY > -1){
        speedY = dimension;
        speedX = 0;
    }
}


