const { sign } = require('crypto');
const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

let answer = 0;
let x = 1;
let cycle = 0;
const signals = [20, 60, 100, 140, 180, 220];

file.on('line', (line) => {
  if(line === 'noop') {
    cycle++;
    if(signals.indexOf(cycle) > -1) {
      answer += (x * cycle);
    }
  } else {
    const tokens = line.split(' ');
    const toAdd = +tokens[1];
    cycle += 1;
    if(signals.indexOf(cycle) > -1) {
      answer += (x * cycle);
    }
    cycle += 1;
    if(signals.indexOf(cycle) > -1) {
      answer += (x * cycle);
    }
    x += toAdd;
  }
});

file.on('close', () => {
  console.log(answer);
});