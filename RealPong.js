window.onload = initAll;
var canvas;
var ctx;
//ball stuff
var ballRadius = 6;
var random1 = Math.floor(Math.random()*60+220);
var x;
var x1;
var x2;
var x3;
var y;
var y1;
var y2;
var y3;
var ys1;
var ys2;
var ys3;
var xs=2;
var ys=1;
var xs1;
var xs2;
var xs3;
var lives = 3;
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
var five = false;
var difficulty = 0;
//random stuff
var restart = false;
var colorChange = false;
var twoplayer = false;
var oneplayer = false;
var wPressed = false;
var sPressed = false;
var enter = false;
var pause = 1;
var play = false;
var spacebar = false;
var set = false;
var crazyMode = false;
var minutes = 0;
var seconds = 0;
var timevar;
function initAll()
{
    canvas = document.getElementById("myNewCanvas");
    ctx = canvas.getContext("2d");
    x = (canvas.width-ballRadius)/2;
    y = (canvas.height-ballRadius)/2;
   paddleY = (canvas.height-paddleHeight)/2;
    paddleAI = (canvas.height-paddleHeight)/2;
    document.addEventListener("keydown",keyDownHandler, false);
   document.addEventListener("keyup", keyUpHandler,false);
  setDifficulty();
  myvar = setInterval(setDifficulty,5);
}
function playGame()
{
    
    if(pause==-1)
    {
        clearInterval(interval);
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    makeBoundary();
    makeBall();
    makePaddle();
    printScore();
    if(x+xs<0-(ballRadius*2))
    {
        set=true;
        sc2++
        ctx.clearRect(0,0,canvas.width,canvas.height);
        makeBoundary();
        makeBall();
        makePaddle();
        printScore();
        setGame();
        clearInterval(myvar);
        myvar = setInterval(setReady,5);
        setReady();
    }
       
    if(x + xs - (ballRadius*2)> canvas.width)
    {
        set=true;
        sc1++;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        makeBoundary();
        makeBall();
        makePaddle();
        printScore();
        setGame();
        clearInterval(myvar);
        myvar = setInterval(setReady,5);
        setReady();
    }
    if(y+ys >= canvas.height-ballRadius || y<=0)
    {
         ys=ys*-1;
         colorChange=true;
        if(oneplayer==true)
        {
            paddleAISpeed=paddleAISpeed*-1;
        }
       
    }
    
    if((x+xs==paddleWidth || x+xs==paddleWidth-1 || x+xs==paddleWidth-2) && y+ys<=(paddleY+paddleHeight-(ballRadius/2)) && y+ys>=paddleY)
    {
        xs = xs*-1;
       colorChange=true;
    }
    if((x+xs==canvas.width-paddleWidth-ballRadius || x+xs==canvas.width-paddleWidth-ballRadius+1 || x+xs==canvas.width-paddleWidth-ballRadius+2) && y+ys<=(paddleAI+paddleHeight-(ballRadius/2)) && y+ys>=paddleAI)
    {
        xs = xs*-1;
        colorChange=true;
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
    
    if(upPressed==true && paddleY>0&&oneplayer==true)
        paddleY-=paddleSpeed;
    if(downPressed==true && paddleY<canvas.height-paddleHeight&&oneplayer==true)
        paddleY+=paddleSpeed;
    if(wPressed==true && paddleY>0 &&twoplayer==true)
        paddleY-=paddleSpeed;
    if(sPressed==true && paddleY<canvas.height-paddleHeight &&twoplayer==true)
        paddleY+=paddleSpeed;
    if(upPressed==true && paddleAI>0&&twoplayer==true)
        paddleAI-=paddleAISpeed;
    if(downPressed==true && paddleAI<canvas.height-paddleHeight&&twoplayer==true)
        paddleAI+=paddleAISpeed;
    y = y + ys;
    x = x + xs;
    if(oneplayer==true)
    {
        paddleAI+=paddleAISpeed;
    }
}
function setReady()
{
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    makeBoundary();
    makePaddle();
    printScore();
    ctx.font = "40px Impact";
    ctx.fillStyle = "#000000";
    ctx.fillText("Press Space To Serve",330,240);
    if(spacebar==true&&set==true&&crazyMode==false)
    {
        myvar = setInterval(playGame,5);
        playGame();
        spacebar=false;
        set=false;
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
    ctx.fillText("2-Player (Press 4)",440,400);
    ctx.fillText("Crazy Mode (Press 5)",440,440);
    ctx.fillText("Restart (Press R)",440,480);
    
    
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
        paddleHeight=80;
        myvar = setInterval(setDirections,5);
        setDirections();
    }
    else if(five==true)
    {
        crazyMode=true;
        paddleHeight = 120;
        ballRadius = 16;
        x1 = Math.floor(Math.random()*100+100);
        y1 = Math.floor(Math.random()*100+100);
        x2 = Math.floor(Math.random()*100+800);
        y2 = Math.floor(Math.random()*100+350);
        x3 = Math.floor(Math.random()*100+450);
        y3 = Math.floor(Math.random()*100+240);
        xs1 = Math.floor(Math.random()*3+2);
        ys1 = Math.floor(Math.random()*4+1);
        xs2 = Math.floor(Math.random()*3+2);
        ys2 = Math.floor(Math.random()*4+1);
        xs3 = Math.floor(Math.random()*3+2);
        ys3 = Math.floor(Math.random()*4+1);
        clearInterval(myvar);
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
        ctx.fillText("4. Press P to pause, space to serve ball",420, 360);
        ctx.fillText("Press enter to start",420, 480);
        if(enter==true)
        {
            clearInterval(myvar);
            play=true;
            myvar = setInterval(playGame,5);
            playGame();
        }
    }
    else if(four==true)
    {
        ctx.font = "50px Impact";
        ctx.fillText("Directions",390, 200);
        ctx.font = "20px Courier New";
        ctx.fillText("1. P1 use w and s  keys",420, 240);
        ctx.fillText("2. P2 use up and down arrow keys",420, 280);
        ctx.fillText("3. P1 controls left paddle",420, 320);
        ctx.fillText("4. P2 controls right paddle",420, 360);
        ctx.fillText("5. First to 10 goals wins",420, 400);
        ctx.fillText("6. Use P to pause, space to serve ball",420, 440);
        ctx.fillText("Press enter to start",420, 480);
        if(enter==true)
        {
            clearInterval(myvar);
            myvar = setInterval(playGame,5);
            play=true;
            playGame();
        }
    }
    else if(five==true)
    {
        ctx.font = "50px Impact";
        ctx.fillText("Directions",390, 200);
        ctx.font = "20px Courier New";
        ctx.fillText("1. Use up and down arrow keys",420, 240);
        ctx.fillText("2. Don't let the balls past you",420, 280);
        ctx.fillText("3. You lose when all 3 balls are past",420, 320);
        ctx.fillText("4. Press P to pause",420, 360);
        ctx.fillText("Press enter to start",420, 480);
        if(enter==true)
        {
            clearInterval(myvar);
            play=true;
            myvar = setInterval(playCrazy,5);
            timevar = setInterval(countTime,1000);
            countTime();
            playCrazy();
        }
    }
    ctx.closePath();
}
function printLives()
{
    ctx.beginPath();
    ctx.font = "20px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Lives: "+lives,100,60);
    if(seconds<10)
        ctx.fillText("Time: "+minutes+":0"+seconds,700,60);
    else if(seconds>=10)
        ctx.fillText("Time: "+minutes+":"+seconds,700,60);
    ctx.closePath();

}
function countTime()
{
    seconds++;
    if(seconds==60)
    {
        minutes++;
        seconds = 0;
    }
}
function playCrazy()
{
    if(pause==-1)
    {
        clearInterval(interval);
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    makeBall1();
    makeBall2();
    makeBall3();
    createPaddle();
    printLives();
    if(lives==0)
        setWin();
    if(y1+ys1<=0 || y1+ys1+ballRadius>=canvas.height)
        ys1=ys1*-1;
    if(y2+ys2<=0 || y2+ys2+ballRadius>=canvas.height)
        ys2=ys2*-1;
    if(y3+ys3<=0 || y3+ys3+ballRadius>=canvas.height)
        ys3=ys3*-1;
    if(x1+xs1+ballRadius>=canvas.width)
        xs1=xs1*-1;
    if(x2+xs2+ballRadius>=canvas.width)
        xs2=xs2*-1;
    if(x3+xs3+ballRadius>=canvas.width)
        xs3=xs3*-1;
    if(x1+xs1==0-ballRadius || x1+xs1==0-ballRadius-1 || x1+xs1==0-ballRadius-2 || x1+xs1==0-ballRadius-3)
    {
        lives--;
        x1 = -20;
    }
    if(x2+xs2==0-ballRadius || x2+xs2==0-ballRadius-1 || x2+xs2==0-ballRadius-2 || x2+xs2==0-ballRadius-3)
    {
        lives--;
        x2=-20;
    } 
    if(x3+xs3==0-ballRadius || x3+xs3==0-ballRadius-1 || x3+xs3==0-ballRadius-2 || x3+xs3==0-ballRadius-3)
    {
        lives--;
        x3=-20;
    } 
    if((x1+xs1==paddleWidth || x1+xs1==paddleWidth-1 || x1+xs1==paddleWidth-2 || x1+xs1==paddleWidth-3 ) && y1+ys1<=(paddleY+paddleHeight-(ballRadius/2)) && y1+ys1>=paddleY)
    {
        xs1 = xs1*-1;
    }
    if((x2+xs2==paddleWidth || x2+xs2==paddleWidth-1 || x2+xs2==paddleWidth-2 || x2+xs2==paddleWidth-3 ) && y2+ys2<=(paddleY+paddleHeight-(ballRadius/2)) && y2+ys2>=paddleY)
    {
        xs2 = xs2*-1;
    }
    if((x3+xs3==paddleWidth || x3+xs3==paddleWidth-1 || x3+xs3==paddleWidth-2 || x3+xs3==paddleWidth-3 ) && y3+ys3<=(paddleY+paddleHeight-(ballRadius/2)) && y3+ys3>=paddleY)
    {
        xs3 = xs3*-1;
    }
    if(downPressed==true&&paddleY+paddleHeight<=canvas.height)
        paddleY+=paddleSpeed;
    else if(upPressed==true&&paddleY>=0)
        paddleY-=paddleSpeed
    x1+=xs1;
    y1+=ys1;
    x2+=xs2;
    y2+=ys2;
    x3+=xs3;
    y3+=ys3;
}
function makeBall()
{
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0, Math.PI*2,false);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}
function makeBall1()
{
    ctx.beginPath();
    ctx.arc(x1,y1,ballRadius,0, Math.PI*2,false);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}
function makeBall2()
{
    ctx.beginPath();
    ctx.arc(x2,y2,ballRadius,0, Math.PI*2,false);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}
function makeBall3()
{
    ctx.beginPath();
    ctx.arc(x3,y3,ballRadius,0, Math.PI*2,false);
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
function createPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX,paddleY,paddleWidth,paddleHeight);
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
        paddleY = (canvas.height-paddleHeight)/2;
        paddleAI = (canvas.height-paddleHeight)/2;
        xs=xs*-1;
        ys=ys*-1;
        paddleAISpeed = ys;
    }
    if(difficulty==2)
    {
        oneplayer=true;
        y = Math.floor(Math.random()*110+195);
        x = Math.floor(Math.random()*130+435);
        paddleY = (canvas.height-paddleHeight)/2;
        paddleAI = (canvas.height-paddleHeight)/2;
        xs=xs*-1;
        ys=ys*-1;
        paddleAISpeed = ys;
    }
    if(difficulty==3)
    {
        oneplayer=true;
        y = Math.floor(Math.random()*30+235);
        x = Math.floor(Math.random()*30+485);
        paddleY = (canvas.height-paddleHeight)/2;
        paddleAI = (canvas.height-paddleHeight)/2;
        xs=xs*-1;
        ys=ys*-1;
        paddleAISpeed = ys;
    }
    if(difficulty==4)
    {
        y = Math.floor(Math.random()*60+220);
        x = 500;
        paddleY = (canvas.height-paddleHeight)/2;
        paddleAI = (canvas.height-paddleHeight)/2;
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
    else if(five==true)
    {
        ctx.beginPath();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.font = "100px Impact";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("You Lose",340,200);
        ctx.font = "50px Impact";
        if(seconds<10)
            ctx.fillText("Time: "+minutes+":0"+seconds,450,280);
        else if(seconds>=10)
            ctx.fillText("Time: "+minutes+":"+seconds,450,280);
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
    if(e.keyCode==53)
    {
        five=true;
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
    if(e.keyCode==53)
    {
        five=true;
    }
    if(e.keyCode==80)
    {
        if(play==true)
            pause=pause*-1;
    }
    if(e.keyCode==32&&set==true)
    {
        spacebar=true;
    }
}
