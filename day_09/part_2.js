const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
  input: fs.createReadStream('17.txt'),
  output: process.stdout,
  terminal: false
});

let headPosition = [0, 0];
let tail1Position = [0, 0];
let tail2Position = [0, 0];
let tail3Position = [0, 0];
let tail4Position = [0, 0];
let tail5Position = [0, 0];
let tail6Position = [0, 0];
let tail7Position = [0, 0];
let tail8Position = [0, 0];
let tail9Position = [0, 0];
const tail9VisitedPositions = {'0_0': true};

const moveTail = (headPosition, tailPosition) => {
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
  } else if(Math.abs(xDiff) === Math.abs(yDiff)) {
    if(xDiff < 0) {
      tailPosition[0] = headPosition[0] + 1;
    } else if(xDiff > 0) {
      tailPosition[0] = headPosition[0] - 1;
    }

    if(yDiff < 0) {
      tailPosition[1] = headPosition[1] + 1;
    } else if(yDiff > 0) {
      tailPosition[1] = headPosition[1] - 1;
    }
  } else {
    throw 'didnt handle that one!';
  }
  return tailPosition;

  // tail9VisitedPositions[`${tailPosition[0]}_${tailPosition[1]}`] = true;
}

file.on('line', (line) => {
  const tokens = line.split(' ');
  const headDirection = tokens[0];
  const headNumSpaces = +tokens[1];
  switch(headDirection) {
    case 'L':
      for(let i=0; i<headNumSpaces; i++) {
        headPosition[0] -= 1;
        tail1Position = moveTail(headPosition, tail1Position);
        tail2Position = moveTail(tail1Position, tail2Position);
        tail3Position = moveTail(tail2Position, tail3Position);
        tail4Position = moveTail(tail3Position, tail4Position);
        tail5Position = moveTail(tail4Position, tail5Position);
        tail6Position = moveTail(tail5Position, tail6Position);
        tail7Position = moveTail(tail6Position, tail7Position);
        tail8Position = moveTail(tail7Position, tail8Position);
        tail9Position = moveTail(tail8Position, tail9Position);
        tail9VisitedPositions[`${tail9Position[0]}_${tail9Position[1]}`] = true;
      }
      break;
    case 'R':
      for(let i=0; i<headNumSpaces; i++) {
        headPosition[0] += 1;
        tail1Position = moveTail(headPosition, tail1Position);
        tail2Position = moveTail(tail1Position, tail2Position);
        tail3Position = moveTail(tail2Position, tail3Position);
        tail4Position = moveTail(tail3Position, tail4Position);
        tail5Position = moveTail(tail4Position, tail5Position);
        tail6Position = moveTail(tail5Position, tail6Position);
        tail7Position = moveTail(tail6Position, tail7Position);
        tail8Position = moveTail(tail7Position, tail8Position);
        tail9Position = moveTail(tail8Position, tail9Position);
        tail9VisitedPositions[`${tail9Position[0]}_${tail9Position[1]}`] = true;
      }
      break;
    case 'U':
      for(let i=0; i<headNumSpaces; i++) {
        headPosition[1] += 1;
        tail1Position = moveTail(headPosition, tail1Position);
        tail2Position = moveTail(tail1Position, tail2Position);
        tail3Position = moveTail(tail2Position, tail3Position);
        tail4Position = moveTail(tail3Position, tail4Position);
        tail5Position = moveTail(tail4Position, tail5Position);
        tail6Position = moveTail(tail5Position, tail6Position);
        tail7Position = moveTail(tail6Position, tail7Position);
        tail8Position = moveTail(tail7Position, tail8Position);
        tail9Position = moveTail(tail8Position, tail9Position);
        tail9VisitedPositions[`${tail9Position[0]}_${tail9Position[1]}`] = true;
      }
      break;
    case 'D':
      for(let i=0; i<headNumSpaces; i++) {
        headPosition[1] -= 1;
        tail1Position = moveTail(headPosition, tail1Position);
        tail2Position = moveTail(tail1Position, tail2Position);
        tail3Position = moveTail(tail2Position, tail3Position);
        tail4Position = moveTail(tail3Position, tail4Position);
        tail5Position = moveTail(tail4Position, tail5Position);
        tail6Position = moveTail(tail5Position, tail6Position);
        tail7Position = moveTail(tail6Position, tail7Position);
        tail8Position = moveTail(tail7Position, tail8Position);
        tail9Position = moveTail(tail8Position, tail9Position);
        tail9VisitedPositions[`${tail9Position[0]}_${tail9Position[1]}`] = true;
      }
      break;
  }
});

file.on('close', () => {
  console.log(headPosition);
  console.log(tail9Position);
  console.log(Object.keys(tail9VisitedPositions).length);
});