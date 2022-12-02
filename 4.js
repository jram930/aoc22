const fs = require('fs');
const readline = require('readline');
  

const file = readline.createInterface({
    input: fs.createReadStream('3.txt'),
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
    const outcome = tokens[1];
    switch(outcome) {
      case 'X':
        sum += LOSE;
        switch(opponent) {
          case 'A':
            sum += SCISSORS;
            break;
          case 'B':
            sum += ROCK;
            break;
          case 'C':
            sum += PAPER;
            break;
          default:
            console.error(`Opponent played ${opponent}`);
            break;
        }
        break;
      case 'Y':
        sum += DRAW;
        switch(opponent) {
          case 'A':
            sum += ROCK;
            break;
          case 'B':
            sum += PAPER;
            break;
          case 'C':
            sum += SCISSORS;
            break;
          default:
            console.error(`Opponent played ${opponent}`);
            break;
        }
        break;
      case 'Z':
        sum += WIN;
        switch(opponent) {
          case 'A':
            sum += PAPER;
            break;
          case 'B':
            sum += SCISSORS;
            break;
          case 'C':
            sum += ROCK;
            break;
          default:
            console.error(`Opponent played ${opponent}`);
            break;
        }
        break;
      default:
        console.error(`Player played ${outcome}`);
        break;
    }
});

file.on('close', () => {
  console.log(sum);
});