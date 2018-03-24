
var name ="Paras";
var pos = "right";



/////
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-example', {
  preload: preload,
  create: create,
  update: update
});


var bow, bag, arrow, angle, newArrow;
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


var bow2, bag2, arrow2, angle2, newArrow2;
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
  game.load.image('bow', "assets/upperBody.png");
  game.load.image('bow2', "assets/upperBody2.png");
  game.load.image('arrow', arrowURI);
  game.load.image('bag', "assets/lowerBody.png");
  game.load.image('bag2', "assets/lowerBody2.png");
  game.load.image('mountain', "assets/mountain.png");
  game.load.image('back', "assets/background.png");
  game.load.image('cloud', "assets/cloud.png");
  game.load.image('cloud2', "assets/cloud2.png");
}

function create() {
            console.log("newplayer sent");

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
        scoreText = game.add.text(window.innerWidth-(window.innerWidth/5), window.innerHeight/20, 'score: 0', { fontSize: window.innerWidth/40, fill: '#fff' });
        xText = game.add.text(window.innerWidth/10, window.innerHeight-(window.innerHeight/10), '', { fontSize: window.innerWidth/40, fill: '#fff' });

}

function update() {
  //console.log(shot);
 
  if (!shot) {
    angle = Math.atan2(game.input.mousePointer.x - bow.x, -(game.input.mousePointer.y - bow.y)) * (180 / Math.PI) - 180;
     bow.angle = arrow.angle = angle;    
  } else {
    
    //console.log("x",x,"y",y,"xVel",xVel,"yVel",yVel,"oldx",oldx,"oldy",oldy);
  //        xText.text = 'x: ' + x;

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
    
    
 //   var intersects = Phaser.Rectangle.intersection(newArrow, bag);
   if(x>580 && x<610 && y > mountain.y+20) {
 //   scoreText.text=x +" "+y;
      resetArrow();
          game.add.tween(newArrow).to( { alpha: 0 }, 10000, Phaser.Easing.Linear.None, true);      
    }
   if(checkOverlap(newArrow, bag2)) {
      resetArrow();
      score+=45;
      scoreText.text = 'Score: ' + score;
          game.add.tween(newArrow).to( { alpha: 0 }, 10000, Phaser.Easing.Linear.None, true);
    }
  }
if (!shot2) {
//    angle2 = 180-Math.atan2(game.input.mousePointer.x - bow.x, -(game.input.mousePointer.y - bow.y)) * (180 / Math.PI);
        arrow2.angle = bow2.angle;
    
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
//        scoreText.text=x2 +" "+y2;
          resetArrow2();
          game.add.tween(newArrow2).to( { alpha: 0 }, 10000, Phaser.Easing.Linear.None, true);
        }
      
       if(checkOverlap(newArrow2, bag)) {
          //console.log(intersects.width);
      //    console.log("WTF");
          game.add.tween(newArrow2).to( { alpha: 0 }, 10000, Phaser.Easing.Linear.None, true);
          resetArrow2();
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
             xText.text = "Click near the bow to fire";

 if(!shot && game.input.mousePointer.x>0 
    && game.input.mousePointer.x<1200/2
      && game.input.mousePointer.y<3*700/4
      && game.input.mousePointer.y>700/4) {
             xText.text = 'mouse x: ' + game.input.mousePointer.x+' mouse y: ' + game.input.mousePointer.y;
    shot = true;
    newArrow = game.add.sprite(bow.x, bow.y , 'arrow');

      x=oldx=arrow.x-(bow.width/2*Math.cos(bow.angle*Math.PI/180));
      y=oldy=arrow.y-(bow.width/2*Math.sin(bow.angle*Math.PI/180));
 //   xText.text = bow.angle +" "+Math.sin(bow.angle);
    newArrow.anchor.setTo(.5);
 //   scoreText.text = newArrow.x;
    newArrow.scale.setTo(0.5);
    newArrow.angle = bow.angle;
    xVel = - (game.input.mousePointer.x-bow.x)/6;
    yVel = - (game.input.mousePointer.y-bow.y)/6;
    Client.sendClick(game.input.mousePointer.x, game.input.mousePointer.y, angle);

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
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    boundsB.y -= 20;
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

  bow2.angle=angle;
    shot2 = true;
     x2=oldx2=arrow2.x-(1-Math.cos(bow2.angle*Math.PI/180)*bow2.width/2);
      y2=oldy2=arrow2.y+(bow2.width/2*Math.sin(bow2.angle*Math.PI/180));

    newArrow2 = game.add.sprite(bow2.x, bow2.y, 'arrow');
    newArrow2.anchor.setTo(0.5);
    newArrow2.scale.setTo(0.5);
    newArrow2.angle = bow2.angle;
    xVel2 = - (x-bow2.x)/6;
    yVel2 = - (y-bow2.y)/6;
 
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

setHeight = function(height){
    mountain.y=height;
}