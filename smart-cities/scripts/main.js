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

    var bar = new createjs.Shape();
    bar.graphics.beginFill("red").drawRect(0, 0, 0, 0);
    stage.addChild(bar);

    queue.on("progress", function(event){       
        bar.graphics.clear();
        bar.graphics.beginFill("red").drawRect(200, 295, event.progress * 400, 10);
    });

    queue.loadFile({id:"sanitation", src:"assets/sanitation.png"});
    queue.loadFile({id:"data", src:"assets/data.png"});      
    queue.loadFile({id:"power", src:"assets/power.png"});     
    queue.loadFile({id:"transport", src:"assets/transport.png"});
    queue.loadFile({id:"water", src:"assets/water.png"});    

    queue.addEventListener("complete", main);
}

function main(){
    stage.removeAllChildren();
    scenes.push(scene1Create());
    scenes.push(scene2Create());  
    scenes.push(sceneDataCreate());
    scenes.push(sceneSanitationCreate());
    scenes.push(sceneTransportCreate());
    scenes.push(scenePowerCreate());
    scenes.push(sceneWaterCreate());
    sindex = 1;
    stage.addChild(scenes[sindex]);
}

function nextScene(){        
    stage.removeChild(scenes[sindex]);
    sceneDestroy(scenes[sindex]);
    if (sindex < scenes.length){
        console.log("next scene");
        sindex++;
        stage.addChild(scenes[sindex]);
    }
}

function sceneDestroy(scene){
    scene.removeAllEventListeners();
    scene.removeAllChildren();
    scene.data = null;
}

