const fs = require('fs');
const readline = require('readline');
  

const file = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    terminal: false
});
  
const priorities = ['@', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' , 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
  'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z'];

let sum = 0;

file.on('line', (line) => {
  const first = line.slice(0, line.length/2);
  const second = line.slice(line.length/2, line.length);
  for(let i=0; i<first.length; i++) {
    const firstChar = first[i];
    let found = false;
    for(let j=0; j<second.length; j++) {
      const secondChar = second[j];
      console.log(`${firstChar} ${secondChar}`);
      if(firstChar === secondChar) {
        sum += priorities.indexOf(firstChar);
        console.log(`${firstChar} ${secondChar} ${priorities.indexOf(firstChar)}`);
        found = true;
        break;
      }
    }
    if(found) {
      break;
    }
  }
});

file.on('close', () => {
  console.log(sum);
});