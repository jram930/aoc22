const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
  input: fs.createReadStream('15.txt'),
  output: process.stdout,
  terminal: false
});

let visibleCount = 0;
const forest = [];
let rowCounter = 0;

file.on('line', (line) => {
  forest.push([]);
  for(let char of line) {
    forest[rowCounter].push(+char);
  }
  rowCounter++;
});

file.on('close', () => {

  let max = 0;

  for(let row=1; row<forest.length-1; row++) {
    for(let col=1; col<forest[0].length-1; col++) {

      // Check left
      let leftCount = 0;
      for(let i=col-1; i>=0; i--) {
        if(forest[row][i] < forest[row][col]) {
          leftCount++;
        } else {
          leftCount++;
          break;
        }
      }

      // Check right
      let rightCount = 0;
      for(let i=col+1; i<=forest[0].length-1; i++) {
        if(forest[row][i] < forest[row][col]) {
          rightCount++;
        } else {
          rightCount++;
          break;
        }
      }

      // Check top
      let topCount = 0;
      for(let i=row-1; i>=0; i--) {
        if(forest[i][col] < forest[row][col]) {
          topCount++;
        } else {
          topCount++;
          break;
        }
      }

      // Check bottom
      let bottomCount = 0;
      for(let i=row+1; i<=forest.length-1; i++) {
        if(forest[i][col] < forest[row][col]) {
          bottomCount++;
        } else {
          bottomCount++;
          break;
        }
      }
      const score = leftCount * rightCount * topCount * bottomCount;
      if(score > max) {
        max = score;
      }
    }
  }

  console.log(max);
});