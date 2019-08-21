function sceneTransportCreate(){    
    var scene = new createjs.Container();   
    scene.name="transport";
    scene.data = {}; 
    
    scene.addEventListener("tick", scene.animateText);   
    return scene;
}

