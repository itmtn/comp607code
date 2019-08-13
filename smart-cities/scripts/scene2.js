
function scene2Create(){    
    var scene = new createjs.Container();   
    scene.name="scene2";
    scene.data = {}; 
    scene.data.tTimer = 0;
    scene.data.tIndex = 0;
    scene.data.tData = "Smart cities use digital and electronic technologies to more efficiently manage a \ncities services";    
    scene.data.tText = new createjs.Text("", "20px Arial", "#000000");
    scene.data.tText.x = 20;
    scene.data.tText.y = 20;    
        
    scene.animateText = function(event){
        if (scene.data.tTimer < createjs.Ticker.getTime()){
            scene.data.tTimer = createjs.Ticker.getTime() + 50;
            if (scene.data.tIndex < scene.data.tData.length){
                scene.data.tText.text = scene.data.tText.text + scene.data.tData[scene.data.tIndex];
                scene.data.tIndex = scene.data.tIndex + 1;                
            }
        }
    };       

    var imgData = new createjs.Bitmap(queue.getResult("data.png"));
    var imgPower = new createjs.Bitmap(queue.getResult("power.png"));
    var imgSanitation = new createjs.Bitmap(queue.getResult("sanitation.png"));
    var imgTransport = new createjs.Bitmap(queue.getResult("transport.png"));
    var imgWater = new createjs.Bitmap(queue.getResult("water.png"));

    //console.log(imgData);
    //createjs.Tween.get(imgData).set({x: 340, y: 100}, 0);
    imgWater.x = 100;
    imgWater.y = 200;
    imgWater.filters = [
        new createjs.ColorFilter(0, 0, 0, 1, 0, 0, 255, 0)
    ];
    
    var b = imgWater.getBounds();
    console.log(b);
    //imgWater.cache(0, 0, b.width, b.height);


    scene.addEventListener("tick", scene.animateText);   
    scene.addChild(imgData);
    scene.addChild(imgPower);
    scene.addChild(imgSanitation);
    scene.addChild(imgTransport);
    scene.addChild(imgWater);
    scene.addChild(scene.data.tText);
    return scene;
}

