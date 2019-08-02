
function scene1Create(){    
    var scene = new createjs.Container();   
    scene.name="scene1";
    scene.data = {}; 
    scene.data.tTimer = 0;
    scene.data.tData = "The world is becoming more urbanized and by 2050 more than 60% of the world's \n population is expected to live in cities";    
    scene.data.tIndex = 0;
    scene.data.gTimer = 0;    
    scene.data.growthCount = 60;    
    scene.data.tText = new createjs.Text("", "20px Arial", "#000000");
    scene.data.tText.x = 20;
    scene.data.tText.y = 20;
    scene.data.finished = false;
    scene.data.fTimer = 0;

    var buildings = [[30,323,207],[30,371,234],[30,341,264],[30,276,292],[20,315,261],[20,383,284],
                     [20,313,301],[20,374,212],[20,292,262],[40,272,212],[40,409,264]];   

    var growth = [[20,302,378],[20,372,320],[20,343,241],[20,454,296],[20,255,283],[20,455,169],
                  [20,216,384],[30,178,390],[30,398,349],[30,485,185],[30,191,312],[30,343,158],
                  [50,455,222],[50,242,389],[50,217,187],[50,384,149],[50,334,349],[50,510,286],
                  [50,165,250],[50,562,215],[25,413,309],[25,339,305],[25,406,237],[25,404,207],
                  [25,477,279],[25,509,251],[25,438,191],[25,261,326],[25,523,205],[15,432,348],
                  [15,394,310],[15,374,267],[15,434,241],[15,320,240],[15,356,210],[15,357,190],
                  [15,508,231],[15,276,263],[15,237,309],[15,241,338],[15,543,245],[15,254,248],
                  [15,199,226],[15,526,167],[15,591,169],[15,212,166],[15,275,193],[15,296,194],
                  [15,318,178],[15,200,364],[15,490,314],[30,294,336],[30,555,150],[30,469,335],
                  [30,174,147],[30,217,262],[30,484,147],[30,564,268],[30,250,356],[30,439,131],
                  [30,556,184]];                

    for(var i = 0; i < buildings.length; i++){
        var building = buildings[i];
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#999999").drawRect(0, 0, building[0], building[0]);
        shape.x = building[1];
        shape.y = building[2];
        scene.addChild(shape);
    }
    
    scene.animateText = function(event){
        if (scene.data.tTimer < createjs.Ticker.getTime()){
            scene.data.tTimer = createjs.Ticker.getTime() + 50;
            if (scene.data.tIndex < scene.data.tData.length){
                scene.data.tText.text = scene.data.tText.text + scene.data.tData[scene.data.tIndex];
                scene.data.tIndex = scene.data.tIndex + 1;                
            }
        }
    };
    
    scene.animateBuildings = function(event){
        if (scene.data.gTimer < createjs.Ticker.getTime()){
            scene.data.gTimer = createjs.Ticker.getTime() + 120;
            if (scene.data.growthCount > 0){
                var b = growth[scene.data.growthCount];                
                var shape = new createjs.Shape();
                shape.graphics.beginFill("#999999").drawRect(0, 0, b[0], b[0]);
                shape.x = b[1];
                shape.y = b[2];
                scene.data.growthCount--;
                scene.addChild(shape);
            } else if (scene.data.growthCount == 0) {
                scene.removeEventListener("tick", scene.animateBuildings);
                scene.removeEventListener("tick", scene.animateText);
                scene.data.finished = true;
                scene.data.fTimer = createjs.Ticker.getTime() + 300;
            }
        }        
    };

    scene.finish = function(event){
        if (scene.data.finished && scene.data.fTimer < createjs.Ticker.getTime()){
            console.log("exiting " + scene.name);
            nextScene();
        }
    };

    scene.addEventListener("tick", scene.animateText);    
    scene.addEventListener("tick", scene.animateBuildings);
    scene.addEventListener("tick", scene.finish);    
    scene.addChild(scene.data.tText);    
    return scene;
}

