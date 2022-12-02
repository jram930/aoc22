const fs = require('fs');
const readline = require('readline');
  

const file = readline.createInterface({
    input: fs.createReadStream('1.txt'),
    output: process.stdout,
    terminal: false
});
  

let elf = 0;
let counter = 0;
let max = -1;
let sum = 0;

file.on('line', (line) => {
    if(line === '') {
      counter++;
      console.log(`Elf ${counter} has ${sum}`);
      if(sum > max) {
        elf = counter;
        max = sum;
        console.log(`New max of ${max}`);
      }
      sum = 0;
    } else {
      sum += +line;
    }
});

file.on('close', () => {
  console.log(max);
});