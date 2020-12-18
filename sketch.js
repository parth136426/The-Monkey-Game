var PLAY=1;
var END=0;
var gameState;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,background1,background2,ground,jump;
var FoodGroup, obstacleGroup
var score=0,play,playButton,restart,reStart;
var survivaltime=0;
var gamesound,bumped;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  jump=loadAnimation("sprite_7.png","sprite_7.png","sprite_7.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  background1=loadImage("background (3).png");
  playButton=loadImage("play_button2.png");
  restart=loadImage("replay-removebg-preview.png");
  gamesound=loadSound("2018-10-06_-_Silly_Chicken_-_David_Fesliyan.mp3");
  bumped=loadSound("Cartoon-Dizzy-Fall-A-www.fesliyanstudios.com.mp3")
 
}



function setup() {
 createCanvas(600,600);
 
  background2=createSprite(300,300,0,0);
  background2.addImage("background",background1)

  
   ground = createSprite(600,550,1000,10);
   ground.x=ground.width/2;
   ground.visible=false;
     
   play=createSprite(300,300,10,10);
  play.addImage(playButton);
  play.visible=true;
  
  monkey=createSprite(60,490,10,10);
  monkey.addAnimation("running"  ,  monkey_running);
  monkey.addAnimation("stop",jump);
  monkey.scale=0.2;
  monkey.visible=false;
  
  reStart=createSprite(300,300,10,10);
  reStart.addImage(restart);
  reStart.scale=0.5;
  reStart.visible=false;
  
  obstacleGroup=new Group();
  bananaGroup=new Group();
}
  

function draw() {
  background("white")
  
  
  if( mousePressedOver(play))
    {
      play.visible=false;
      gameState=PLAY;
    }

  
  if(gameState==PLAY)
    {
     survivaltime=0;
     survivaltime=Math.round(frameCount/frameRate());  
 

      
      if(background2.x<0)
   {
     background2.x=background2.width/2;
      }
     background2.velocityX=-6;
     

     if(ground.x<100)
     {
     ground.x=ground.width/2;
     }
     ground.velocityX=-4;
      
      

      monkey.visible=true;

  
 
      
   if(keyDown ("space")&& monkey.y>100)
    {
      monkey.velocityY=-12;
   
      monkey.changeAnimation("stop",jump);
    }
  monkey.velocityY=monkey.velocityY+1;
  monkey.collide(ground);

   if(keyWentUp("space"))   
     {
        monkey.changeAnimation("running",monkey_running);
       
     }

  
      
   
      
      obstacle_1();
      banana_1();
         
      if(monkey.isTouching(bananaGroup))
        {
         
          bananaGroup.destroyEach();
         
          score=score+1;
        }
    
  if(monkey.isTouching(obstacleGroup))
    {
       gameState=END;
        bumped.play();
    }
      
    
  
  if(gameState==END)
    {
    

      obstacleGroup.collide(monkey);
     
      monkey.collide(ground);
      monkey.velocityY=0;
      background2.velocityX=(0);
      ground.velocityX=0;
     bananaGroup.destroyEach();
      monkey.changeAnimation("stop",jump);
      reStart.visible=true;
    }
 
    }
  if(mousePressedOver(reStart))
    {
      restart_1();
      obstacleGroup.destroyEach();
    }
  
 
  
  drawSprites();

   stroke("black");
  textSize(20);
  fill("black");
  text("Score:  "+score,50,60);
  
 
 
  stroke("black");
  textSize(20);
  fill("black");

  text("Survival Time : "+survivaltime,400,50);
}


function obstacle_1() {
    if( frameCount%200==0)
    {
      obstacle=createSprite(600,500,10,10);
      obstacle.addImage(obstaceImage);
      obstacle.scale=0.25;
      obstacle.velocityX=-4;
     
     obstacle.setCollider("rectangle",0,0,0,0);
   
      obstacleGroup.add(obstacle);
    }
}

function banana_1 () {
  if(frameCount%80==0)
    {
      banana=createSprite(Math.round(random(500,600)),Math.round(random(120,400)),10,10)
      banana.addImage(bananaImage);
      banana.scale=0.15;
      banana.velocityX=-4;
      
      bananaGroup.add(banana);
    }
}


function restart_1(){
  score=0;

  survivaltime=0;
reStart.visible=false;
  monkey.changeAnimation("running",monkey_running);
  gameState=PLAY;

}

