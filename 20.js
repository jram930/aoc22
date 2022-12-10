const { sign } = require('crypto');
const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
  input: fs.createReadStream('19.txt'),
  output: process.stdout,
  terminal: false
});


const screen = [];

for(let i=0; i<6; i++) {
  screen.push([]);
  for(let j=0; j<40; j++) {
    screen[i].push('$');
  }
}

let spriteMiddle = 1;
let cycle = 0;
let pixelToDraw = 0;
let row = 0;

file.on('line', (line) => {
  if(line === 'noop') {
    cycle++;
    if(pixelToDraw >= spriteMiddle -1 && pixelToDraw <= spriteMiddle + 1) {
      screen[row][pixelToDraw] = '#';
    } else {
      screen[row][pixelToDraw] = '.';
    }
    pixelToDraw++;
    if(pixelToDraw === 40) {
      pixelToDraw = 0;
      row++;
    }
  } else {
    const tokens = line.split(' ');
    const toAdd = +tokens[1];
    cycle += 1;
    if(pixelToDraw >= spriteMiddle -1 && pixelToDraw <= spriteMiddle + 1) {
      screen[row][pixelToDraw] = '#';
    } else {
      screen[row][pixelToDraw] = '.';
    }
    pixelToDraw++;
    if(pixelToDraw === 40) {
      pixelToDraw = 0;
      row++;
    }
    cycle += 1;
    if(pixelToDraw >= spriteMiddle -1 && pixelToDraw <= spriteMiddle + 1) {
      screen[row][pixelToDraw] = '#';
    } else {
      screen[row][pixelToDraw] = '.';
    }
    pixelToDraw++;
    if(pixelToDraw === 40) {
      pixelToDraw = 0;
      row++;
    }
    spriteMiddle += toAdd;
  }
});

file.on('close', () => {
  for(let i=0; i<6; i++) {
    console.log(`${screen[i]}`.replace(/,/g, ''));
  }
});