var JSNES = require('node-nes')({});
var communicator = require('../lib/communicator');
var fs = require('fs');

module.exports = function(config) {
    var self = this;
    
    var ui = JSNES.ui;

    self.loadRom = function(filePath) {
        ui.updateStatus("Downloading...");
        fs.readFile(filePath, {encoding: 'binary'}, function(err, data) {
            if (err) { 
                console.log(err);
                return err; 
            }
            ui.nes.loadRom(data);
            ui.nes.start();
            ui.enable();
            var canvas = ui.nes.ui.screen[0];
            /*
            http.createServer(function (req, res) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(''
                    + '<meta http-equiv="refresh" content="1;" />'
                    + '<img src="' + canvas.toDataURL() + '" />');
            }).listen(3000);
            console.log('Server started on port 3000');
            */

            // Callback for updating audio
            var updateAudio = config.updateAudio;
            var parent = new communicator();
            
            parent.on('control', function (key){
                JSNES.keyboard.setKey(key[0][0], key[0][1]);
            });



            setInterval(function() {
                parent.send('frame', canvas.toDataURL());
            }, 10);

            ui.nes.opts.emulateSound = true;
            ui.writeAudio = function(samples) {
                //console.log('audio');
                //console.log(samples);
                parent.send('audio', JSON.stringify(samples));
            };

        });
    };
    return self;
};