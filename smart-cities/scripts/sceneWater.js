function sceneWaterCreate(){    
    var scene = new createjs.Container();   
    scene.name="water";
    scene.data = {}; 
    
    scene.addEventListener("tick", scene.animateText);   
    return scene;
}

