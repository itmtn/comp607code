// preloader needs to be a global variable - see setUpGraphics
var preload;

function init(){
  preloadAssets();
}

function preloadAssets(){
  preload = new createjs.LoadQueue();
  preload.loadFile({id:"hero",src:"images/hero.png"});
  preload.on("complete", setUpGraphics, this);
}

function setUpGraphics(){

  canvas = document.getElementById("slide");
	var stage = new createjs.Stage(canvas);

  // specify the details of our spritesheet and frame by frame animations
  var data = {
      // spritesheet image
      images: [preload.getResult("hero")],
      // structure of spritesheet image, size of each frame, number of frames
      frames: {width:46, height:50, count: 32, spacing: 0, margin: 0},
      animations: {
          // stand displays a static frame
          stand: 0,
          // true frame by frame animation - frames specified in array
          // speed allows us to influence frame by frame playback speed
          run:{
              frames: [24,25,26,27,28,29,31],
              speed: 0.2
          },
          punch:{
            frames: [18,19,20,21],
            speed: 0.2
          }
      }
  };

  // create new spritesheet object, create new sprite that will use stand
  // animation
  var spriteSheet = new createjs.SpriteSheet(data);
  var runSprite = new createjs.Sprite(spriteSheet, "stand");

  // scale up sprite since our spritesheet images are small
  runSprite.scaleX = 2; runSprite.scaleY = 2;

  // create our tween and call gotoAndPlay to change the sprite animation
  createjs.Tween.get(runSprite)
    .call(function(){
      runSprite.gotoAndPlay("stand");
    })
    .wait(2000)
    .call(function(){
      runSprite.gotoAndPlay("run");
    })
    .to({x: 300}, 2000)
    .call(function(){
      runSprite.gotoAndPlay("punch");
    })
    .wait(400)
    .call(function(){
      runSprite.gotoAndPlay("stand");
    })

  stage.addChild(runSprite);
  createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
}
