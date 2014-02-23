/*

var nesp = require('./lib/nesp');

*/


/*
 * HTTP/SOCKET SERVER
 * server.js
 * Handles all http and socket communication
 * Auther: Michaelangelo Jong
 */

////GLOBAL VARIABLES////
var fs     = require('fs'),
    crypto = require('crypto'),
    url    = require('url'),
    mime   = require('mime'),
    Comm   = require('./lib/communicator.js'),
    dirpublic = '/public',
    path = require('path'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var port = 8080;
server.listen(port, function() {
    console.log('Listening on '+port);
});

//var emulator = new Comm('lib/emulatorFactory.js', [path.join(__dirname,'/roms/lj65/lj65.nes')]);

var running = {};

function genHash() {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
};

function createGame (filePath, room) {
        var emulator = new Comm('lib/emulatorFactory.js', [path.join(__dirname, filePath)]);
        emulator.on('frame', function (data) {
            //console.log(data);
            io.sockets.in(room).emit('frame', data);
            //io.sockets.emit('frame', data);
        });
        emulator.on('audio', function (data){
            //io.sockets.emit('audio', data);
            io.sockets.in(room).emit('audio', data);
        });
        return emulator;
}

function ws_handler(socket) {

    socket.on('createRoom', function(data, callback) {
        var filePath = data.filePath;
        var room = genHash();

        var emulator = createGame(filePath, room);

        running[room] = emulator;
        
        console.log(filePath, room);

        socket.join(room);
        socket.emulator = emulator;

        callback && callback({
            room: room
        });

    });

    var leaveRoom = function(room) {
        socket.leave(room);
        socket.emulator = null;
    };
    var checkForEmptyRooms = function() {
        var rooms = io.sockets.manager.rooms;
        for (room in rooms) {
            var r = room.substring(1);
            if (io.sockets.clients(room).length < 1){
                 //delete room logic here
                 console.log('Delete room', r);
                 var emulator = running[r];
                 if (emulator) {
                    console.log(emulator);
                     //emulator.kill();
                 }
            }
        }
    };

    socket.on('leaveRoom', function(data) {
        var room = data.room;
        leaveRoom(room);
        checkForEmptyRooms();
    });

    socket.on('disconnect',function() {
        checkForEmptyRooms();
    });

    socket.on('joinRoom', function(data, callback) {
        var room = data.room;
        console.log('joinRoom', room);
        socket.join(room);
        socket.emulator = running[room];
        if (socket.emulator) {
            callback && callback(true);
        }
        else{
            callback && callback(false);
        }
    });


    socket.on('control', function(btn){
        var emulator = socket.emulator;
        if (socket.emulator) {
            emulator.send('control', btn);
        }
    });
}

var publicDir = __dirname + '/public/';
//app.use(express.directory(publicDir));
app.use(express.static(publicDir));

io.sockets.on('connection', ws_handler);
io.set('log level', 1);

//server.createServer(http_handler).listen(8000);
