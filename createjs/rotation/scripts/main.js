var stage;
var screen1;

function init(){  
  // must include rotation plugin
  createjs.RotationPlugin.install();
  stage = new createjs.Stage("stageCanvas");
  createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
  setUpScreen1();
}

function setUpScreen1(){
  screen1 = new createjs.Container();
  var star = new createjs.Shape();

  star.graphics.beginFill("#FFFF00");
  star.graphics.drawPolyStar(0, 0, 80, 8, 5, 90);
  star.graphics.beginFill("#FF0000");
  star.graphics.drawPolyStar(0, 0, 40, 3, 0, 30);
  star.x = 400;
  star.y = 300;

  // rotate star to 180 degrees clock wise
  // then rotate to 0 degrees counter clock wise
  createjs.Tween.get(star, {loop: -1})
  .to({rotation:180, rotationDir: 1}, 1000)
  .to({rotation:0, rotationDir: -1}, 1000)  

  screen1.addChild(star);
  stage.addChild(screen1);

}  


  

