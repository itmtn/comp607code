var stage;
var screen1;

function init(){  
  // must include path plugin
  createjs.MotionGuidePlugin.install();
  canvas = document.getElementById("slide");
  stage = new createjs.Stage(canvas);
  createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
  setUpScreen1();
}

function setUpScreen1(){
  screen1 = new createjs.Container();
  var arrow = new createjs.Shape();

  // create path based tween
  arrow.graphics.beginFill("yellow").beginStroke("blue").moveTo(-20, -40).lineTo(0, 0).lineTo(20, -40).lineTo(0, -20).lineTo(-20, -40);
  var pathTween = createjs.Tween.get(arrow).to({guide:{ path: [20, 300, 200, 600, 400, 300, 600, 0, 780, 300]
    ,orient: "auto"}, },7000);
  
  // create vector graphic to visualise the path
  var vpath = new createjs.Shape();
  vpath.graphics.beginStroke("green").moveTo(20, 300)
    .curveTo(200, 600, 400, 300)
    .curveTo(600, 0, 780, 300)

  screen1.addChild(vpath);
  screen1.addChild(arrow);
  stage.addChild(screen1);

  document.getElementById("hideButton").addEventListener("click", function(){
    vpath.visible = !vpath.visible;
  });

  document.getElementById("ReplayPathAnimation").disabled = true;

}  


  

