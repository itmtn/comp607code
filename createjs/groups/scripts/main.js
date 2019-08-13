var stage;
var preload;
var fishGroup;
var fishTween;
var canvas;

function init(){
  canvas = document.getElementById("stage");
	stage = new createjs.Stage(canvas);
  createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
  preloadAssets();
}

function preloadAssets(){
  var preload = new createjs.LoadQueue();
  preload.loadFile({id:"fish",src:"images/fish.png"});
  preload.on("complete", setUp, this);
}

function setUp(){
  addBackground();
  setupFishAnimation();
  fishTween.play();
}

function addBackground(){
  var background = new createjs.Shape();
  background.graphics.beginLinearGradientFill(["#0000FF", "#000088", "#000044"], [0, 0.6, 1], 0,0, 0,stage.canvas.height);
  background.graphics.drawRect(0,0,stage.canvas.width, stage.canvas.height);
  stage.addChild(background);
}

function setupFishAnimation(){
  fishGroup = new createjs.Container();
  // create 10 fish and add to fish group
  for(var i = 0; i < 10; i++){
    // create a fish bitmap object with a random location
    var fish = new createjs.Bitmap("images/fish.png");
    fish.x = Math.floor((Math.random() * 250) - 1);
    fish.y = Math.floor((Math.random() * 150) - 1);
    // set registration point to be middle of fish (fish is 75px by 40px)
    fish.regX = 37.5; fish.regY = 20;
    // set fish size to random size using scaleX and scaleY properties
    var r1 = Math.random(0.5)+0.5;
    var r2 = r1 * 0.9;
    var r3 = Math.floor((Math.random() * 200));
    fish.scaleX = r1; fish.scaleY = r1;
    // animate the fishes width with tween
    createjs.Tween.get(fish, { loop: true })
      .to({scaleX: r2}, 300 + r3, createjs.Ease.linear)
      .to({scaleX: r1}, 300 + r3, createjs.Ease.linear);
    fishGroup.addChild(fish);
  }
  // position fishgroup completely off to left of stage visible area
  fishGroup.x = -350;
  fishGroup.y = 100;
  // tween the fishes horizontal property
  fishTween = createjs.Tween.get(fishGroup, {loop: false, stop: true})
    .to({x: 800}, 12000, createjs.Ease.linear);
  stage.addChild(fishGroup);
}
