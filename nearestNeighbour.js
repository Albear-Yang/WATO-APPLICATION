// 1. find 
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class DrawPath{
    constructor(p){
        this.p = p;
    }
    closestPoint(c){
        //previous min
        let min = 100000;
        // closest points
        let cpoints = [];
        let pastPathTHIS = [];
        let pastPathOTHER = [];
        let travelledTHIS = [];
        let travelledOTHER = [];
        for(let i = 0; i < c.p.length; i++){
            //REMEMBER TO REVERSE IT LATER AND ALSO SWAP THE X, Y :|
            travelledTHIS = [];
            travelledOTHER.push(c.p[i]);
            for(let x = 0; x < this.p.length ; x++){
                let dist = distance(c.p[i].x, c.p[i].y ,this.p[x].x, this.p[x].y);
                travelledTHIS.push(this.p[x]);
                if(dist < min){
                    min = dist;
                    pastPathTHIS = [].concat(travelledTHIS);
                    pastPathOTHER = [].concat(travelledOTHER);
                    cpoints = [min, pastPathTHIS, this.p, pastPathOTHER];
                    //console.log(`${i} and min: ${min}`);
                }
            }
        }
        return cpoints;
    }
}

let a = new DrawPath([new Point (3, 4), new Point (3, 5), new Point (3, 6), new Point (3, 7)]);
let b = new DrawPath([new Point (4, 4),new  Point (4, 5), new Point (4, 6), new Point (4, 7)]);
let c = new DrawPath([new Point (5, 4),new  Point (5, 5), new Point (5, 6), new Point (5, 7)]);

let d = new DrawPath([new Point (6, 4),new  Point (6, 5), new Point (6, 6), new Point (6, 7)]);
let e = new DrawPath([new Point (7, 4),new  Point (7, 5), new Point (7, 6), new Point (7, 7)]);

let f = new DrawPath([new Point (8, 4),new  Point (8, 5), new Point (8, 6), new Point (8, 7)]);
let g = new DrawPath([new Point (9, 4),new  Point (9, 5), new Point (9, 6), new Point (9, 7)]);

let h = new DrawPath([new Point (10, 4),new  Point (10, 5), new Point (10, 6), new Point (10, 7)]);
let i = new DrawPath([new Point (11, 4),new  Point (11, 5), new Point (11, 6), new Point (11, 7)]);



let list = [a, e, f,b , g, h, i, c, d];

function test(butt){
    let y = [];
    for(let i = 0; i < butt.length; i++){
        y.push(`${butt[i].x} , ${butt[i].y}`);
    }
    return y;
}

function distance(x1, y1, x2, y2){
    return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
}
let WHAT;
allPaths = [];
function nn(pathlist, past){
    let newPast = past;
    if(pathlist.length === 1){
        let WHAT = givePath(past)[0];
        let length = givePath(past)[1];
        WHAT = WHAT.concat(pathlist[0].p)
        let arr = [WHAT, length];
        allPaths.push(arr);
    }
    else{
        let first = pathlist[0];
        pathlist.shift();
        let nextPath = nearest(first, pathlist)[0];
        let nextPathPos = nearest(first, pathlist)[1];
        newPast.push(nextPath);
        pathlist.unshift(pathlist[nextPathPos]);
        pathlist = remove(pathlist, nextPathPos + 1);
        nn(pathlist, newPast);
    }
}
function remove(list, elemPos){
    let output = [];
    for(let i = 0; i < list.length; i++){
        if(i != elemPos){
            output = output.concat(list[i]);
        }   
    }
    return output;

}

function nearest(drawpath, drawpathlist){
    var min = 80000;
    var kickout = 0;
    let solution = [2]; 
   // console.log(drawpath)
    for(let i = 0; i < drawpathlist.length; i++){
    //   console.log("hm")
   //     console.log(drawpathlist[i]);
 //       console.log(drawpath.closestPoint(drawpathlist[i]));
        if(drawpath.closestPoint(drawpathlist[i])[0] < min){
            min = drawpath.closestPoint(drawpathlist[i])[0];
            solution = drawpath.closestPoint(drawpathlist[i]);
            //cpoints = [min, pastPathTHIS, this.p, pastPathOTHER];
            kickout = i;
        }
    }
    return [solution, kickout];
}
nnpath = [];
function nearestNeighbour(barr){
    const len = barr.length + 0;
    barr.unshift(barr[1]);
    barr.unshift(barr[0]);
    allPaths = [];
    for(let i = 0; i < len ; i++){
        nn(barr, []);
        barr.push(barr[0]);
        barr.shift(barr[0]);

    }
    nn(barr, []);
    let min = 10000000;
    let mostEfficientPath =[];
    for(let i = 0; i < allPaths.length; i++){
        if(allPaths[i][1] < min){
            min = allPaths[i][1];
            mostEfficientPath = allPaths[i][0];
        }
    }
    console.log(mostEfficientPath);
    nnpath = mostEfficientPath;
    return mostEfficientPath;
}

console.log(nearestNeighbour(list, []));

function givePath(past){
    let total =[]
    let length = 0;
//    console.log(past.length);
    for(let x = 0; x < past.length; x++){
//        console.log(past[x]);
//        console.log("1");
        length += past[x][0]
        total = total.concat(past[x][2])
//        console.log(total);
//        console.log("2")
        total = total.concat(past[x][2].slice(past[x][1].length, past[x][2].length).reverse())
//        console.log(total);
//        console.log("3");
        total = total.concat(past[x][3].reverse());
//        console.log(total);
    }
    console.log("total");
    return [total, length];
}