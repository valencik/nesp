/** Emulator Template */
var communicator = require('../lib/communicator');

module.exports = function(config) {
    var self = this;
    config = config || {};
    
    // Supported extensions
    var extensions = ['.*'];
    self.getExtensions = function() { 
        return extensions; 
    };

    // Controller Event Receiver
    var controller = function(control) {

    };

    // Required Controls
    self.requiredControlers = [];

    // Callback for updating frame
    self.updateFrame = config.updateFrame;

    // Callback for updating audio
    var updateAudio = config.updateAudio;
    var parent = new communicator();
    
    setInterval(function() {
        console.log('send frame');
        parent.send('frame', 'this is an example');
    }, 100);

    return self;
};