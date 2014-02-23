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

var socket = io.connect("http://localhost:8080");
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