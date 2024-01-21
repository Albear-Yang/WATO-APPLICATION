var drawmode = false;
function flip(){
    if(drawmode){
        drawmode = false;
    }
    else{
        drawmode = true;
    }
}
class Complex{
    constructor(a,b){
        this.re = a;
        this.im = b;
    }
    mult(c){
        const re = this.re * c.re - this.im * c.im;
        const im = this.re * c.im + this.im * c.re
        return new Complex(re, im)
    }
    add(c){
        this.re += c.re;
        this.im += c.im;
    }
}
let x = [];
let y = [];
let fourierX;
let time = 0;
let path = [];
const USER = 0;
const NORMAL = 1;

var user =  false;
let drawing = [];
let preset = [];
let speed = 60;

function dft(x){
    let X = [];
    const N = x.length
    for (let k = 0; k < N; k++){
        let sum = new Complex(0,0);
        for (let n = 0; n < N; n++) {
            const phi = (Math.PI* 2 * k * n) / N;
            const c = new Complex(Math.cos(phi), -Math.sin(phi));
            sum.add(x[n].mult(c));
          }
          sum.re = sum.re / N;
          sum.im = sum.im / N;
      
          let freq = k;
          let amp = Math.sqrt(sum.re * sum.re + sum.im * sum.im);
          let phase = Math.atan2(sum.im, sum.re);
          X[k] = { re: sum.re, im: sum.im, freq, amp, phase };
        }
        return X;
}
var r = ( q ) => {

    q.mousePressed = function(){
        if (drawmode){
            drawing = [];
            user = true;
            x = [];
            time = 0;
            path = [];
        }
    }
    function cpt(x, y){
        return new Complex(x, y);
    }
    q.mouseReleased = function(){
        if (drawmode){
            user = false;
            for (let i = 0; i < drawing.length; i++){
                x.push(new Complex(drawing[i].x, drawing[i].y));
            }
            fourierX = dft(x);  
        }
    }

    q.setup = function(){
        
        q.frameRate(60);
        
        q.createCanvas(Math.max(400, Math.min(q.windowWidth / 2, q.windowHeight / 2)), Math.max(400, Math.min(q.windowWidth / 2, q.windowHeight / 2)));
        q.background(0);

        fourierX = dft(x);
        console.log(nnpath);
        for (let i = 0; i < nnpath.length; i++){
            y.push(new Complex(nnpath[i].x - q.width/2, nnpath[i].y - q.height/2));
        }
        fourierY = dft(y);
    }
    function epicycles(x, y, rotation, fourier) {
        for (let i = 0; i < fourier.length; i++) {
        let prevx = x;
        let prevy = y;
        let freq = fourier[i].freq;
        let radius = fourier[i].amp;
        let phase = fourier[i].phase;
        x += radius * Math.cos(freq * time + phase + rotation);
        y += radius * Math.sin(freq * time + phase + rotation);
    
        q.stroke(255, 100);
        q.noFill();
        q.ellipse(prevx, prevy, radius * 2);
        q.stroke(255);
        q.line(prevx, prevy, x, y);
        }
        return q.createVector(x, y);
    }
    
    q.draw = function(){
        q.frameRate(speed);
        q.background(0);
        if (drawmode && user){
            q.background(0);
            let point = q.createVector(q.mouseX - q.width / 2, q.mouseY - q.height / 2)
            drawing.push(point);
            q.stroke(255, 255, 0);
            q.beginShape();
            q.noFill();
            for (let v of drawing) {
                q.vertex(v.x + q.width / 2, v.y + q.height / 2);
            }
            q.endShape();
        }
        else if(drawmode && !(user) ){
            let v = epicycles(q.width / 2, q.height / 2, 0, fourierX);
            path.unshift(v);
            q.stroke(255, 255, 0);
            q.beginShape();
            q.noFill();
            for (let i = 0; i < path.length; i++) {
                q.vertex(path[i].x, path[i].y);
            }
            q.endShape();
        
            const dt = (Math.PI* 2/ fourierX.length);
            time += dt;
        
            if (time > Math.PI* 2) {
                time = 0;
                drawing = [];
                path = [];
            }

        }
        else{
            let v = epicycles(q.width / 2, q.height / 2, 0, fourierY);
            path.unshift(v);
            q.stroke(255, 255, 0);
            q.beginShape();
            q.noFill();
            for (let i = 0; i < path.length; i++) {
                q.vertex(path[i].x, path[i].y);
            }
            q.endShape();
        
            const dt = (Math.PI* 2/ fourierY.length);
            time += dt;
        
            if (time > Math.PI* 2) {
                time = 0;
                path = [];
            }
        }
    }
}

//// HODGE PODGE !!!!!!!!!!!!!!!!!!!!
// create a canvas 500x500
// create a class aka an object to have neighbours and a function to calculate the next colour thingy
// draw the whole canvas
var s = ( p ) => {
let w = 2.5;
class Dot{
    constructor(red, blue, green){
        this.red = red;
        this.blue = blue;
        this.green = green;
    }
    calculateColour(){
        if(Math.max(this.red, this.blue, this.green) === this.red){
            return([255,99,71]);
        }
        else if(Math.max(this.red, this.blue, this.green) === this.blue){
            return([255,255,255]);
        }
        else if(Math.max(this.red, this.blue, this.green ) === this.green ){
            return([255,255,255]);
        }
        console.log(Math.max(this.red, this.blue, this.green ));
    }
}
function getAvg(a, b, c, d, e, f, g, h, i){
    let red = a.red + b.red + c.red + d.red + e.red + f.red + g.red + h.red + i.red;
    let blue = a.blue + b.blue + c.blue + d.blue + e.blue + f.blue + g.blue + h.blue + i.blue;
    let green = a.green + b.green + c.green + d.green + e.green + f.green + g.green + h.green + i.green;

    a = red / 9;
    b = blue / 9;
    c = green / 9;


    let newRed = a + a*(b - 0.8333333*c);
    let newBlue = b + b*(0.8333333*c - a);
    let newGreen = c + c*(0.8333333*a - 0.8333333*b);

    if(newRed > 1 || newBlue > 1  || newGreen > 1 ){
        newRed = newRed*0.9;
        newBlue = newBlue*0.9;
        newGreen = newGreen*0.9;
    }


    return new Dot(newRed, newBlue , newGreen );
}

let map = [];
p.setup = function(){
    p.frameRate(12);
    p.createCanvas(Math.floor(Math.max(300, Math.min(p.windowWidth / 2, p.windowHeight / 2))), Math.floor(Math.max(300, Math.min(p.windowWidth / 2, p.windowHeight / 2))));

    p.background(0);
    p.pixelDensity(1);
    p.noStroke();
    let x = p.width;
    let y = p.height;
    for(let i = 0; i < y; i++){
        map[i] = [];
        for(let j = 0; j < x; j++){
            map[i][j] = new Dot(Math.random(),Math.random(), Math.random());
        }
    }
}

p.draw= function(){
    p.loadPixels();
    let sqWidth = p.width;
    let sqHeight = p.height;

    for (let y = 0; y < p.height; y++){
        for(var x = 0; x < p.width ; x++){
            var index = (x + y*p.width)*4;
            p.pixels[index + 0] = map[y][x].calculateColour()[0]
            p.pixels[index + 1] = map[y][x].calculateColour()[1]
            p.pixels[index + 2] = map[y][x].calculateColour()[2]
            p.pixels[index + 3] = 255;
        }
    }
    let newMap = [];
    for(let z = 0; z < sqHeight; z++){
        newMap[z] = [];
        
        for(let x = 0; x < sqWidth; x++){
            //first row
            let a = map[(z - 1 + sqHeight) % sqHeight][(x - 1 + sqWidth) % sqWidth]
            let b = map[(z - 1 + sqHeight) % sqHeight][(x + sqWidth) % sqWidth]
            let c = map[(z - 1 + sqHeight) % sqHeight][(x + 1+ sqWidth) % sqWidth]
            //middle row
            let d = map[(z + sqHeight)%sqHeight][(x - 1 + sqWidth)%sqWidth]
            let e = map[(z + sqHeight)%sqHeight][(x + sqWidth)%sqWidth]
            let f = map[(z + sqHeight)%sqHeight][(x + 1+ sqWidth)%sqWidth]
            // last row
            let g = map[(z + 1 + sqHeight)%sqHeight][(x - 1 + sqWidth)%sqWidth]
            let h = map[(z + 1 + sqHeight)%sqHeight][(x + sqWidth)%sqWidth]
            let i = map[(z + 1 + sqHeight)%sqHeight][(x + 1+ sqWidth)%sqWidth]
            
            newMap[z][x] =  getAvg(a,b,c,d,e,f,g,h,i);
        }
    }
    map = newMap;
    p.updatePixels();
}
p.mouseClicked = function() {
    let x = p.width;
    let y = p.height;
    for(let i = 0; i < y; i++){
        map[i] = [];
        for(let j = 0; j < x; j++){
            map[i][j] = new Dot(Math.random(),Math.random(), Math.random());
        }
    }
  }
}


var myp5 = new p5(r, 'fourier');
var myp5 = new p5(s, 'podge');