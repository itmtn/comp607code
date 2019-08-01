var stage;
var scene1;

function init(){    
    stage = new createjs.Stage("stageCanvas");
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);    
    main();
}

function preload(){        
}

function main(){   
    scene1 = scene1Create();  
    stage.addChild(scene1);
}


