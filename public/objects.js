Object.defineProperty(Array.prototype, 'right', {
    value: function right(a) {
        a = typeof a === 'number' ? a % this.length : 1;
        var b = this.splice(this.length-a,a).reverse();
        for(var i=0; i < b.length; i+=1) {
            this.unshift(b[i]);
        }
        return this;
    }
});
Object.defineProperty(Array.prototype, 'left', {
    value: function left(a) {
        a = typeof a === 'number' ? a % this.length : 1;
        var b = this.splice(0,a);
        for(var i=0; i < b.length; i+=1) {
            this.push(b[i]);
        }
        return this;
    }
});
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
/*******Polygon Object*******/
function Polygon(xPoints,yPoints){
    var x=[];
    var y=[];
    if(xPoints.constructor == Array && yPoints.constructor == Array){
        x=xPoints;
        y=yPoints;
    }
    this.set=set;
    this.set();
//Attributes
    function set(){
        var i=0;
        i=0;
        var wi=x[i];
        var hi=y[i];
        while(i<x.length){
            if(wi>x[i]){
                wi=x[i];
            }
            if(hi>y[i]){
                hi=y[i];
            }
            i++;
        }
        i=0;
        var wf=x[i];
        var hf=y[i];
        while(i<x.length){
            if(wf<x[i]){
                wf=x[i];
            }
            if(hf<y[i]){
                hf=y[i];
            }
            i++;
        }
        this.sides=x.length;
        this.xPoints=x;
        this.yPoints=y;
        this.xCenter=wi+(wf-wi)/2;
        this.yCenter=hi+(hf-hi)/2;
        this.height=hf-hi;
        this.width=wf-wi;
        this.xCoor=wi;
        this.yCoor=hi;
    }
//Methods
    this.addPoint=addPoint;
    this.removePoint=removePoint;
    this.movePoint=movePoint;
    this.reset=reset;
    this.translate=translate;
    this.resize=resize;
    this.contains=contains;
//Method Actions
    function addPoint(xPoint, yPoint, pointIndex){
        if(typeof pointIndex === 'number'){
            pointIndex=pointIndex;
        }else{
            pointIndex=x.length;
        }
        if(typeof xPoint === 'number' && typeof yPoint === 'number'){
            x.splice(pointIndex,0,xPoint);
            y.splice(pointIndex,0,yPoint);
        }
        this.set();
    }
    function removePoint(pointIndex){
        if(typeof pointIndex === 'number'){
            x.splice(pointIndex,1);
            y.splice(pointIndex,1);
        }
        this.set();
    }
    function movePoint(xPoint, yPoint, pointIndex){
        if(typeof pointIndex === 'number'){
            pointIndex=pointIndex;
        }else{
            pointIndex=x.length;
        }
        if(typeof xPoint === 'number' && typeof yPoint === 'number'){
            x.splice(pointIndex,1,xPoint);
            y.splice(pointIndex,1,yPoint);
        }
        this.set();
    }
    function reset(xPoints, yPoints){
        x.splice(0,x.length);
        y.splice(0,y.length);
        if(xPoints.constructor == Array && yPoints.constructor == Array){
            x=xPoints;
            y=yPoints;
        }
        this.set();
    }
    function translate(xMove, yMove){
        if(typeof xMove === 'number' && typeof yMove === 'number'){
            var i=0;
            while(i<x.length){
                x[i]+=xMove;
                y[i]+=yMove;
                i++;
            }
        }
        this.set();
    }
    function resize(sizeMultiplier){
        if(typeof sizeMultiplier === 'number'){
            var xTemp=this.xCoor;
            var yTemp=this.yCoor;
            var i=0;
            while(i<x.length){
                x[i]*=sizeMultiplier;
                y[i]*=sizeMultiplier;
                i++;
            }
        }
        this.set();
        this.translate(-1*(this.xCoor-xTemp),-1*(this.yCoor-yTemp));
    }
    function contains(xPoint, yPoint, c){
        var p=0;
        var V=0;
        if(typeof xPoint === 'number' && typeof yPoint === 'number'){
            if(xPoint >= this.xCoor && this.xCoor+this.width >= xPoint  &&  yPoint >= this.yCoor && this.yCoor+this.height >= yPoint){
                if(typeof c === 'object'){
                    c.fillRect(this.xCoor,yPoint,this.width,1);
                    c.fillRect(xPoint,this.yCoor,1,this.height);
                }
                x.push(x[0]);
                y.push(y[0]);
                var i=0;
                p=0;
                while(i<x.length-1){
                    if(x[i] < xPoint && xPoint < x[i+1]){
                        V=(y[i+1]-y[i])/(x[i+1]-x[i])*(xPoint-x[i])+y[i];
                        if(typeof c === 'object'){
                            c.fillRect(xPoint-2,V-2,5,5);
                        }
                        if(yPoint  >= V){
                            p++;
                        }
                    }else if(x[i+1] < xPoint && xPoint < x[i]){
                        V=(y[i]-y[i+1])/(x[i]-x[i+1])*(xPoint-x[i])+y[i];
                        if(typeof c === 'object'){
                            c.fillRect(xPoint-2,V-2,5,5);
                        }
                        if(yPoint >= V){
                            p++;
                        }
                    }else if(xPoint==x[i]){
                        if(typeof c === 'object'){
                            c.fillRect(xPoint-2,y[i]-2,5,5);
                        }
                        if(yPoint==y[i]){return true;}
                        if((x[i-1]<=x[i]&&x[i]<=x[i+1])||(x[i-1]>=x[i]&&x[i]>=x[i+1])){
                            if(yPoint >= y[i]){
                                p++;
                            }
                        }
                    }
                    i++;
                }
                x.pop();
                y.pop();
                if(p % 2 == 1){return true;}else{return false;}
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}
/*******Canvas methods to draw polygons*******/
CanvasRenderingContext2D.prototype.strokePoly=function(polygon){
    var x=[];
    var y=[];
    if(polygon.constructor == Polygon){
        x=polygon.xPoints;
        y=polygon.yPoints;
    }
    var i=0;
    this.beginPath();
    this.moveTo(x[i],y[i]);
    while(i<x.length){
        i++;
        this.lineTo(x[i],y[i]);
    }
    this.closePath();
    this.stroke();
}
CanvasRenderingContext2D.prototype.fillPoly=function(polygon){
    var x=[];
    var y=[];
    if(polygon.constructor == Polygon){
        x=polygon.xPoints;
        y=polygon.yPoints;
    }
    var i=0;
    this.beginPath();
    this.moveTo(x[i],y[i]);
    while(i<x.length){
        i++;
        this.lineTo(x[i],y[i]);
    }
    this.closePath();
    this.fill();
}
CanvasRenderingContext2D.prototype.clearPoly=function(polygon){
    var x=[];
    var y=[];
    if(polygon.constructor == Polygon){
        x=polygon.xPoints;
        y=polygon.yPoints;
    }
    var i=0;
    this.globalCompositeOperation = "destination-out";
    this.beginPath();
    this.moveTo(x[i],y[i]);
    while(i<x.length){
        i++;
        this.lineTo(x[i],y[i]);
    }
    this.closePath();
    this.fill();
    this.globalCompositeOperation = "source-over";
}
CanvasRenderingContext2D.prototype.fillcircle=function(x,y,r){
    this.beginPath();
    this.arc(x,y,r,0,2*Math.PI);
    this.closePath();
    this.fill();
}
var ans = {
    size: 5,
    x:0,y:0,
    walk: function (x, y, s, next) {
        var that = this,
            newX = this.x + x,
            newY = this.y + y,
            walker = function (next) {
                setTimeout(function() {
                    if (newX != that.x) that.x += x=0 ? 0 : (x>0 ? 1 : -1);
                    if (newY != that.y) that.y += y=0 ? 0 : (y>0 ? 1 : -1);
                    if ((newX != that.x) || (newY != that.y)) walker(next);
                    else if (typeof next === 'function') next();
                },s);
            };
        walker(next);
    }
};

var an=[];
an.create = function(a) {
    this.push(Object.create(ans));

}

var draw = function draw(rect){
    var c = Canvas('can','2d');
    c.clear();
    for(var i=0; i<rect.length; i+=1) {
    c.fillStyle = rect[i].color;
    c.fillRect(rect[i].x, rect[i].y, rect[i].size, rect[i].size);
    }
};

var can = {
    play: function (a, callback) {
        a= a||33;
        this.pause();
        this.playing = setInterval(function(){
            callback();
        },a);
    },
    pause: function () {
        clearInterval(this.playing);
    }
};
var can2 = {
    play: function (a, callback) {
        a= a||33;
        this.pause();
        this.playing = setInterval(function(){
            callback();
        },a);
    },
    pause: function () {
        clearInterval(this.playing);
    }
};

var c = new Canvas('can', '2d');
//var c2 = new Canvas('can2', '2d');


//can.play(33);