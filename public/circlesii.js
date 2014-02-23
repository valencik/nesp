
var Canvas = function Canvas(id, context) {
    var canvas = document.getElementById(id);
    var can = canvas.getContext(context);
    can.width = canvas.width = 256;
    can.height = canvas.height = 240;
    can.clear = function clear() {
        this.clearRect(0,0,this.width,this.height);
    }

    return can;
}

//var c = new Canvas('can', '2d');

var socket = io.connect("http://:8080/");
FR = 0;var b = new Image();
socket.on("frame", function(data) {
    var fr=parseInt(1000/(Date.now()-FR));
    FR = Date.now();
    //b.src = data;
    //c.clear();
    //c.drawImage(b,0,0);
    //c.fillText("fr: " + fr,60,10);
    //console.log(data);
    document.getElementById('cans').src = data;
    //socket.emit('done');
});

// Audio
var dynamicaudio = new DynamicAudio({'swf': 'dynamicaudio.swf'})
socket.on('audio', function(data) {
    //console.log(data);
    dynamicaudio.writeInt(JSON.parse(data));
});

var sampledata = [];
var freq = 440;
var interval = null;
//var dynamicaudio = new DynamicAudio({'swf': 'dynamicaudio.swf'});

function start() {
    interval = setInterval(function() {
        var n = Math.ceil(freq / 100) * 2;
        for (var i=0; i < n; i++) {
            dynamicaudio.write(sampledata);
        }
    }, 10);
}

function stop() {
    if (interval != null) {
        clearInterval(interval);
        interval = null;
    }
}

(function generateWaveform() {
    freq = 440;
    // we're playing at 44.1kHz, so figure out how many samples
    // will give us one full period
    var samples = 44100 / freq;
    sampledata = Array(Math.round(samples));
    for (var i=0; i < sampledata.length; i++) {
        sampledata[i] = Math.sin(2*Math.PI * (i / sampledata.length));
    }
})();

function down(key){
    console.log(key, 1);
}
function up(key){
    console.log(key, 0);
}


window.onkeydown = function (evt) {
    toggleKey(evt.keyCode, 1);
    console.log(evt.keyCode);
};
window.onkeyup = function (evt) {
    toggleKey(evt.keyCode, 0);
};


var controller = {
    player1_magic : [
        88,
        89,
        17,
        13,
        38,
        40,
        37,
        39
    ],
    player2_magic : [
        103,
        105,
        99,
        97,
        104,
        98,
        100,
        102
    ],
    player1_bind : [
        190,
        191,
        32,
        13,
        87,
        83,
        65,
        68
    ],
    player2_bind : [
        90,
        88,
        49,
        50,
        38,
        40,
        37,
        39
    ],
    player1_state : [0,0,0,0,0,0,0,0],
    player2_state : [0,0,0,0,0,0,0,0]
},
keys = {
        KEY_A: 0,
        KEY_B: 1,
        KEY_SELECT: 2,
        KEY_START: 3,
        KEY_UP: 4,
        KEY_DOWN: 5,
        KEY_LEFT: 6,
        KEY_RIGHT: 7
    };


function toggleKey(key, state) {
    oldState, currentKey, player;

    switch (key) {
        case controller.player1_bind[keys.KEY_A] : 
                oldState = controller.player1_state[keys.KEY_A];
                currentKey = keys.KEY_A;
                player = 1;
                break;
        case controller.player1_bind[keys.KEY_B] : 
                oldState = controller.player1_state[keys.KEY_B];
                currentKey = keys.KEY_B;
                player = 1;
                break;
        case controller.player1_bind[keys.KEY_SELECT] : 
                oldState = controller.player1_state[keys.KEY_SELECT];
                currentKey = keys.KEY_SELECT;
                player = 1;
                break;
        case controller.player1_bind[keys.KEY_START] : 
                oldState = controller.player1_state[keys.KEY_START];
                currentKey = keys.KEY_START;
                player = 1;
                break;
        case controller.player1_bind[keys.KEY_UP] : 
                oldState = controller.player1_state[keys.KEY_UP];
                currentKey = keys.KEY_UP;
                player = 1;
                break;
        case controller.player1_bind[keys.KEY_DOWN] : 
                oldState = controller.player1_state[keys.KEY_DOWN];
                currentKey = keys.KEY_DOWN;
                player = 1;
                break;
        case controller.player1_bind[keys.KEY_LEFT] : 
                oldState = controller.player1_state[keys.KEY_LEFT];
                currentKey = keys.KEY_LEFT;
                player = 1;
                break;
        case controller.player1_bind[keys.KEY_RIGHT] : 
                oldState = controller.player1_state[keys.KEY_RIGHT];
                currentKey = keys.KEY_RIGHT;
                player = 1;
                break;

        

        case controller.player2_bind[keys.KEY_A] : 
                oldState = controller.player2_state[keys.KEY_A];
                currentKey = keys.KEY_A;
                player = 2;
                break;
        case controller.player2_bind[keys.KEY_B] : 
                oldState = controller.player2_state[keys.KEY_B];
                currentKey = keys.KEY_B;
                player = 2;
                break;
        case controller.player2_bind[keys.KEY_SELECT] : 
                oldState = controller.player2_state[keys.KEY_SELECT];
                currentKey = keys.KEY_SELECT;
                player = 2;
                break;
        case controller.player2_bind[keys.KEY_START] : 
                oldState = controller.player2_state[keys.KEY_START];
                currentKey = keys.KEY_START;
                player = 2;
                break;
        case controller.player2_bind[keys.KEY_UP] : 
                oldState = controller.player2_state[keys.KEY_UP];
                currentKey = keys.KEY_UP;
                player = 2;
                break;
        case controller.player2_bind[keys.KEY_DOWN] : 
                oldState = controller.player2_state[keys.KEY_DOWN];
                currentKey = keys.KEY_DOWN;
                player = 2;
                break;
        case controller.player2_bind[keys.KEY_LEFT] : 
                oldState = controller.player2_state[keys.KEY_LEFT];
                currentKey = keys.KEY_LEFT;
                player = 2;
                break;
        case controller.player2_bind[keys.KEY_RIGHT] : 
                oldState = controller.player2_state[keys.KEY_RIGHT];
                currentKey = keys.KEY_RIGHT;
                player = 2;
                break;
    }
    if (oldState !== state && typeof currentKey === 'number') {
        console.log('change');
        if (player === 1) {
            socket.emit('control', [controller.player1_magic[currentKey], state]);
            controller.player1_state[currentKey] = state;
        } else {
            socket.emit('control', [controller.player2_magic[currentKey], state]);
            controller.player2_state[currentKey] = state;
        }
    }
}