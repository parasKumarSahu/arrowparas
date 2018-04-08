
var name ="Maisha";
var pos = "left";
var name2="";




var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-example', {
  preload: preload,
  create: create,
  update: update
});

var emitter;

var bow, bag, arrow, angle, newArrow;
var Health=100;
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

var bow2, bag2, arrow2, angle2, newArrow2;
var Health2=100;
var x2;
var y2;
var oldx2, oldy2;
var xVel2;  // calculate this based on distance
var yVel2;  // 
var arrowCreated2 = false;
var shot2 = false;
var scoreText2;

var dragging = false;

function preload() {
game.load.image('diamond', 'assets/diamond.png');

  game.load.image('bow', "assets/upperBody.png");
  game.load.image('bow2', "assets/upperBody2.png");
  game.load.image('arrow', arrowURI);
  game.load.image('bag', "assets/lowerBody.png");
  game.load.image('bag2', "assets/lowerBody2.png");
  game.load.image('mountain', "assets/mountain.png");
  game.load.image('back', "assets/background.png");
  game.load.image('cloud', "assets/cloud.png");
  game.load.image('cloud2', "assets/cloud2.png");
  game.load.audio('music', "assets/music.mp3");
  game.load.audio('hitMountain', "assets/hitMountain.mp3");
  game.load.audio('hitPlayer', "assets/pain.mp3");
  game.load.audio('releaseArrow', "assets/releaseArrowShort.mp3");  
}


function create() {
            console.log("newplayer sent");
  music = game.add.audio('music');
  game.sound.setDecodedCallback(music, start, this);
  releaseArrow = game.add.audio("releaseArrow");
  hitMountain = game.add.audio("hitMountain");
  hitPlayer = game.add.audio("hitPlayer");

  Client.askNewPlayer(name, pos);
  game.world.setBounds(0, 0, 1200, 700);
  back = game.add.sprite(0, 0, 'back');
  back.scale.setTo(window.innerWidth/back.width, window.innerHeight/back.height);
   cloud = game.add.sprite(1200/10+20, 450, 'cloud');
  cloud.anchor.setTo(.5);
  cloud2 = game.add.sprite(1200-(1200/10)-20, 450, 'cloud2');
  cloud2.anchor.setTo(.5);
   bow = game.add.sprite(1200/10+10, 700/2-10, 'bow');
  bow.anchor.setTo(1, .5);
  
  bow2 = game.add.sprite(1200-(1200/10)-10, 700/2-10,'bow2');
  bow2.anchor.setTo(0, .5);
  
  bag = game.add.sprite(1200/10, 700/2, 'bag');
  bag.anchor.setTo(0.5);
  bag2 = game.add.sprite(1200-(1200/10), 700/2,'bag2');
  bag2.anchor.setTo(0.5);  //game.physics.arcade.enable(newArrow);
 
  mountain = game.add.sprite(game.world.centerX-185, 700/2, 'mountain');
//  bow2.anchor.setTo(0.5);
  mountain.y=100;
  mountain.x=600-mountain.width/2;
  arrow = game.add.sprite(bow.x, bow.y-bow.height/2, 'arrow');
  arrow.scale.setTo(0.5);
  arrow.pivot.x = 100;
  arrow.anchor.setTo(.5);
  arrow.x=bow.x;
  arrow.y=bow.y;


  arrow.angle = bow.angle;
 
      x=oldx=arrow.x-(bow.width/2*Math.cos(bow.angle*Math.PI/180));
      y=oldy=arrow.y-(bow.width/2*Math.sin(bow.angle*Math.PI/180));
  arrow2 = game.add.sprite(bow2.x, bow2.y, 'arrow');
  arrow2.scale.setTo(0.5);
  arrow2.pivot.x = -100;
  arrow2.anchor.setTo(.5);
  arrow2.x=bow2.x;
  arrow2.y=bow2.y;
 
 arrow2.angle = bow2.angle;
 
      x2=oldx2=arrow2.x-(1-Math.cos(bow2.angle*Math.PI/180)*bow2.width/2);
      y2=oldy2=arrow2.y+(bow2.width/2*Math.sin(bow2.angle*Math.PI/180));
 
  //game.input.onDown.add(createArrow, this);
  game.input.onUp.add(shootArrow, this);
  scoreText = game.add.text(window.innerWidth/20, window.innerHeight/20, 'Not connected', { fontSize: window.innerWidth/50, fill: '#fff' });
  scoreText2 = game.add.text(window.innerWidth-(window.innerWidth/4), window.innerHeight/20, name+" Health = 100", { fontSize: window.innerWidth/50, fill: '#fff' });
 
  xText = game.add.text(window.innerWidth/10, window.innerHeight-(window.innerHeight/10), '', { fontSize: window.innerWidth/50, fill: '#fff' });


  game.physics.startSystem(Phaser.Physics.ARCADE);

    emitter = game.add.emitter(0, 0, 100);

    emitter.makeParticles('diamond');
    emitter.gravity = 200;

  //////////////////////////////////////////////

}

function update() {
  //console.log(shot);
  if (!shot) {
  //  angle = -1*Math.atan2(game.input.mousePointer.x - bow2.x, -(game.input.mousePointer.y - bow2.y)) * (180 / Math.PI);
     arrow.angle = bow.angle = 90;
    
  } else {
    
    //console.log("x",x,"y",y,"xVel",xVel,"yVel",yVel,"oldx",oldx,"oldy",oldy);
//      xText.text = 'x: ' + x;
    
    x += xVel;
    y += yVel;
    yVel += g;

    newArrow.x = x;
    newArrow.y = y;
    
    
    arrowAngle = Math.atan2(x-oldx, -(y-oldy)) * (180 / Math.PI);
    newArrow.angle = arrowAngle;
     oldx = x;
     oldy = y;
    
    
   if(newArrow.y>window.innerHeight || newArrow.x>window.innerWidth
     || newArrow.y<0 || newArrow.x<0) {
    resetArrow();
          game.add.tween(newArrow).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    }
     if(x>580 && x<610 && y > mountain.y+20) {
  //  scoreText.text=x +" "+y;
      resetArrow();
              hitMountain.play();
          game.add.tween(newArrow).to( { alpha: 0 }, 10000, Phaser.Easing.Linear.None, true);
    }
  
    
 //   var intersects = Phaser.Rectangle.intersection(newArrow, bag);
    if(checkOverlap(newArrow, bag2)) {
      //console.log(intersects.width);
  //    console.log("WTF");
      resetArrow();
          hitPlayer.play();
 emitter.x = bag2.x;
    emitter.y = bag2.y-50;

    emitter.start(true, 2000, null, 10);

    Health2-=10;
       scoreText2.text = name+' Health = ' + Health2;
  
          game.add.tween(newArrow).to( { alpha: 0 }, 10000, Phaser.Easing.Linear.None, true);
    }
  }
if (!shot2) {
    angle2 = Math.atan2(game.input.mousePointer.x - bow2.x, -(game.input.mousePointer.y - bow2.y)) * (180 / Math.PI)-180;
        if(game.input.activePointer.isDown && !dragging)
        {
            dragging = true;
        }
        if(!game.input.activePointer.isDown && dragging)
        {
            dragging = false;
        }

        if(dragging)
        {
         bow2.angle = arrow2.angle = angle2;    
        }
        else{
          bow2.angle = arrow2.angle = -90; 
        }   
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
    
    
    if(newArrow2.y>window.innerHeight || newArrow2.x>window.innerWidth
     || newArrow2.y<0 || newArrow2.x<0) {
    resetArrow2();
          game.add.tween(newArrow2).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    }


      if(x2>590 && x2<620 && y2 > mountain.y+20) {
  //      scoreText.text=x2 +" "+y2;
            hitMountain.play();
          resetArrow2();
           game.add.tween(newArrow2).to( { alpha: 0 }, 10000, Phaser.Easing.Linear.None, true);
        }

    if(checkOverlap(newArrow2, bag)) {
        //console.log(intersects.width);
    //    console.log("WTF");
          hitPlayer.play();
      
        resetArrow2();
   emitter.x = bag.x;
    emitter.y = bag.y-50;

    emitter.start(true, 2000, null, 10);

        Health-=10;
   //     console.log(score);
        scoreText.text = name2+' Health = ' + Health;
          game.add.tween(newArrow2).to( { alpha: 0 }, 10000, Phaser.Easing.Linear.None, true);

      }
    
    
  }
}

function resetArrow() {
  shot = false;
  arrow.x=bow.x;
  arrow.y=bow.y;

      x=oldx=arrow.x-(bow.width/2*Math.cos(bow.angle*Math.PI/180));
      y=oldy=arrow.y-(bow.width/2*Math.sin(bow.angle*Math.PI/180));
 }
function resetArrow2() {
  shot2 = false;
  arrow2.x=bow2.x;
  arrow2.y=bow2.y;

       x2=oldx2=arrow2.x-(1-Math.cos(bow2.angle*Math.PI/180)*bow2.width/2);
      y2=oldy2=arrow2.y+(bow2.width/2*Math.sin(bow2.angle*Math.PI/180));
}



function createArrow() {
  arrowCreated = true;
}

function shootArrow() {

 // if(!shot2 && game.input.mousePointer.x<793 && game.input.mousePointer.x>757 && game.input.mousePointer.y<290 && game.input.mousePointer.y>230) {
               xText.text = "Drag mouse behind the bow to rotate the bow and relase mouse to fire";

  if(!shot2 && game.input.mousePointer.x<window.innerWidth 
    && game.input.mousePointer.x>1200/2
      && game.input.mousePointer.y>700/6) {
 //             xText.text = 'mouse x: ' + game.input.mousePointer.x+' mouse y: ' + game.input.mousePointer.y;
  xText.text = "";
 shot2 = true;

     releaseArrow.play();
 
 //   xText.text = bow2.angle;
      x2=oldx2=arrow2.x-(1-Math.cos(bow2.angle*Math.PI/180)*bow2.width/2);
      y2=oldy2=arrow2.y+(bow2.width/2*Math.sin(bow2.angle*Math.PI/180));


    newArrow2 = game.add.sprite(bow2.x, bow2.y, 'arrow');
    newArrow2.anchor.setTo(0.5);
    newArrow2.scale.setTo(0.5);
    newArrow2.angle = bow2.angle;
    xVel2 = - (game.input.mousePointer.x-bow2.x)/5;
    yVel2 = - (game.input.mousePointer.y-bow2.y)/5;
    Client.sendClick(game.input.mousePointer.x, game.input.mousePointer.y, angle2);


    if(bow2.y==340){
      bow2.y = 190;
      arrow2.y = 200; 
      cloud2.y = 300;
      bag2.y = 200;
    }
    else{
      bow2.y = 340;
      arrow2.y = 350;
      cloud2.y = 450;             
      bag2.y = 350;
    }

  }



}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    boundsB.y -= 40;
    boundsB.width-=50;
    boundsB.height+=20;
    if(spriteB.x<350){
      boundsB.x+=45;
    }
//    game.debug.spriteBounds(spriteA);

 //  game.debug.geom( boundsB, 'rgba(255,0,0,1)' ) ;
     return Phaser.Rectangle.intersects(boundsA, boundsB);

}

var bowURI = 'assets/bow.gif';

var bagURI = 'assets/bag.gif';

var arrowURI = 'assets/arrow.gif';




addNewPlayer = function(name){
    scoreText.text = name + " Health = 100";
    name2=name;
};

movePlayer = function(xi, yi, angle){
   xText.text = 'mouse x: ' + x+' mouse y: ' + y;

    bow.angle=angle;
    shot = true;

 
      x=oldx=arrow.x-(bow.width/2*Math.cos(bow.angle*Math.PI/180));
      y=oldy=arrow.y-(bow.width/2*Math.sin(bow.angle*Math.PI/180));
  //   console.log("x2="+x+" y2="+y+" angle2="+angle);
 
    newArrow = game.add.sprite(bow.x, bow.y, 'arrow');
    newArrow.anchor.setTo(0.5);
    newArrow.scale.setTo(0.5);
    newArrow.angle = bow.angle;
    xVel = - (xi-bow.x)/5;
    yVel = - (yi-bow.y)/5;

    releaseArrow.play();

   if(bow.y==340){
      bow.y = 190;
      arrow.y = 200;
      cloud.y = 300; 
      bag.y = 200;
    }
    else{
      bow.y = 340;
      arrow.y = 350;       
      cloud.y = 450; 
      bag.y = 350;
    }

}

setHeight = function(height){
    mountain.y=height;
}

function start() {

    music.loopFull(0.8);
}

