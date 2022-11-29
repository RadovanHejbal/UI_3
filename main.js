// Inicializing first points
const inicializingRedPoints = [[-4500, -4400], [-4100, -3000], [-1800, -2400], [-2500, -3400], [-2000, -1400]];
const inicializingGreenPoints = [[4500, -4400], [4100, -3000], [1800, -2400], [2500, -3400], [2000, -1400]];
const inicializingBluePoints = [[-4500, 4400], [-4100, 3000], [-1800, 2400], [-2500, 3400], [-2000, 1400]];
const inicializingPurplePoints = [[4500, 4400], [4100, 3000], [1800, 2400], [2500, 3400], [2000, 1400]];

// Defining how many added points is gonna be in each color
const amountOfPointsEach = 10000;

function identifyPoints(helpArray, helpColor, nearestPoints, x, y) {
    for(let i = 0; i < helpArray.length; i++) {
        let distance = 0;
        distance += Math.abs(helpArray[i][0] - x);
        distance += Math.abs(helpArray[i][1] - y);
        for(let j = 0; j < nearestPoints.length; j++) {
            if(nearestPoints[j].distance >= distance) {
                nearestPoints.pop();
                nearestPoints.splice(j, 0, {
                    distance: distance,
                    color: helpColor
                })
                break;
            }
        }
    }
}

function classify(x, y, k) {
    var nearestPoints = [];

    for(let j = 0; j < k; j++) {
        nearestPoints.push({
            distance: 20000,
            color: null
        });
    }

    identifyPoints(inicializingRedPoints, "red", nearestPoints, x, y);
    identifyPoints(inicializingGreenPoints, "green", nearestPoints, x, y);
    identifyPoints(inicializingBluePoints, "blue", nearestPoints, x, y);
    identifyPoints(inicializingPurplePoints, "purple", nearestPoints, x, y);

    let red = 0;
    let green = 0;
    let blue = 0;
    let purple = 0;

    nearestPoints.forEach(point => {
        if(point.color === "red") red++;
        else if(point.color === "green") green++;
        else if(point.color === "blue") blue++;
        else if(point.color === "purple") purple++;
    });

    let classification = "red";

    if(green > red) {
        classification = "green";
        if (blue > green) {
            classification = "blue"
            if(purple > blue) classification = "purple";
        }else if(purple > green) classification = "purple";
    } 
    else if (blue > red){
        classification = "blue";
        if(purple > blue) classification = "purple";
    } else if (purple > red) classification = "purple";

    return classification;
}

function mainHelper(x, y, color, k) {

    const classification = classify(x, y, k);
    
    if(classification === "red") inicializingRedPoints.push([x, y]);
    else if(classification === "green") inicializingGreenPoints.push([x,y]);
    else if(classification === "blue") inicializingBluePoints.push([x,y]);
    else if(classification === "purple") inicializingPurplePoints.push([x,y]);

    if(classification === color) return true;
    return false;
}



// GENERATING POINTS THAT ARE GOING TO BE ADDED
const newPoints = [];

for(let i = 0; i < amountOfPointsEach; i++) {
    let xRed = Math.random() * (-5000 - 500) + 500;
    let yRed = Math.random() * (-5000 - 500) + 500;
    let freePosition = true;
    let isRandom = false;

    // 1 % chance of generating point from whole array
    if(Math.floor(Math.random() * 100) == 50) {
        isRandom = true;
        xRed = Math.random() * (10000) - 5000;
        yRed = Math.random() * (10000) - 5000;
    }

    do {
        freePosition = true;
        newPoints.forEach(point => {
            if (point[0] == xRed && point[1] == yRed) {
                freePosition = false;
            }
        })
        if(!freePosition) {
            if(isRandom) {
                xRed = Math.random() * (10000) - 5000;
                yRed = Math.random() * (10000) - 5000;
            }else {
                xRed = Math.random() * (-5000 - 500) + 500;
                yRed = Math.random() * (-5000 - 500) + 500;
            }
        }
    } while(!freePosition);

    newPoints.push([xRed, yRed])

    let xBlue = Math.random() * (-5000 - 500) + 500;
    let yBlue = Math.random() * (5000 + 500) - 500;
    isRandom = false;

    if(Math.floor(Math.random() * 100) == 50) {
        isRandom = true;
        xBlue = Math.random() * (10000) - 5000;
        yBlue = Math.random() * (10000) - 5000;
    }

    do {
        freePosition = true;
        newPoints.forEach(point => {
            if (point[0] == xBlue && point[1] == yBlue) {
                freePosition = false;
            }
        })
        if(!freePosition) {
            if(isRandom) {
                xBlue = Math.random() * (10000) - 5000;
                yBlue = Math.random() * (10000) - 5000;
            }else {
                xBlue = Math.random() * (-5000 - 500) + 500;
                yBlue = Math.random() * (-5000 - 500) + 500;
            }
        }
    } while(!freePosition);

    newPoints.push([xBlue, yBlue]);

    let xPurple = Math.random() * (5000 + 500) - 500;
    let yPurple = Math.random() * (5000 + 500) - 500;
    isRandom = false;

    if(Math.floor(Math.random() * 100) == 50) {
        isRandom = true;
        xPurple = Math.random() * (10000) - 5000;
        yPurple = Math.random() * (10000) - 5000;
    }

    do {
        freePosition = true;
        newPoints.forEach(point => {
            if (point[0] == xPurple && point[1] == yPurple) {
                freePosition = false;
            }
        })
        if(!freePosition) {
            if(isRandom) {
                xPurple = Math.random() * (10000) - 5000;
                yPurple = Math.random() * (10000) - 5000;
            }else {
                xPurple = Math.random() * (-5000 - 500) + 500;
                yPurple = Math.random() * (-5000 - 500) + 500;
            }
        }
    } while(!freePosition);

    newPoints.push([xPurple, yPurple]);

    let xGreen = Math.random() * (5000 + 500) - 500;
    let yGreen = Math.random() * (-5000 - 500) + 500;
    isRandom = false;

    if(Math.floor(Math.random() * 100) == 50) {
        isRandom = true;
        xGreen = Math.random() * (10000) - 5000;
        yGreen = Math.random() * (10000) - 5000;
    }

    do {
        freePosition = true;
        newPoints.forEach(point => {
            if (point[0] == xGreen && point[1] == yGreen) {
                freePosition = false;
            }
        })
        if(!freePosition) {
            if(isRandom) {
                xGreen = Math.random() * (10000) - 5000;
                yGreen = Math.random() * (10000) - 5000;
            }else {
                xGreen = Math.random() * (-5000 - 500) + 500;
                yGreen = Math.random() * (-5000 - 500) + 500;
            }
        }
    } while(!freePosition);

    newPoints.push([xGreen, yGreen]);

}

// Main Function
function gameOn(k) {
    for(let i = 0; i < amountOfPointsEach; i++) {
        const success1 = mainHelper(newPoints[i * 4][0], newPoints[i * 4][1], "red", k);
        const success2 = mainHelper(newPoints[i * 4 + 1][0], newPoints[i * 4 + 1][1], "blue", k);
        const success3 = mainHelper(newPoints[i * 4 + 2][0], newPoints[i * 4 + 2][1], "purple", k);
        const success4 = mainHelper(newPoints[i * 4 + 3][0], newPoints[i * 4 + 3][1], "green", k);
    
        if(!success1) success--;
        if(!success2) success--;
        if(!success3) success--;
        if(!success4) success--;
    }
}

let input = "q";
let success = amountOfPointsEach * 4;

const prompt = require("prompt-sync")();

do {
    success = amountOfPointsEach * 4;
    input = prompt("enter a number: ");
    inicializingRedPoints.length = 5;
    inicializingBluePoints.length = 5;
    inicializingGreenPoints.length = 5;
    inicializingPurplePoints.length = 5;

    if(input !== "q") {
        gameOn(parseInt(input));

        console.log(`${success / (amountOfPointsEach * 4) * 100}% Success!`);

        console.log(inicializingRedPoints.length);
        console.log(inicializingGreenPoints.length);
        console.log(inicializingBluePoints.length);
        console.log(inicializingPurplePoints.length);
    }
} while(input !== "q");