/**
File: emulatorFactory.js
Author: Glavin Wiechert
*/

module.exports = function() {
    var self = this;

    var supportedEmulators = [];
    self.registerEmulator = function(emulator) {
        if (self.validEmulatory(emulator)) {
            supportedEmulators.push(emulator);
        }
    };
    self.verifyEmulator = function(emulator) {
        // TODO
        return true;
    }

    // Register 
    
    
    return self;
};