const r = ( q ) => {
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

    q.setup = function(){
        
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
    
    q.draw = function(){
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
}

//// HODGE PODGE !!!!!!!!!!!!!!!!!!!!
// create a canvas 500x500
// create a class aka an object to have neighbours and a function to calculate the next colour thingy
// draw the whole canvas
const s = ( p ) => {
let w = 2.5;
class Dot{
    constructor(red, blue, green){
        this.red = red;
        this.blue = blue;
        this.green = green;
    }
    calculateColour(){
        if(Math.max(this.red, this.blue, this.green) === this.red){
            return([0,100,0]);
        }
        else if(Math.max(this.red, this.blue, this.green) === this.blue){
            return([255,255,255]);
        }
        else if(Math.max(this.red, this.blue, this.green ) === this.green ){
            return([255,255,255]);
        }
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
    frameRate(12);
    createCanvas(Math.max(400, Math.min(windowWidth / 2, windowHeight / 2)), Math.max(400, Math.min(windowWidth / 2, windowHeight / 2)));

    background(0);
    pixelDensity(1);
    noStroke();
    let x = width;
    let y = height;
    for(let i = 0; i < y; i++){
        map[i] = [];
        for(let j = 0; j < x; j++){
            map[i][j] = new Dot(Math.random(),Math.random(), Math.random());
        }
    }
}

p.draw= function(){
    loadPixels();
    let sqWidth = width;
    let sqHeight = height;

    for (let y = 0; y < height; y++){
        for(var x = 0; x < width ; x++){
            var index = (x + y*width)*4;
            pixels[index + 0] = map[y][x].calculateColour()[0]
            pixels[index + 1] = map[y][x].calculateColour()[1]
            pixels[index + 2] = map[y][x].calculateColour()[2]
            pixels[index + 3] = 255;
        }
    }
    let newMap = [];
    for(let z = 0; z < sqHeight; z++){
        newMap[z] = [];
        for(let x = 0; x < sqWidth; x++){
            //first row
            let a = map[(z - 1 + sqHeight)%sqHeight][(x - 1 + sqWidth)%sqWidth]
            let b = map[(z - 1 + sqHeight)%sqHeight][(x + sqWidth)%sqWidth]
            let c = map[(z - 1 + sqHeight)%sqHeight][(x + 1+ sqWidth)%sqWidth]
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
    updatePixels();
}
p.mouseClicked = function() {
    let x = width;
    let y = height;
    for(let i = 0; i < y; i++){
        map[i] = [];
        for(let j = 0; j < x; j++){
            map[i][j] = new Dot(Math.random(),Math.random(), Math.random());
        }
    }
  }
}
new p5(r, 'fourier');
new p5(s, 'podge');