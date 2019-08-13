var stage;
var screen1;

function init(){  
  // must include color plugin
  createjs.ColorPlugin.install();
  stage = new createjs.Stage("stageCanvas");
  createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
  setUpScreen1();
}

function setUpScreen1(){
  screen1 = new createjs.Container();
  var block = new createjs.Shape();

  // create a reference to the begin fill graphics command so that we can animate
  // fill color
  var fillCmd = block.graphics.beginFill("#00FF00").command;
  block.graphics.beginStroke("blue").drawRoundRect(300, 200, 200, 200, 10, 10, 10, 10);

  // tween the fill commands style property, loop repeatedly, the tween will reverse direction at 
  // the end of each loop.  color expressed as html hexadecimal value 
  createjs.Tween.get(fillCmd, {loop: -1, bounce: true})
    .to({style:"#FF0000"}, 1000)
    .to({style:"#FFFF00"}, 1000)
    .to({style:"#0099FF"}, 1000)
    .to({style:"#FF00FF"}, 1000)
    .to({style:"#FFFF"}, 1000);

  screen1.addChild(block);
  stage.addChild(screen1);

}  


  

