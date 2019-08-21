function sceneSanitationCreate(){    
    var scene = new createjs.Container();   
    scene.name="sanitation";
    scene.data = {}; 
    
    scene.addEventListener("tick", scene.animateText);   
    return scene;
}

