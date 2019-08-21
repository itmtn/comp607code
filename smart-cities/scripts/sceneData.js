function sceneDataCreate(){    
    var scene = new createjs.Container();   
    scene.name="data";
    scene.data = {}; 
    
    scene.addEventListener("tick", scene.animateText);   
    return scene;
}

