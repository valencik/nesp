var JSNES = require('node-nes')({});

module.export = function() {

    var self = JSNES.ui;

    self.updateStatus("Downloading...");
    fs.readFile('roms/lj65/lj65.nes', {encoding: 'binary'}, function(err, data) {
        //console.log(err, data);
        if (err) { 
            console.log(err);
            return err; 
        }
        
        self.nes.loadRom(data);
        console.log('Start');
        self.nes.start();
        console.log('Enable', self.nes.isRunning);
        self.enable();
        console.log('Done!');
        var canvas = self.nes.ui.screen[0];
        //console.log(self.nes.ui.canvasImageData);
        console.log(self.nes.frameTime);

        http.createServer(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(''
                + '<meta http-equiv="refresh" content="1;" />'
                + '<img src="' + canvas.toDataURL() + '" />');
        }).listen(3000);
        console.log('Server started on port 3000');

    });

};