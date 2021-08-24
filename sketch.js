var gamestate = 1
var score = 0
var present = true
var block

function preload() {
  block1 = loadImage("face.png")
  block2 = loadImage("endface.png")
  block3 = loadImage("stop.png")
  appleImg = loadImage("apple.png")
  bananaImg = loadImage("banana.png")
  grapesImg = loadImage("grapes.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight-80);
  snake = createSprite(400, 200, 50, 50);
  snake.addImage(block1)
  snake.scale = 0.08
  edges = createEdgeSprites()
  fg = createGroup()
  blockg = createGroup()
}

function draw() {
  background("lightblue");
  if(gamestate === 1){
  if(keyDown("up")){
    snake.velocityY = -5
    snake.velocityX = 0
  }

  if(keyDown("down")){
    snake.velocityY = 5
    snake.velocityX = 0
  }

  if(keyDown("left")){
    snake.velocityX = -5
    snake.velocityY = 0
  }

  if(keyDown("right")){
    snake.velocityX = 5
    snake.velocityY = 0
  }
  if(snake.isTouching(edges)){
    gamestate = 0
  }
  food()
  if(snake.isTouching(fg)){
    score = score+1
    fg.destroyEach()
    present = false
  }
  if(block){
    block.velocityX = snake.velocityX 
    block.velocityY  =  snake.velocityY
  }
  textSize(20)
  text("Score = "+score,20,20)
}

if(gamestate === 0){
  snake.velocityX = 0
  snake.velocityY = 0
  snake.addImage(block2)
  textAlign(CENTER)
  textSize(50)
  text("Game Over", width/2+10, height/2)
  textSize(30)
  text("Final Score = "+score, width/2+10, height/2+50)
  
}



  drawSprites();
}

function food() {
  if(frameCount%150 === 0 || frameCount===1 || present === false ){
  fruit = createSprite(random(50,width-50), random(50,height-50))
  present = true
  switch(Math.round(random(1,3))){
    case 1: fruit.addImage(appleImg)
    break

    case 2: fruit.addImage(bananaImg)
    break

    case 3: fruit.addImage(grapesImg)
    break
  }
  fruit.lifetime = 150
  fruit.scale = 0.07
  fg.add(fruit)
}
}

