module.exports = function Comunicator(filename) {
    var EventEmitter = require('events').EventEmitter,
        event = new EventEmitter(),
        sendChild = function () {
            if (child) {
                    console.log(arguments);
                child.send(Array.prototype.slice.call(arguments));
            }
        },
        sendParent = function () {
            process.send(Array.prototype.slice.call(arguments));
        },
        cp, child;

    if (filename) {
        cp = require('child_process')
        child = cp.fork(filename);
        child.on('message', function (message) {
            event.emit(message.shift(), message);
        });
        Object.defineProperty(event, 'send', { value: sendChild });
    } else {
        process.on('message', function (message) {
            event.emit(message.shift(), message);
        });
        Object.defineProperty(event, 'send', { value: sendParent });
    }

    return event;
};