window.onload = initAll;
var canvas;
var ctx;
//ball stuff
var ballRadius = 6;
var random1 = Math.floor(Math.random()*60+220);
var x;
var y;
var xs=2;
var ys=1;
//set interval speed
var gameSpeed = 5;
var myvar;
//paddle stuff
var paddleY;
var paddleAI;
var paddleWidth = 10;
var paddleHeight = 50;
var paddleSpeed = 6/(10/gameSpeed);
var paddleX = 0;
var paddleAISpeed= 6/(10/gameSpeed);
//key listener
var upPressed = false;
var downPressed = false;
//score stuff
var sc1 = 0;
var sc2 = 0;
var one = false;
var two = false;
var three = false;
var four=false;
var difficulty = 0;
//random stuff
var restart = false;
var r = Math.floor(Math.random()*255);
var g = Math.floor(Math.random()*255);
var b = Math.floor(Math.random()*255);
var twoplayer = false;
var oneplayer = false;
var wPressed = false;
var sPressed = false;
var enter = false;
function initAll()
{
    canvas = document.getElementById("myNewCanvas");
    ctx = canvas.getContext("2d");
    x = (canvas.width-ballRadius)/2;
    y = (canvas.height-ballRadius)/2;
   paddleY = (canvas.height-paddleWidth)/2;
    paddleAI = (canvas.height-paddleWidth)/2;
    document.addEventListener("keydown",keyDownHandler, false);
   document.addEventListener("keyup", keyUpHandler,false);
  setDifficulty();
  myvar = setInterval(setDifficulty,5);
}
function playGame()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    makeBoundary();
    makeBall();
    makePaddle();
    printScore();
    if(x+xs<0-ballRadius)
    {
        sc2++
        setGame();
    }
       
    if(x+xs > canvas.width)
    {
        sc1++;
        setGame();
    }
    if(y+ys >= canvas.height-ballRadius || y<=0)
    {
         ys=ys*-1;
        if(oneplayer==true)
        {
            paddleAISpeed=paddleAISpeed*-1;
        }
       
    }
    
    if((x+xs==paddleWidth || x+xs==paddleWidth-1 || x+xs==paddleWidth-2) && y+ys<=(paddleY+paddleHeight-(ballRadius/2)) && y+ys>=paddleY)
    {
        xs = xs*-1;
       
    }
    if((x+xs==canvas.width-paddleWidth-ballRadius || x+xs==canvas.width-paddleWidth-ballRadius+1 || x+xs==canvas.width-paddleWidth-ballRadius+2) && y+ys<=(paddleAI+paddleHeight-(ballRadius/2)) && y+ys>=paddleAI)
    {
        xs = xs*-1;
        
    }   
    
    if(paddleAI+paddleAISpeed<=0 || paddleAI+paddleAISpeed>=canvas.height-paddleHeight)
    {
        if(oneplayer==true)
        {
            paddleAISpeed=paddleAISpeed*-1;
        }
        
    }
    if(sc1==10||sc2==10)
        setWin();
    
    if(upPressed==true && paddleY>0)
        paddleY-=paddleSpeed;
    if(downPressed==true && paddleY<canvas.height-paddleHeight)
        paddleY+=paddleSpeed;
    if(wPressed==true && paddleAI>0 &&twoplayer==true)
        paddleAI-=paddleAISpeed;
    if(sPressed==true && paddleAI<canvas.height-paddleHeight &&twoplayer==true)
        paddleAI+=paddleAISpeed;
    y = y + ys;
    x = x + xs;
    if(oneplayer==true)
    {
        paddleAI+=paddleAISpeed;
    }
}
function setDifficulty()
{
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "150px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("PONGBALL",200,200);
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Adam Janicki",440,240);
    ctx.font = "20px Courier New";
    ctx.fillText("Basic (Press 1)",440,280);
    ctx.fillText("Advanced (Press 2)",440,320);
    ctx.fillText("Expert (Press 3)",440,360);
    ctx.fillText("2-Player (Press 4)",440,400)
    ctx.fillText("Restart (Press R)",440,440);
    
    
    if(one==true)
    {
        oneplayer=true;
        clearInterval(myvar);
        xs=2;
        ys=1;
        paddleAISpeed=ys;
        difficulty=1;
        myvar = setInterval(setDirections,5);
        setDirections();
       
    }
    else if(two==true)
    {
        oneplayer=true;
        clearInterval(myvar);
        xs=3;
        ys=2;
        paddleAISpeed=ys;
        difficulty=2;
        myvar = setInterval(setDirections,5);
        setDirections();
       
    }
    else if(three==true)
    {
        oneplayer=true;
        clearInterval(myvar);
        xs=4;
        ys=3;
        paddleAISpeed=ys;
        difficulty=3;
        myvar = setInterval(setDirections,5);
        setDirections();
    }
    else if(four==true)
    {
        twoplayer=true;
        clearInterval(myvar);
        xs=3;
        ys=2;
        difficulty=4;
        myvar = setInterval(setDirections,5);
        setDirections();
    }
    ctx.closePath();
}
function setDirections()
{
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#ffffff";
    if(one==true||two==true||three==true)
    {
        ctx.font = "50px Impact";
        ctx.fillText("Directions",390, 200);
        ctx.font = "20px Courier New";
        ctx.fillText("1. Use up and down arrow keys",420, 240);
        ctx.fillText("2. Get ball past the CPU paddle",420, 280);
        ctx.fillText("3. First to 10 wins",420, 320);
        ctx.fillText("Press enter to start",420, 480);
        if(enter==true)
        {
            clearInterval(myvar);
            myvar = setInterval(playGame,5);
            playGame();
        }
    }
    else if(four==true)
    {
        ctx.font = "50px Impact";
        ctx.fillText("Directions",390, 200);
        ctx.font = "20px Courier New";
        ctx.fillText("1. P1 use up and down arrow keys",420, 240);
        ctx.fillText("2. P2 use w and s keys",420, 280);
        ctx.fillText("3. P1 controls left paddle",420, 320);
        ctx.fillText("4. P2 controls right paddle",420, 360);
        ctx.fillText("5. Get ball past the other paddle",420, 400);
        ctx.fillText("6. First to 10 wins",420, 440);
        ctx.fillText("Press enter to start",420, 480);
        if(enter==true)
        {
            clearInterval(myvar);
            myvar = setInterval(playGame,5);
            playGame();
        }
    }
    ctx.closePath();
}
function makeBall()
{
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0, Math.PI*2,false);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}
function makeBoundary()
{
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.rect((canvas.width/2)-3,0,6,500);
    ctx.fill();
    ctx.closePath();
}
function printScore()
{
    ctx.beginPath();
    ctx.font = "58px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(""+sc1,220,60);
    ctx.fillText(""+sc2,740,60);
    ctx.closePath();
}
function makePaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX,paddleY,paddleWidth,paddleHeight);
    ctx.rect(canvas.width-paddleWidth,paddleAI, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}
function setGame()
{
    if(difficulty==1)
    {
        oneplayer=true;
        y = Math.floor(Math.random()*80+210);
        x = Math.floor(Math.random()*150+425);
        paddleY = (canvas.height-paddleWidth)/2;
        paddleAI = (canvas.height-paddleWidth)/2;
        xs=xs*-1;
        ys=ys*-1;
        paddleAISpeed = ys;
    }
    if(difficulty==2)
    {
        oneplayer=true;
        y = Math.floor(Math.random()*90+205);
        x = Math.floor(Math.random()*130+435);
        paddleY = (canvas.height-paddleWidth)/2;
        paddleAI = (canvas.height-paddleWidth)/2;
        xs=xs*-1;
        ys=ys*-1;
        paddleAISpeed = ys;
    }
    if(difficulty==3)
    {
        oneplayer=true;
        y = Math.floor(Math.random()*30+235);
        x = Math.floor(Math.random()*30+485);
        paddleY = (canvas.height-paddleWidth)/2;
        paddleAI = (canvas.height-paddleWidth)/2;
        xs=xs*-1;
        ys=ys*-1;
        paddleAISpeed = ys;
    }
    if(difficulty==4)
    {
        y = Math.floor(Math.random()*30+235);
        x = Math.floor(Math.random()*30+485);
        paddleY = (canvas.height-paddleWidth)/2;
        paddleAI = (canvas.height-paddleWidth)/2;
        xs=xs*-1;
        ys=ys*-1;
    }
}
function setWin()
{
    if(sc2>sc1&&oneplayer==true)
    {
        ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "100px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("You Lose",340,200);
    ctx.font = "50px Impact";
    ctx.fillText(""+sc1+" - "+sc2,450,280);
    ctx.font = "20px Courier New";
    ctx.fillText("Press r to restart",440,380);
    ctx.closePath();
    clearInterval(myvar);
    }
    else if(sc2>sc1&&twoplayer==true)
    {
        ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "100px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("P2 Wins",340,200);
    ctx.font = "50px Impact";
    ctx.fillText(""+sc1+" - "+sc2,450,280);
    ctx.font = "20px Courier New";
    ctx.fillText("Press r to restart",440,380);
    ctx.closePath();
    clearInterval(myvar);
    }
    else if(sc2<sc1&&oneplayer==true)
    {
        ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "100px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("You Win",340,200);
    ctx.font = "50px Impact";
    ctx.fillText(""+sc1+" - "+sc2,450,280);
    ctx.font = "20px Courier New";
    ctx.fillText("Press r to restart",440,380);
    ctx.closePath();
    clearInterval(myvar);
    }
    else if(sc2<sc1&&twoplayer==true)
    {
        ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "100px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("P1 Wins",340,200);
    ctx.font = "50px Impact";
    ctx.fillText(""+sc1+" - "+sc2,450,280);
    ctx.font = "20px Courier New";
    ctx.fillText("Press r to restart",440,380);
    ctx.closePath();
    clearInterval(myvar);
    }
}
function keyDownHandler(e)
{
    if(e.keyCode==38)
    {
        upPressed=true;
    }
    if(e.keyCode==40)
    {
        downPressed=true;
    }
    if(e.keyCode==87)
    {
        wPressed=true;
    }
    if(e.keyCode==83)
    {
        sPressed=true;
    }
    if(e.keyCode==49)
    {
        one=true;
    }
    if(e.keyCode==50)
    {
        two=true;
    }
    if(e.keyCode==51)
    {
        three=true;
    }
    if(e.keyCode==52)
    {
        four=true;
    }
    if(e.keyCode==82)
    {
        document.location.reload();
    }
    if(e.keyCode==13)
    {
        enter=true;
    }
}
function keyUpHandler(e)
{
    if(e.keyCode==38)
    {
        upPressed=false;
    }
    if(e.keyCode==40)
    {
        downPressed=false;
    }
    if(e.keyCode==87)
    {
        wPressed=false;
    }
    if(e.keyCode==83)
    {
        sPressed=false;
    }
    if(e.keyCode==49)
    {
        one=true;
    }
    if(e.keyCode==50)
    {
        two=true;
    }
    if(e.keyCode==51)
    {
        three=true;
    }
    if(e.keyCode==52)
    {
        four=true;
    }
    
}
