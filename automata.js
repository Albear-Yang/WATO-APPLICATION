
let cells = [];
let oldRow = [];
let currRow = [];
let newRow = [];
let shape = [];
let possibleSets = [1,3,5,7,9,11,13,15,17,18,19,21,22,23,22,18,23,25,26,27,28,29,30,31,33,35,37,39,41,43,45,47,49,50,51,53,54,55,57,58,59,60, 61, 62, 63, 65,66,67,69,70,71,73,75,77,78,79,81,82, 82, 83, 85, 86, 87, 89, 90, 91, 92, 93, 94,95,97,99,101,101,102,103,105,107,109,110,111,113,114,115,117,118,119,121,122,123,124,125, 126, 127, 129, 131, 133, 135, 137, 139, 141,143,145,147,149,150, 151, 153, 154, 155, 156, 157, 158, 159, 161, 163, 165, 167, 169, 171, 173, 175, 177, 178, 179, 181, 182, 183, 185, 186, 187, 188, 189, 190, 191, 193, 195, 197, 198, 199, 201, 203, 205, 206, 207, 209, 210, 211, 213, 214, 215, 217, 218, 219, 220, 221, 222, 223, 225, 227, 229, 230, 231, 233, 235, 237, 238, 239, 241, 242, 243,245,246,247,249,250, 251, 252, 253, 254, 255]; 
let ruleSet;
let w = 7;
let palette = [];
let y = 0;
let x = Math.floor(Math.random() * possibleSets.length);
let startRule = possibleSets[x];

function setRules(ruleValue) {
    startRule =  possibleSets[floor(random(possibleSets.length))];
    ruleSet = ruleValue.toString(2);
    while (ruleSet.length < 8) {
        ruleSet = "0" + ruleSet;
  }
}
let sketch = function(p) {
    p.setup = function(){
    
    var canvas = createCanvas(Math.max(400, Math.min(windowWidth / 2, windowHeight / 2)), Math.max(400, Math.min(windowWidth / 2, windowHeight / 2)));
    canvas.parent('automata');
    setRules(startRule);
    palette = [
    color(11, 106, 136),
    color(25, 297, 244),
    color(112, 50, 126),
    color(146, 83, 161),
    color(164, 41, 99),
    color(236, 1, 90),
    color(240, 99, 164),
    color(241, 97, 100),
    color(248, 158, 79),
  ];
//total number of squares per thingy
  let total = width / w;
  for (let i = 0; i < total; i++) {
    cells[i] = random(palette);
  }
  background(255);
}
}

function draw() {
    // puts out old row
    oldRow = [].concat(currRow);

    for (let i = 0; i < cells.length; i++) {
        let x = i * w;
        noStroke();
        fill(cells[i]);
        square(x, y, w);
    }
    for (let i = 0; i < shape.length; i++){
        let x = i * w;
        if(shape[i] === "br"){
            noStroke();
            fill(255);
            triangle(x, y + w, x + w, y , x + w, y + w);
        }
        else if(shape[i] === "tr"){
            noStroke();
            fill(255);
            triangle(x, y, x + w, y, x + w, y + w);
        }
        else if(shape[i] === "tl"){
            noStroke();
            fill(255);
            triangle(x, y, x, y + w, x + w, y);
        }
        else if(shape[i] === "bl"){
            noStroke();
            fill(255);
            triangle(x, y, x, y + w, x + w, y + w);
        }
    }

    y += w;
    // this just resets it
    if (y > height) {
        background(255);
        y = 0;
        setRules(possibleSets[floor(random(possibleSets.length))]);
    }
    // sets up nextcell
    let nextRow = [];
    
    let len = cells.length;
    for (let i = 0; i < cells.length; i++) {
        let leftColor = cells[(i - 1 + len) % len];
        let rightColor = cells[(i + 1 + len) % len];
        let stateColor = cells[i];
        let left = brightness(leftColor) < 100 ? 1 : 0;
        let right = brightness(rightColor) < 100 ? 1 : 0;
        let state = brightness(stateColor) < 100 ? 1 : 0;
        let newState = calculateState(left, state, right);
        if (newState == 0) {
            nextRow[i] = color(255);
            currRow[i] = 0;
        } 
        else {
            let options = [];
            if (left == 1) options.push(leftColor);
            if (right == 1) options.push(rightColor);
            if (state == 1) options.push(stateColor);
            if (options.length < 1) nextRow[i] = random(palette);
            else nextRow[i] = random(options);
            currRow[i] = 1;
        }
    }
    cells = nextRow;
    // current row (that will be outputted next round :/)

    // calculates a new row using this
    for (let i = 0; i < cells.length; i++) {
        let leftColor = cells[(i - 1 + len) % len];
        let rightColor = cells[(i + 1 + len) % len];
        let stateColor = cells[i];
        let left = brightness(leftColor) < 100 ? 1 : 0;
        let right = brightness(rightColor) < 100 ? 1 : 0;
        let state = brightness(stateColor) < 100 ? 1 : 0;
        let newState = calculateState(left, state, right);
        if (newState == 0) {
            newRow[i] = 0;
        } 
        else {
            newRow[i] = 1;
        }
    }
    // smooth it out a little bit :)
    for (let i = 0; i < cells.length; i++){
        calcShape(i);
    }

}

function calculateState(a, b, c) {
  let neighborhood = "" + a + b + c;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleSet[value]);
}

function calcShape(i){
    let len = oldRow.length;
    let neighborhoods = "" + oldRow[(i - 1 + len) % len] + oldRow[i] + oldRow[(i + 1 + len)% len] + currRow[(i - 1 + len) % len] + currRow[i] + currRow[(i + 1 + len)% len] + newRow[(i - 1 + len) % len] + newRow[i] + newRow[(i + 1 + len)% len];
    let value = parseInt( neighborhoods.split('').join(''), 2 );

    if (value === 500 || value === 176){
        shape[i] = "br"
    }
    else if (value === 311 || value ===50){
        shape[i] = "tr"
    }
    else if (value === 95 || value ===26){
        shape[i] = "tl"
    }
    else if (value === 473|| value === 152){
        shape[i] = "bl"
    }
    else{
        shape[i] = "none";
    }
}

new p5(sketch, window.document.getElementById('container'));