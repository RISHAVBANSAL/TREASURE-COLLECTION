var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,gameOV;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var d;
var gameState = PLAY;
var PLAY = 1;
var gameState = END;
var END = 0;

function preload(){
  
  pathImg = loadImage("Road.png");
  
  boyImg = loadAnimation("runner1.png","runner2.png");
  
  cashImg = loadImage("cash.png");
  
  diamondsImg = loadImage("diamonds.png");
  
  jwelleryImg = loadImage("jwell.png");
  
  swordImg = loadImage("sword.png");
  
  gameOV =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;

  d = createSprite(200,200,50,50)
  d.addAnimation("looping",gameOV);
  d.scale = 0.8
  d.visible = false;
  
  
  
//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
  boy.setCollider("circle",0,0,180);
  boy.debug = false;

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  
  
  if(boy.isTouching(cashG)){
    treasureCollection = treasureCollection +30;
  }

  if(boy.isTouching(diamondsG)){
     treasureCollection = treasureCollection +100;
  }
  
  if(boy.isTouching(jwelleryG)){
     treasureCollection = treasureCollection +50;
  }
  
 
  if(gameState === END){
    
    d.visible=true;
        
     cashG.setLifetimeEach(-1);
     jwelleryG.setLifetimeEach(-6);
      diamondsG.setLifetimeEach(-5);
    swordGroup.setLifetimeEach(-5);
     diamondsG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
     cashG.setVelocityYEach(0);
     jwelleryG.setVelocityYEach(0);
  
    
  
  }
  if(boy.isTouching(swordGroup)){
     path.velocityY=0;
    boy.y = 6000;
    diamondsG.x = -600;
    cashG.x = -600;
    jwelleryG.x=-600;
    
gameState =END;
  }
 
  
  
 
  
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
    }
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}