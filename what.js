function calcShape(i, oldR, currR, newR){
    let neighborhoods = "" + oldR[i - 1] + oldR[i] + oldR[i + 1] + currR[i - 1] + currR[i] + currR[i + 1] + newR[i - 1] + newR[i] + newR[i + 1];
    let value = parseInt( neighborhoods.split('').join(''), 2 );
    console.log(value);   
}

calcShape(1, 
            [1,1,1], 
            [1,1,0], 
            [1,0,0]); // 500
calcShape(1, 
            [1,0,0], 
            [1,1,0], 
            [1,1,1]); // 311
calcShape(1, 
        [0,0,1], 
        [0,1,1], 
        [1,1,1]); // 95
calcShape(1, 
        [1,1,1], 
        [0,1,1], 
        [0,0,1]); // 473
calcShape(1, 
    [0,1,0], 
    [1,1,0], 
    [0,0,0]); 
calcShape(1, 
    [0,1,0], 
    [0,1,1], 
    [0,0,0]); 
calcShape(1, 
    [0,0,0], 
    [1,1,0], 
    [0,1,0]); 
calcShape(1, 
        [0,0,0], 
        [0,1,1], 
        [0,1,0]); 

