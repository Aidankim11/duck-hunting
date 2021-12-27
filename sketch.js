var score=0
var gameState="play"
function preload(){
  playerImg=loadImage("man.png")
  duckImg=loadImage("duck.png")
  bulletImg=loadImage("bullet.png")
  beachImg=loadImage("beach.png")
}

function setup() {
  createCanvas(800,400);
  player=createSprite(100, 200, 50, 50);
  player.addImage(playerImg)
  player.scale=0.2
  edges=createEdgeSprites()
  bulletG=createGroup()
  duckG=createGroup()
  reset=createButton("Restart")
  reset.position(350,210)
  reset.hide()
}

function draw() {
  background(beachImg); 
  if(gameState==="play"){

  
  player.velocityY=0
 
  if(keyDown("up")||keyDown("w")){
    player.velocityY=-2
  }
  if(keyDown("down")||keyDown("s")){
    player.velocityY=2
  }
  player.collide(edges)
  if(keyDown(" ") && frameCount%5===0){
    bullet=createSprite(player.x+35,player.y-40,20,20)
    bullet.velocityX=7
    bullet.addImage(bulletImg)
    bullet.scale=0.1
    bulletG.add(bullet)
  }

  if(frameCount%50===0){
    duck=createSprite(850,random(100,300))
   duck.addImage(duckImg) 
   duck.velocityX=-4
   duck.scale=0.15
   duck.mirrorX(-1)
   duckG.add(duck)
  }

  for(var i=0;i<duckG.length;i++){
    for(var j=0;j<bulletG.length;j++){
      if(duckG.get(i) !== undefined && bulletG.get(i)!== undefined){
    if(bulletG.get(j).isTouching(duckG.get(i))){
      duckG.get(i).destroy()
      bulletG.get(j).destroy()
      score=score+2
      }
    }
  }
}
for(var i=0;i<duckG.length;i++){
if(duckG.get(i).x<130){
  gameState="end"
}
}
  }
  fill("black")
  text("Score: "+score,700,50)
  if(gameState==="end"){
    duckG.destroyEach()
    bulletG.destroyEach()
    player.destroy()
    textSize(30)
    fill("red")
    text("Game Over",300,180)
    reset.show()
    reset.mousePressed(function(){
      location.reload()
    })
  }
 
  drawSprites();
}