CanvasRenderingContext2D.prototype.fillcircle=function(x_circle, y, r){
    var x;
    if (typeof x_circle === 'object') {
        x = x_circle.x;
        y = x_circle.y;
        r = x_circle.r;
    } else {
        x = x_circle;
    }
    this.beginPath();
    this.arc(x,y,r,0,2*Math.PI);
    this.closePath();
    this.fill();
};

var socket = io.connect("http://:8080/");
FR = 0;var b = new Image();
socket.on("frame", function(data) {
    var fr=parseInt(1000/(Date.now()-FR));
    FR = Date.now();
    //b.src = data;
    c.clear();
    //c.drawImage(b,0,0);
    c.fillText("fr: " + fr,60,10);
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
