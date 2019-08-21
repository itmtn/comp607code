
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

    var imgData = new createjs.Bitmap(queue.getResult("data"));
    var imgPower = new createjs.Bitmap(queue.getResult("power"));
    var imgSanitation = new createjs.Bitmap(queue.getResult("sanitation"));
    var imgTransport = new createjs.Bitmap(queue.getResult("transport"));
    var imgWater = new createjs.Bitmap(queue.getResult("water.png"));

    var iconTime = 4500;
    imgData.regX = 30; imgData.regY = 34;  imgData.x = 400;  imgData.y = -300;    
    createjs.Tween.get(imgData).to({y: 100}, iconTime);

    imgPower.regX = 30; imgPower.regY = 34; imgPower.x = -300; imgPower.y = 300;
    createjs.Tween.get(imgPower).to({x: 100}, iconTime);    

    imgSanitation.regX = 30; imgSanitation.regY = 34; imgSanitation.x = 1000; imgSanitation.y = 300;
    createjs.Tween.get(imgSanitation).to({x: 700}, iconTime);   
    
    imgTransport.regX = 30; imgTransport.regY = 34; imgTransport.x = 400; imgTransport.y = 900;
    createjs.Tween.get(imgTransport).to({y: 500}, iconTime);   

    imgData.addEventListener("click", function(){
        console.log("data click");
    });

    imgPower.addEventListener("click", function(){
        console.log("power click");
    });

    imgSanitation.addEventListener("click", function(){
        console.log("sanitation click");
    });

    imgTransport.addEventListener("click", function(){
        console.log("transport click");
    });

    scene.addEventListener("tick", scene.animateText);   
    scene.addChild(imgData);
    scene.addChild(imgPower);
    scene.addChild(imgSanitation);
    scene.addChild(imgTransport);
    scene.addChild(imgWater);
    scene.addChild(scene.data.tText);
    return scene;
}

