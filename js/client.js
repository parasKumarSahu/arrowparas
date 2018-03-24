/**
 * Created by Jerome on 03-03-17.
 */

var Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function(name, pos){
            console.log("newplayer Client");
    Client.socket.emit('newplayer',{name: name, pos: pos});
};

Client.socket.on('allplayer',function(data){
            addNewPlayer(data.name);
            console.log("first "+data.name);            
});

Client.sendClick = function(x,y,angle){
  Client.socket.emit('click',{x:x,y:y,angle:angle});
};



Client.socket.on('newplayer',function(data){
     for(var i = 0; i < data.length; i++){
        if(data[i].name!==name){
            addNewPlayer(data[i].name);
            console.log(data[i].name);            
       }
     }
Client.socket.on('move',function(data){
        console.log("moving "+data.x+" "+data.y+" "+data.angle);
        movePlayer(data.x,data.y,data.angle);
    });

Client.socket.on('mountainY',function(data){
        console.log("mountainY "+data.mountainY);
        setHeight(data.mountainY);
    });

});
