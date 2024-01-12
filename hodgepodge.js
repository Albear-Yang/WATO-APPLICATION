// create a canvas 500x500
// create a class aka an object to have neighbours and a function to calculate the next colour thingy
// draw the whole canvas
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
function setup(){
    frameRate(12);
    var hodge = createCanvas(Math.max(400, Math.min(windowWidth / 2, windowHeight / 2)), Math.max(400, Math.min(windowWidth / 2, windowHeight / 2)));
    hodge.parent('podge');
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

function draw(){
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
function mouseClicked() {
    let x = width;
    let y = height;
    for(let i = 0; i < y; i++){
        map[i] = [];
        for(let j = 0; j < x; j++){
            map[i][j] = new Dot(Math.random(),Math.random(), Math.random());
        }
    }
  }