/**
File: emulatorFactory.js
Author: Glavin Wiechert
*/

var filePath = process.argv[2];
console.log(filePath);

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
//var template = require('../emulators/template');
//registerEmulator(template);
var nes = require('../emulators/nes');
registerEmulator(nes);

// TODO: Figure out the correct emulator
var emu = new supportedEmulators[0]({});
emu.loadRom(filePath);