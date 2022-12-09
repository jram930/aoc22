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

  // Add the edges
  visibleCount += forest[0].length * 2;
  visibleCount += (forest.length - 2) * 2;
  // 392

  for(let row=1; row<forest.length-1; row++) {
    for(let col=1; col<forest[0].length-1; col++) {

      let visible = false;

      // Check left
      for(let i=0; i<=col; i++) {
        if(i===col) {
          visible = true;
        } else {
          if(forest[row][i] >= forest[row][col]) {
            break;
          }
        }
      }

      // Check right
      if(!visible) {
        for(let i=forest[0].length-1; i>=col; i--) {
          if(i===col) {
            visible = true;
          } else {
            if(forest[row][i] >= forest[row][col]) {
              break;
            }
          }
        }
      }

      // Check top
      if(!visible) {
        for(let i=0; i<=row; i++) {
          if(i===row) {
            visible = true;
          } else {
            if(forest[i][col] >= forest[row][col]) {
              break;
            }
          }
        }
      }

      // Check bottom
      if(!visible) {
        for(let i=forest.length-1; i>=row; i--) {
          if(i===row) {
            visible = true;
          } else {
            if(forest[i][col] >= forest[row][col]) {
              break;
            }
          }
        }
      }

      if(visible) {
        visibleCount++;
      }
    }
  }

  console.log(visibleCount);
});