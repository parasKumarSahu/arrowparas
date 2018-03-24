var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/part1',function(req,res){
    res.sendFile(__dirname+'/part1.html');
});

server.lastPlayderID = 0;

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

io.on('connection',function(socket){

    socket.on('newplayer',function(data){
        console.log(data.name+" server");
        socket.player = {
            name: data.name,
            pos: data.pos,
            x: 0,
            y: 0,
            angle: 0,
            mountainY: 100
        };
        socket.emit('newplayer', getAllPlayers());
        socket.broadcast.emit('allplayer',socket.player);

        socket.on('click',function(data){
            console.log('click to '+data.x+', '+data.y+" "+data.angle);
            socket.player.x = data.x;
            socket.player.y = data.y;
            socket.player.angle = data.angle;
            socket.broadcast.emit('move',socket.player);
        });
            var inc = true;
        setInterval(() => {
            if(socket.player.mountainY == 400){
                inc = false;
            }
            if(socket.player.mountainY == 100){
                inc = true;
            }
            if(inc == true ){
                socket.player.mountainY += 5;
            }
            else{
                socket.player.mountainY -= 5;                
            }
            io.emit('mountainY', socket.player);
        }, 500);

        socket.on('disconnect',function(){
            io.emit('remove',socket.player.name);
        });
    });

    socket.on('test',function(){
        console.log('test received');
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}
