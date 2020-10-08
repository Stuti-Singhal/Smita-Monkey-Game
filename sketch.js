//variables created
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,bananaGroup;
var points=0,ground, groundImg;
var survivalTime=0,bgImg,backGround;
var highestSurvivalTime=0;
var play=1;
var end=0;
var gamestate=play;
var restart,restartImg;
var dieSound;
var jumpSound;
var gameOver,goverImg;

//preloading images and animations
function preload(){ 
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
groundImg=loadImage("ground2.png");
bgImg=loadImage("jungle.jpg");
jumpSound=loadSound("jump.mp3");
dieSound=loadSound("die.mp3");
restartImg = loadImage("restart.png");
gameOverImg = loadImage("gameOver.png");
}



function setup() {
 createCanvas(800,400);
//creating background
  backGround=createSprite(0,0,800,400);
  backGround.addImage("bg",bgImg);
  backGround.scale=1.6;
  backGround.velocityX=-3;

//creating the monkey
monkey=createSprite(80,250,20,20);
monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.1;
monkey.depth=backGround.depth;
monkey.depth=monkey.depth+1;

//creating the ground
ground=createSprite(400,300,800,100);
ground.velocityX=-3;
ground.x=ground.width/2;
ground.shapeColor="black";
ground.addImage("ground",groundImg);
ground.depth=backGround.depth;
ground.depth=ground.depth+1;
ground.visible=false;
  
//creating groups
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
restart = createSprite(270,310);
restart.addImage(restartImg);
restart.scale=0.7;
  
gameOver = createSprite(270,350);
gameOver.addImage(gameOverImg);
gameOver.scale=0.7;

}


function draw() {
background("teal");
  
  drawSprites();
  

  //monkey.debug=true;
  //monkey.setCollider("circle",0,0,300);
  

//adding depth to the monkey to make it visible
   monkey.velocityY = monkey.velocityY + 0.8;
  
//making the monkey collide with the ground 
  monkey.collide(ground); 
  
//adding survival time
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);
  text("Highest Survival Time: "+highestSurvivalTime,300,50);
  text("Points: "+points,100,80);
  
  
  if(gamestate===play){
    restart.visible = false;
    gameOver.visible = false;
    
    //made monkey jump
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
     jumpSound.play();
   }
     
      spawnFood();
      spawnObstacles();
     switch (points){
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18;
      break;
      default: break;
      }

     if(bananaGroup.isTouching(monkey)){
   points=points+2;
   bananaGroup.destroyEach();
 }
    
    if(highestSurvivalTime<survivalTime){
    highestSurvivalTime=survivalTime;
  }
    //making an infinite ground
  if(ground.x<0){
   ground.x=ground.width/2;
 }
    //making the background infinite  
  if(backGround.x<0){
   backGround.x=backGround.width/2;
 }
  
    
    if(monkey.isTouching(obstacleGroup)){
    gamestate=end;
    points=0;
    monkey.scale=0.1;
      dieSound.play();
     }

  }
  else if(gamestate===end){
    restart.visible = true;
    gameOver.visible = true;
     monkey.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0);
    backGround.velocityX=0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
  reset();
  }
  }
}

function spawnFood(){
if(frameCount%80===0){
 banana=createSprite(600,350,20,20); 
  banana.y=Math.round(random(120,200));
  banana.addImage("banana",bananaImage);
  banana.velocityX=-7;
  banana.lifetime=200;
  bananaGroup.add(banana);
  banana.scale=0.1;
}    
}

function spawnObstacles(){
if(frameCount%250===0){
obstacle=createSprite(800,250,20,20) ;
  obstacle.velocityX=-6;
obstacle.lifetime=200;
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  obstacleGroup.add(obstacle);
  //obstacle.debug=true;
  //obstacle.setCollider("circle",0,0,200);   
 } 
  
}

function reset(){

gameOver.visible=false;
restart.visible=false;
gameState=play;
bananaGroup.destroyEach();
obstacleGroup.destroyEach(); 
points=0;


}











