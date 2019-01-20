window.onload = initAll;
var canvas;
var ctx;
var interval;
var yellow1=false;
var yellow2=false;
var yellow3=false;
var yellow4=false;
var yellow5=false;
var r = Math.floor(Math.random()*255);
var g = Math.floor(Math.random()*255);
var b = Math.floor(Math.random()*255);
var sc1=0;
var sc2=0;
var x1;
var y1;
var x2;
var y2;
var xs;
var ys;
var spacebar=false;
var set=false;
var oneplayer=false;
var expert=false
var x=Math.floor(Math.random()*100+250);
var y=Math.floor(Math.random()*100+200);
var easy=false;
var medium=false;
var hard=false;
var twoplayer=false;
var upPressed=false;
var downPressed=false;
var paddleY;
var paddleHeight = 80;
var paddleSpeed=9;
var paddleAISpeed=5;
var ballRadius=6;
var win=false;
function initAll()
{
    canvas = document.getElementById("myNewCanvas");
   ctx = canvas.getContext("2d");
   document.addEventListener("keyup", keyUpHandler,false);
   document.addEventListener("keydown", keyDownHandler,false);
   document.addEventListener("mouseup", mouseUpHandler,false);
   document.addEventListener("mousemove",mouseMoveHandler,false);
   interval = setInterval(setTitle,5);
   paddleY = (canvas.height-paddleHeight)/2;
   paddleAI=paddleY
   setTitle();
}
function setTitle()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    makeRect();
    ctx.font = "100px Impact";
   ctx.fillStyle = "#ffffff";
   ctx.fillText("Pongball",120,210);
   ctx.font = "20px Comic Sans MS";
   ctx.fillText("Adam Janicki", 235, 258)
   makeB1();
    makeB2();
    makeB3();
    makeB4();
    ctx.fillStyle="#000000"
    ctx.font = "40px Impact";
    ctx.fillText("Easy",114,344);
    ctx.fillText("Hard",114,444);
    ctx.fillText("Expert",400,444);
    ctx.font = "36px Impact";
    ctx.fillText("Medium",394,344);
    if(easy==true)
    {
        oneplayer=true;
        clearInterval(interval);
        xs=7;
        ys=3.5;
        paddleAISpeed=5;
        interval=setInterval(play,20);
    }
    else if(medium==true)
    {
        oneplayer=true;
        clearInterval(interval);
        xs=8;
        ys=4;
        paddleAISpeed=5;
        interval=setInterval(play,20);
    }
    else if(hard==true)
    {
        oneplayer=true;
        clearInterval(interval);
        xs=12;
        ys=6;
        paddleAISpeed=6;
        interval=setInterval(play,20);
    }
    else if(expert==true)
    {
        oneplayer=true;
        clearInterval(interval);
        interval=setInterval(play,20);
        xs=14;
        ys=7;
        paddleAISpeed=7;
    }
}
function play()
{
    if(sc1==10||sc2==10)
    {
        win=true;
        clearInterval(interval);
        interval=setInterval(setWin,5);
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    makeRect();
    print();
    drawPaddle();
    drawBall();
    if(sc1==10||sc2==10)
    {
        win=true;
        clearInterval(interval);
        interval=setInterval(setWin,5);
    }
    if(x+xs<0-(ballRadius*2))
    {
        set=true;
        sc2++
        ctx.clearRect(0,0,canvas.width,canvas.height);
        print();
        drawBall();
        drawPaddle();
        setGame();
        clearInterval(interval);
        interval = setInterval(setReady,5);
        setReady();
    }
    if(sc1==10||sc2==10)
    {
        win=true;
        clearInterval(interval);
        interval=setInterval(setWin,5);
    }
    if(x + xs - (ballRadius*2)> canvas.width)
    {
        set=true;
        sc1++;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        print();
        drawBall();
        drawPaddle();
        setGame();
        clearInterval(interval);
        interval = setInterval(setReady,5);
        setReady();
    }

    if(sc1==10||sc2==10)
    {
        win=true;
        clearInterval(interval);
        interval=setInterval(setWin,5);
    }
    if(upPressed==true && paddleY-paddleSpeed>=0)
        paddleY-=paddleSpeed;
    if(downPressed==true && paddleY+paddleSpeed+paddleHeight<=canvas.width-paddleHeight)
        paddleY+=paddleSpeed;
        if(sc1==10||sc2==10)
        {
            win=true;
            clearInterval(interval);
            interval=setInterval(setWin,5);
        }
    x+=xs;
    y+=ys;
    if(y-ballRadius<=0)
        ys*=-1;
    if(y+ballRadius>=canvas.height)
        ys*=-1;
    if(x-ballRadius<=10 && y>=paddleY && y<=paddleY+paddleHeight)
     {
        xs*=-1
        x=11+ballRadius;
     }  
    if(x+ballRadius>=canvas.width-10 && y>=paddleAI && y<=paddleAI+paddleHeight)
    {
        xs*=-1;
        x=canvas.width-11-ballRadius;
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
    if(paddleAI+paddleAISpeed<=0 || paddleAI+paddleAISpeed>=canvas.height-paddleHeight)
        {
            if(oneplayer==true)
            {
                paddleAISpeed=paddleAISpeed*-1;
            }
            
        }
    paddleAI+=paddleAISpeed
    if(sc1==10||sc2==10)
    {
        win=true;
        clearInterval(interval);
        interval=setInterval(setWin,5);
    }
}
function makeB1()
{
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.ellipse(150,330,80,30,0,0,2*Math.PI,false);
    if(yellow1==true)
        ctx.fillStyle="rgb(0,255,200)";
    ctx.fill();
}
function makeB2()
{
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.ellipse(450,330,80,30,0,0,2*Math.PI,false);
    if(yellow2==true)
        ctx.fillStyle="rgb(0,255,200)";
    ctx.fill();
}
function makeB3()
{
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.ellipse(450,430,80,30,0,0,2*Math.PI,false);
    if(yellow3==true)
        ctx.fillStyle="rgb(0,255,200)";
    ctx.fill();
}
function makeB4()
{
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.ellipse(150,430,80,30,0,0,2*Math.PI,false);
    if(yellow4==true)
        ctx.fillStyle="rgb(0,255,200)";
    ctx.fill();
}
function makeRect()
{
    ctx.beginPath();
    ctx.fillStyle = "rgb("+r+","+g+","+b+")";
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();
    ctx.closePath();
}
function print()
{
    ctx.beginPath();
    ctx.fillStyle="#ffffff";
    ctx.rect((canvas.width/2)-2,0,4,canvas.height);
    ctx.font = "60px Impact";
    ctx.fillText(""+sc1,130,70);
    ctx.fillText(""+sc2,430,70);
    ctx.fill();
}
function drawPaddle()
{
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.rect(0,paddleY,10,paddleHeight);
    ctx.rect(canvas.width-10,paddleAI,10,paddleHeight);
    ctx.fill();
}
function drawBall()
{
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0, Math.PI*2,false);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
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
    if(e.keyCode==82)
    {
        document.location.reload();
    }
    if(e.keyCode==32)
    {
        spacebar=true;
    }
}
function mouseMoveHandler(e)
{
    x2 = e.clientX-canvas.offsetLeft;
    y2=e.clientY-canvas.offsetTop;
    if(x2>=70 && x2<=230 && y2>=300 && y2<=360)
        yellow1=true;
    if(x2<=70 || x2>=230 || y2<=300 || y2>=360)
        yellow1=false;
    if(x2>=370 && x2<=530 && y2>=300 && y2<=360)
        yellow2=true;
    if(x2<=370 || x2>=530 || y2<=300 || y2>=360)
        yellow2=false;
    if(x2>=70 && x2<=230 && y2>=400 && y2<=460)
        yellow4=true;
    if(x2<=70 || x2>=230 || y2<=400 || y2>=460)
        yellow4=false;
    if(x2>=370 && x2<=530 && y2>=400 && y2<=460)
        yellow3=true;
    if(x2<=370 || x2>=530 || y2<=400 || y2>=460)
        yellow3=false;
    if(x2>=255 && x2<=355 && y2>=450 && y2<475 && win==true)
        {
            yellow5 = true;
        }
    if((x2<=255 || x2>=355 || y2<=450 || y2>475) && win==true)
        {
            yellow5 = false;
        }
}
function mouseUpHandler(e)
{
    x1 = e.clientX-canvas.offsetLeft;
    y1 = e.clientY-canvas.offsetTop;
    if(x2>=70 && x2<=230 && y2>=300 && y2<=360)
        easy=true;
    if(x2>=370 && x2<=530 && y2>=300 && y2<=360)
        medium=true;
    if(x2>=70 && x2<=230 && y2>=400 && y2<=460)
        hard=true;
    if(x2>=370 && x2<=530 && y2>=400 && y2<=460)
        expert=true;
    if(x2>=255 && x2<=355 && y2>=450 && y2<475 && win==true)
        {
            document.location.reload();
        }
}
function setGame()
{
    if(easy=true)
    {
        oneplayer=true;
        y = Math.floor(Math.random()*50+275);
        x = Math.floor(Math.random()*50+225);
        paddleY = (canvas.height-paddleHeight)/2;
        paddleAI = (canvas.height-paddleHeight)/2;
        paddleAISpeed = ys;
    }
    if(medium==true)
    {
        oneplayer=true;
        y = Math.floor(Math.random()*50+225);
        x = Math.floor(Math.random()*50+275);
        paddleY = (canvas.height-paddleHeight)/2;
        paddleAI = (canvas.height-paddleHeight)/2;
        paddleAISpeed = ys;
    }
    if(hard==true)
    {
        oneplayer=true;
        y = Math.floor(Math.random()*30+225);
        x = Math.floor(Math.random()*30+275);
        paddleY = (canvas.height-paddleHeight)/2;
        paddleAI = (canvas.height-paddleHeight)/2;
        paddleAISpeed = ys;
    }
    if(expert==true)
    {
        oneplayer=true;
        y = Math.floor(Math.random()*30+235);
        x = Math.floor(Math.random()*30+285);
        paddleY = (canvas.height-paddleHeight)/2;
        paddleAI = (canvas.height-paddleHeight)/2;
        paddleAISpeed = ys;
    }
}
function setReady()
{
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    makeRect();
    print();
    drawPaddle();
    ctx.font = "40px Impact";
    ctx.fillStyle = "#000000";
    ctx.fillText("Press Space To Serve",130,260);
    if(spacebar==true&&set==true)
    {
        clearInterval(interval);
        interval = setInterval(play,20);
        play();
        spacebar=false;
        set=false;
    }
}

function setWin()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    makeRect();
    ctx.font = "100px Impact";
    ctx.fillStyle = "#ffffff";
    if(sc1>sc2)
        ctx.fillText("You Win!",120,230);
    else  
        ctx.fillText("You Lose",120,230); 
    ctx.font = "50px Impact"
    ctx.fillText(sc1+" - "+sc2,248,370); 
    ctx.font = "20px Courier New";
    makeButton();
    ctx.fillStyle = "#000000";
    ctx.fillText("Restart",260,470);
    ctx.closePath();
}
function makeButton()
{
    ctx.beginPath();
    if(yellow5==true)
         ctx.fillStyle = "#dbff4d";
     else if(yellow5==false)
         ctx.fillStyle = "#ffffff";
    ctx.rect(255,450, 100,25);
    ctx.fill();
}
