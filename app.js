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
var server = require('http'),
    fs     = require('fs'),
    url    = require('url'),
    mime   = require('mime'),
    io     = require('socket.io'),
    Comm   = require('./lib/communicator.js'),
    dirpublic = '/public',
    path = require('path');

////HTTP REQUEST HANDLER////
function http_handler(req, res) {
    var request = url.parse(req.url, true),
        file    = request.pathname;

    if (file.lastIndexOf('.') < file.lastIndexOf('/')) {
        if (file.lastIndexOf('/') < file.length-1) {
            file += '/index.html';
        } else {
            file += 'index.html';
        }
    }

    var mimeType = mime.lookup(__dirname + dirpublic + file),
        message  = mimeType + ' >> ' + file;

    fs.readFile(__dirname + dirpublic + file, function(err, data) {
        if (err) {
            console.log(__dirname + dirpublic + file);
            res.writeHead(404);
            return res.end('Error loading ' + file);
        }
        res.writeHead(200, {'Content-Type': mimeType});
        res.end(data);
    });
}

//var emulator = new Comm('lib/emulatorFactory.js', [path.join(__dirname,'/roms/lj65/lj65.nes')]);

var running = {};

function genHash() {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
};

function createGame (filepath, room) {
        var emulator = new Comm('lib/emulatorFactory.js', [path.join(__dirname,filePath)]);
        emulator.on('frame', function (data){
            io.sockets.in('room').emit('frame', data);
            //io.sockets.emit('frame', data);
        });
        emulator.on('audio', function (data){
            //io.sockets.emit('audio', data);
            io.sockets.in('room').emit('audio', data);
        });
        return emulator;
}

function ws_handler(socket) {


    socket.on('createRoom', function(data, callback) {
        var filePath = data.filePath;
        var room = genHash();

        var emulator = createGame(filePath, room);

        running[room] = emulator;
        
        socket.join(room);

        callback && callback({
            room: room
        });

    });

    socket.on('leaveRoom', function(data) {
        var room = data.room;
        socket.leave(room);
    });

    socket.on('joinRoom', function(data) {
        var room = data.room;
        socket.join(room);
    });


    socket.on('control', function(btn){
        emulator.send('control', btn);
    });
}



io = io.listen(8080);
io.sockets.on('connection', ws_handler);
io.set('log level', 1);

server.createServer(http_handler).listen(8000);