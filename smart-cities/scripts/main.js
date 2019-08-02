var stage;
var queue;
var scenes = [];
var sindex;

function init(){    
    stage = new createjs.Stage("stageCanvas");
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);        
    preload();
}

function preload(){        
    queue = new createjs.LoadQueue();
    queue.addEventListener('fileload', main);

    var bar = new createjs.Shape();
    bar.graphics.beginFill("red").drawRect(0, 0, 0, 0);
    stage.addChild(bar);

    queue.on("progress", function(event){       
        bar.graphics.clear();
        bar.graphics.beginFill("red").drawRect(200, 295, event.progress * 400, 10);
    });

    files = ["data.png", "power.png", "sanitation.png", "transport.png", "water.png"];
    files.forEach(function(item){
        queue.loadFile("assets/" + item);    
    });
}

function main(){
    stage.removeAllChildren();
    scenes.push(scene1Create());
    scenes.push(scene2Create());  
    sindex = 0;
    stage.addChild(scenes[sindex]);
}

function nextScene(){    
    stage.removeChild(scenes[sindex]);
    sceneDestroy(scenes[sindex]);
    if (sindex < scenes.length){
        sindex++;
        stage.addChild(scenes[sindex]);
    }
}



function sceneDestroy(scene){
    scene.removeAllEventListeners();
    scene.removeAllChildren();
    scene.data = null;
}

