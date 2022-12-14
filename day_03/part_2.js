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
let groupBags = [];

file.on('line', (line) => {
  if(groupBags.length < 3) {
    groupBags.push(line);
  }
  
  if(groupBags.length === 3) {
    console.log(groupBags[0]);
    for(let char1 of groupBags[0]) {
      let found = false;
      for(let char2 of groupBags[1]) {
        for(let char3 of groupBags[2]) {
          if(char1 == char2 && char2 === char3) {
            found = true;
            console.log(`${char1} ${char2} ${char3}`);
            sum += priorities.indexOf(char1);
            break;
          }
        }
        if(found) break;
      }
      if(found) break;
    }
    groupBags = [];
  }
});

file.on('close', () => {
  console.log(sum);
});