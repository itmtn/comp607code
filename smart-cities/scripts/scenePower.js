function scenePowerCreate(){    
    var scene = new createjs.Container();   
    scene.name="power";
    scene.data = {}; 
    
    scene.addEventListener("tick", scene.animateText);   
    return scene;
}

