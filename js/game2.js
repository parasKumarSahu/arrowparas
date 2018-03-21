/*
var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('sprite','assets/sprites/sprite.png');
};

Game.create = function(){
    Game.playerMap = {};
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.events.onInputUp.add(Game.getCoordinates, this);
    Client.askNewPlayer();
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};







*/



var name ="Ayush";
var pos = "left";





var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
  preload: preload,
  create: create,
  update: update
});

var bow, bow2, arrow, angle, newArrow;
var score=0;
var x;
var y;
var oldx, oldy;
var xVel;  // calculate this based on distance
var yVel;  // 
var g = 0.25;
var arrowCreated = false;
var shot = false;
var scoreText;
var xText;

var bow2, arrow2, angle2, newArrow2;
var score2=0;
var x2;
var y2;
var oldx2, oldy2;
var xVel2;  // calculate this based on distance
var yVel2;  // 
var arrowCreated2 = false;
var shot2 = false;
var scoreText2;



function preload() {
  game.load.image('bow', bowURI);
  game.load.image('arrow', arrowURI);

}

function create() {
            console.log("newplayer sent");

  Client.askNewPlayer(name, pos);
  game.world.setBounds(0, 0, 800, 600);
  bow = game.add.sprite(100, 250, 'bow');
  bow.anchor.setTo(0.5);
  
  bow2 = game.add.sprite(650,250,'bow');
  bow2.anchor.setTo(0.5);
  //game.physics.arcade.enable(newArrow);
  
  arrow = game.add.sprite(bow.x, bow.y, 'arrow');
  arrow.anchor.setTo(0.5);
  arrow.scale.setTo(0.5);
  arrow.angle = bow.angle;
  x = oldx = arrow.x;
  y = oldy = arrow.y;

  arrow2 = game.add.sprite(bow2.x, bow2.y, 'arrow');
  arrow2.anchor.setTo(0.5);
  arrow2.scale.setTo(0.5);
  arrow2.angle = bow2.angle;
  x2 = oldx2 = arrow2.x;
  y2 = oldy2 = arrow2.y;

  //game.input.onDown.add(createArrow, this);
  game.input.onUp.add(shootArrow, this);
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
       xText = game.add.text(200, 516, 'x: 0', { fontSize: '32px', fill: '#fff' });

}

function update() {
  //console.log(shot);
  if (!shot) {
  //  angle = -1*Math.atan2(game.input.mousePointer.x - bow2.x, -(game.input.mousePointer.y - bow2.y)) * (180 / Math.PI);
  //      bow.angle = arrow.angle = angle;
    
  } else {
    
    //console.log("x",x,"y",y,"xVel",xVel,"yVel",yVel,"oldx",oldx,"oldy",oldy);
      xText.text = 'x: ' + x;
    
    x += xVel;
    y += yVel;
    yVel += g;

    newArrow.x = x;
    newArrow.y = y;
    
    
    arrowAngle = Math.atan2(x-oldx, -(y-oldy)) * (180 / Math.PI);
    newArrow.angle = arrowAngle;
     oldx = x;
     oldy = y;
    
    
    if(newArrow.y>600) {
      resetArrow();
    }
    
    
 //   var intersects = Phaser.Rectangle.intersection(newArrow, bag);
    if(checkOverlap(newArrow, bow2)) {
      //console.log(intersects.width);
  //    console.log("WTF");
      resetArrow();
    }
  }
if (!shot2) {
    angle2 = Math.atan2(game.input.mousePointer.x - bow2.x, -(game.input.mousePointer.y - bow2.y)) * (180 / Math.PI)-180;
        bow2.angle = arrow2.angle = angle2;
    
  } else {
    
    //console.log("x",x,"y",y,"xVel",xVel,"yVel",yVel,"oldx",oldx,"oldy",oldy);
    
    x2 += xVel2;
    y2 += yVel2;
    yVel2 += g;

    newArrow2.x = x2;
    newArrow2.y = y2;
    
    
    arrowAngle2 = Math.atan2(x2-oldx2, -(y2-oldy2)) * (180 / Math.PI);
    newArrow2.angle = arrowAngle2;
     oldx2 = x2;
     oldy2 = y2;
    
    
    if(newArrow2.y>600) {
      resetArrow2();
    }
    if(checkOverlap(newArrow2, bow)) {
        //console.log(intersects.width);
    //    console.log("WTF");
        resetArrow2();
        score+=45;
   //     console.log(score);
        scoreText.text = 'Score: ' + score;
      }
    
    
  }
}

function resetArrow() {
  shot = false;
  arrow.x=bow.x;
  arrow.y=bow.y;

  x=oldx=arrow.x;
  y=oldy=arrow.y;
}
function resetArrow2() {
  shot2 = false;
  arrow2.x=bow2.x;
  arrow2.y=bow2.y;

  x2=oldx2=arrow2.x;
  y2=oldy2=arrow2.y;
}



function createArrow() {
  arrowCreated = true;
}

function shootArrow() {
/*  if(!shot) {
    shot = true;
    newArrow = game.add.sprite(bow.x, bow.y, 'arrow');
    newArrow.anchor.setTo(0.5);
    newArrow.scale.setTo(0.5);
    newArrow.angle = bow.angle;
    xVel = - (game.input.mousePointer.x-bow.x)/6;
    yVel = - (game.input.mousePointer.y-bow.y)/6;
  }

*/
              xText.text = 'mouse x: ' + game.input.mousePointer.x+' mouse y: ' + game.input.mousePointer.y;

  if(!shot2 && game.input.mousePointer.x<793 && game.input.mousePointer.x>757 && game.input.mousePointer.y<290 && game.input.mousePointer.y>230) {
   shot2 = true;
    newArrow2 = game.add.sprite(bow2.x, bow2.y, 'arrow');
    newArrow2.anchor.setTo(0.5);
    newArrow2.scale.setTo(0.5);
    newArrow2.angle = bow2.angle;
    xVel2 = - (game.input.mousePointer.x-bow2.x)/6;
    yVel2 = - (game.input.mousePointer.y-bow2.y)/6;
    Client.sendClick(game.input.mousePointer.x, game.input.mousePointer.y, angle2);

  }



}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

var bowURI = 'assets/bow.gif';

var bagURI = 'assets/bag.gif';

var arrowURI = 'assets/arrow.gif';




addNewPlayer = function(name){
    scoreText.text = name;
};

movePlayer = function(x, y, angle){
   xText.text = 'mouse x: ' + x+' mouse y: ' + y;

  bow.angle=angle;
    shot = true;
    newArrow = game.add.sprite(bow.x, bow.y, 'arrow');
    newArrow.anchor.setTo(0.5);
    newArrow.scale.setTo(0.5);
    newArrow.angle = bow.angle;
    xVel = - (x-bow.x)/6;
    yVel = - (y-bow.y)/6;
}