const fs = require('fs');
const readline = require('readline');
  

const file = readline.createInterface({
    input: fs.createReadStream('9.txt'),
    output: process.stdout,
    terminal: false
});

const crates = [
  ['L', 'C', 'G', 'M', 'Q'],
  ['G', 'H', 'F', 'T', 'C', 'L', 'D', 'R'],
  ['R', 'W', 'T', 'M', 'N', 'F', 'J', 'V'],
  ['P', 'Q', 'V', 'D', 'F', 'J'],
  ['T', 'B', 'L', 'S', 'M', 'F', 'N'],
  ['P', 'D', 'C', 'H', 'V', 'N', 'R'],
  ['T', 'C', 'H'],
  ['P', 'H', 'N', 'Z', 'V', 'J', 'S', 'G'],
  ['G', 'H', 'F', 'Z'],
];

file.on('line', (line) => {
  if(line.startsWith('move')) {
    const tokens = line.split(' ');
    const numToMove = +tokens[1];
    const moveFrom = +tokens[3];
    const moveTo = +tokens[5];
    const toMove = crates[moveFrom-1].slice(0, numToMove);
    crates[moveTo-1] = toMove.concat(crates[moveTo-1]);
    crates[moveFrom-1] = crates[moveFrom-1].slice(numToMove);
  }
});

file.on('close', () => {
  let answer = '';
  crates.forEach((stack) => {
    answer += stack[0];
  });
  console.log(answer);
});