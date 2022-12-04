const fs = require('fs');
const readline = require('readline');
  

const file = readline.createInterface({
    input: fs.createReadStream('7.txt'),
    output: process.stdout,
    terminal: false
});

let sum = 0;

file.on('line', (line) => {
  const tokens = line.split(',');
  const elf1 = tokens[0];
  const elf2 = tokens[1];
  const elf1min = +elf1.split('-')[0];
  const elf1max = +elf1.split('-')[1];
  const elf2min = +elf2.split('-')[0];
  const elf2max = +elf2.split('-')[1];

  if(elf1max >= elf2min && elf1max <= elf2max) {
    sum++;
  } else if(elf2max >= elf1min && elf2max <= elf1max) {
    sum++;
  }
});

file.on('close', () => {
  console.log(sum);
});