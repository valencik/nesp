/**
File: emulatorFactory.js
Author: Glavin Wiechert
*/

var filePath = process.argv[0];

// Init factory
var supportedEmulators = [];
var validEmulator = function(emulator) {
    // TODO
    return true;
};
var registerEmulator = function(emulator) {
    if (validEmulator(emulator)) {
        supportedEmulators.push(emulator);
    }
};

// Register 
var template = require('../emulators/template');
registerEmulator(template);

// Emulator Factory
//var self = this;
console.log('this should run');

// TODO: Figure out the correct emulator
var self = new supportedEmulators[0]({});
console.log(supportedEmulators);
