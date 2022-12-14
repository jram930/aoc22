const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

let headPosition = [0, 0];
let tailPosition = [0, 0];
const tailVisitedPositions = {'0_0': true};

const moveTail = () => {
  let xDiff = headPosition[0] - tailPosition[0];
  let yDiff = headPosition[1] - tailPosition[1];
  if((xDiff <= 1 && xDiff >= -1) && (yDiff <= 1 && yDiff >= -1)) {
    // do nothing
  } else if(yDiff == 0 && xDiff <= -2) {
    // same row, moved 2 left
    tailPosition[0] -= 1;
  } else if(yDiff === 0 && xDiff >= 2) {
    // same row, moved 2 right
    tailPosition[0] += 1;
  } else if(xDiff === 0 && yDiff >= 2) {
    // same col, moved 2 up
    tailPosition[1] += 1;
  } else if(xDiff === 0 && yDiff <= -2) {
    // same col, moved 2 down
    tailPosition[1] -= 1;
  } else if(Math.abs(xDiff) > Math.abs(yDiff) ) {
    // make tail move to be in same Y
    tailPosition[1] = headPosition[1];
    if(xDiff <= -1) {
      // same row, moved 2 left
      tailPosition[0] -= 1;
    } else if(xDiff >= 1) {
      // same row, moved 2 right
      tailPosition[0] += 1;
    }
  } else if(Math.abs(yDiff) > Math.abs(xDiff)) {
    // make tail move to be in same X
    tailPosition[0] = headPosition[0];
    if(yDiff >= 1) {
      // same col, moved 2 up
      tailPosition[1] += 1;
    } else if(yDiff <= -1) {
      // same col, moved 2 down
      tailPosition[1] -= 1;
    }
  } else {
    throw 'didnt handle that one!';
  }

  tailVisitedPositions[`${tailPosition[0]}_${tailPosition[1]}`] = true;
}

file.on('line', (line) => {
  const tokens = line.split(' ');
  const headDirection = tokens[0];
  const headNumSpaces = +tokens[1];
  switch(headDirection) {
    case 'L':
      for(let i=0; i<headNumSpaces; i++) {
        headPosition[0] -= 1;
        moveTail();
      }
      break;
    case 'R':
      for(let i=0; i<headNumSpaces; i++) {
        headPosition[0] += 1;
        moveTail();
      }
      break;
    case 'U':
      for(let i=0; i<headNumSpaces; i++) {
        headPosition[1] += 1;
        moveTail();
      }
      break;
    case 'D':
      for(let i=0; i<headNumSpaces; i++) {
        headPosition[1] -= 1;
        moveTail();
      }
      break;
  }
});

file.on('close', () => {
  console.log(headPosition);
  console.log(tailPosition);
  console.log(Object.keys(tailVisitedPositions).length);
});