
let x = [];
let y = [];
let fourierX;
let time = 0;
let path = [];
const USER = 0;
const NORMAL = 1;
var drawmode = false;
var user =  false;
let drawing = [];
let preset = [];
let speed = 60;

function flip(){
    if(drawmode){
        drawmode = false;
    }
    else{
        drawmode = true;
    }
}

function mousePressed(){
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
function mouseReleased(){
    if (drawmode){
        user = false;
        for (let i = 0; i < drawing.length; i++){
            x.push(new Complex(drawing[i].x, drawing[i].y));
        }
        fourierX = dft(x);  
    }
}

function setup(){
    
    frameRate(60);
    
    var canvas = createCanvas(Math.max(400, Math.min(windowWidth / 2, windowHeight / 2)), Math.max(400, Math.min(windowWidth / 2, windowHeight / 2)));
    canvas.parent('fourier');
    background(0);
    textAlign(CENTER);
    textSize(64);
    fourierX = dft(x);
    console.log(nnpath);
    for (let i = 0; i < nnpath.length; i++){
        y.push(new Complex(nnpath[i].x - width/2, nnpath[i].y - height/2));
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
      x += radius * cos(freq * time + phase + rotation);
      y += radius * sin(freq * time + phase + rotation);
  
      stroke(255, 100);
      noFill();
      ellipse(prevx, prevy, radius * 2);
      stroke(255);
      line(prevx, prevy, x, y);
    }
    return createVector(x, y);
  }
  
function draw(){
    frameRate(speed);
    background(0);
    if (drawmode && user){
        background(0);
        let point = createVector(mouseX - width / 2, mouseY - height / 2)
        drawing.push(point);
        stroke(220);
        noFill();
        beginShape();
        for (let v of drawing) {
            vertex(v.x + width / 2, v.y + height / 2);
        }
        endShape();
    }
    else if(drawmode && !(user) ){
        let v = epicycles(width / 2, height / 2, 0, fourierX);
        path.unshift(v);
        stroke(255, 255, 0);
        beginShape();
        noFill();
        for (let i = 0; i < path.length; i++) {
            vertex(path[i].x, path[i].y);
        }
        endShape();
    
        const dt = (TWO_PI/ fourierX.length);
        time += dt;
    
        if (time > TWO_PI) {
            time = 0;
            drawing = [];
            path = [];
        }

    }
    else{
        let v = epicycles(width / 2, height / 2, 0, fourierY);
        path.unshift(v);
        stroke(255, 255, 0);
        beginShape();
        noFill();
        for (let i = 0; i < path.length; i++) {
            vertex(path[i].x, path[i].y);
        }
        endShape();
    
        const dt = (TWO_PI/ fourierY.length);
        time += dt;
    
        if (time > TWO_PI) {
            time = 0;
            path = [];
        }
    }
}
