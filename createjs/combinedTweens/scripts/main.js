var canvas, stage;
var gearGroup, focusGear;
var clank;

function init(){
  canvas = document.getElementById("slide");
	stage = new createjs.Stage(canvas);
  createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
  canvas.style.backgroundColor = "#88ddff";
  preloadAssets();
}

function preloadAssets(){
  var preload = new createjs.LoadQueue();
  preload.installPlugin(createjs.Sound);
  preload.loadFile({id:"fish",src:"images/gear.png"});
  preload.loadFile({id:"clank",src:"audio/clank.mp3"});
  preload.on("complete", setUp, this);
}

function setUp(){
  createBackgroundGears();
  createjs.Tween.get(gearGroup, {loop: false})
    .set({visible: true})
    .to({y:0}, 4000, createjs.Ease.backOut)
    .wait(1000)
    .call(removeFocusGear)
    .to({alpha: 0}, 1000, createjs.Ease.linear);
}

function removeFocusGear(){
  gearGroup.removeChild(focusGear);
  stage.addChild(focusGear);
  createjs.Tween.get(focusGear, {loop: false})
    .to({scaleX: 1, scaleY: 1}, 2000, createjs.Ease.elasticInOut)
    .wait(1000)
    .call(bounceGear);
}

function bounceGear(){
  createjs.Tween.get(focusGear, {loop: false})
     .to({y: 380}, 1000, createjs.Ease.bounceOut);
  createjs.Tween.get(focusGear, {loop: false})
     .to({x: 830}, 3000, createjs.Ease.linear);
  createjs.Tween.get(focusGear).wait(300).call(function(){
    createjs.Sound.play("clank");
  });

}

function createBackgroundGears(){
  gearGroup = new createjs.Container();
  gearGroup.visible = false;
  gearGroup.y = -700;
  for(var y = 0; y < 5; y++){
    for(var x = 0; x < 9; x++){
      var gear = new createjs.Bitmap("images/gear.png");
      gear.regX = 107; gear.regY = 107;
      gear.scaleX = 0.25; gear.scaleY = 0.25;
      gear.x = 70 + (x * 70);
      gear.y = 105 + (y * 70);
      var speed = 6000;
      if (x == 4 && y == 2) {
        speed = 1000;
        focusGear = gear;
      }
      createjs.Tween.get(gear, {loop: true}).to({rotation: 360}, speed, createjs.Ease.linear);
      gearGroup.addChild(gear);
    }
  }
  stage.addChild(gearGroup);
}
