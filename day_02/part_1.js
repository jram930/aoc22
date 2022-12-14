const fs = require('fs');
const readline = require('readline');
  

const file = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    terminal: false
});
  
let sum = 0;
const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const WIN = 6;
const DRAW = 3;
const LOSE = 0;

file.on('line', (line) => {
    const tokens = line.split(' ');
    const opponent = tokens[0];
    const player = tokens[1];
    switch(player) {
      case 'X':
        sum += ROCK;
        switch(opponent) {
          case 'A':
            sum += DRAW;
            break;
          case 'B':
            sum += LOSE;
            break;
          case 'C':
            sum += WIN;
            break;
          default:
            console.error(`Opponent played ${opponent}`);
            break;
        }
        break;
      case 'Y':
        sum += PAPER;
        switch(opponent) {
          case 'A':
            sum += WIN;
            break;
          case 'B':
            sum += DRAW;
            break;
          case 'C':
            sum += LOSE;
            break;
          default:
            console.error(`Opponent played ${opponent}`);
            break;
        }
        break;
      case 'Z':
        sum += SCISSORS;
        switch(opponent) {
          case 'A':
            sum += LOSE;
            break;
          case 'B':
            sum += WIN;
            break;
          case 'C':
            sum += DRAW;
            break;
          default:
            console.error(`Opponent played ${opponent}`);
            break;
        }
        break;
      default:
        console.error(`Player played ${player}`);
        break;
    }
});

file.on('close', () => {
  console.log(sum);
});