const fs = require('fs');
const readline = require('readline');
  

const file = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    terminal: false
});
  

let counter = 0;
let max = 0;
let sum = 0;
let second = 0;
let third = 0;

file.on('line', (line) => {
    if(line === '') {
      counter++;
      console.log(`Elf ${counter} has ${sum}`);
      if(sum > max) {
        third = second;
        second = max;
        max = sum;
      } else if (sum > second) {
        third = second;
        second = sum;
      } else if(sum > third) {
        third = sum;
      }
      sum = 0;
    } else {
      sum += +line;
    }
});

file.on('close', () => {
  console.log(max + second + third);
});