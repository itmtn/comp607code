

function scene1Create(){    
    var scene1 = new createjs.Container();
    scene1.tTimer = 0;
    scene1.tData = "The world is becoming more urbanized and by 2050 more than 60% of the world's \n population is expected to live in cities";    
    scene1.tIndex = 0;

    tText = new createjs.Text("", "20px Arial", "#000000");
    tText.x = 20;
    tText.y = 20;
    
    createjs.Ticker.addEventListener("tick", function(event){
        if (scene1.tTimer < createjs.Ticker.getTime()){
            scene1.tTimer = createjs.Ticker.getTime() + 100;
            if (scene1.tIndex < scene1.tData.length){
                tText.text = tText.text + scene1.tData[scene1.tIndex];
                scene1.tIndex = scene1.tIndex + 1;
            }
        }        
    });
   
    var city = [];

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
                  [30,556,184]
                ];

    for(var i = 0; i < buildings.length; i++){
        var building = buildings[i];
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#999999").drawRect(0, 0, building[0], building[0]);
        shape.x = building[1];
        shape.y = building[2];
        scene1.addChild(shape);
    }

    stage.addEventListener("stagemouseup", function(event){
        //(event.stageX, event.stageY);
        var shape = new createjs.Shape();
        //var size = (Math.random() * 20) + 20;
        size = 30;
        shape.graphics.beginFill("#999999").drawRect(0, 0, size, size);
        shape.x = event.stageX;
        shape.y = event.stageY;        
        scene1.addChild(shape);
        city.push([size, event.stageX, event.stageY]);
        console.clear();
        cstr = "";
        for(var i = 0; i < city.length; i++){
            cstr += "[" + city[i][0] + "," + city[i][1] + "," + city[i][2] + "],";
        }
        console.log(cstr);
    });

    scene1.addChild(tText);    
    return scene1;
}