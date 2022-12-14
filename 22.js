const { sign } = require('crypto');
const fs = require('fs');
const readline = require('readline');
const { start } = require('repl');

// 14399040007 is wrong

const file = readline.createInterface({
  input: fs.createReadStream('21.txt'),
  output: process.stdout,
  terminal: false
});

const savedInput = [];

file.on('line', (line) => {
  savedInput.push(line);
});

file.on('close', () => {
  let answer = 0;
  const monkeys = {};
  let currentMonkey = -1;

  savedInput.forEach((line) => {
    const trimmed = line.trim();
      const tokens = trimmed.split(' ');
    if(tokens[0] === 'Monkey') {
      currentMonkey = +tokens[1].replace(/:/, '');
    } else if(tokens[0] === 'Starting') {
      const items = tokens.slice(2).map((item) => +item.replace(',', ''));
      monkeys[currentMonkey] = {items};
      monkeys[currentMonkey].inspectCount = 0;
    } else if(tokens[0] === 'Operation:') {
      monkeys[currentMonkey].operationTokens = tokens.slice(4);
    } else if(tokens[0] === 'Test:') {
      monkeys[currentMonkey].test = +tokens[3];
    } else if(tokens[1] === 'true:') {
      monkeys[currentMonkey].ifTrue = +tokens[5];
    } else if(tokens[1] === 'false:') {
      monkeys[currentMonkey].ifFalse = +tokens[5];
    } else if (trimmed === ''){
      currentMonkey = -1;
    }
  });

  let divProduct = 1;
  for(let i in monkeys) {
    divProduct *= monkeys[i].test;
  }
  console.log(`Product is ${divProduct}`);

  for(let round=0; round<10000; round++) {
    // console.log(`Round ${round}`);
    for(let currentMonkey=0; currentMonkey < 8; currentMonkey++) {
      // Do the stuff
      const monkey = monkeys[currentMonkey];
      while(monkey.items.length > 0) {
        let item = monkey.items.shift();
        if(item !== undefined && item !== null) {
          // console.log(item);
          monkey.inspectCount = monkey.inspectCount + 1;
          if(monkey.operationTokens[0] === '*') {
            if(monkey.operationTokens[1] === 'old') {
              item = item * item;
            } else {
              item = item * (+monkey.operationTokens[1]);
            }
          } else {
            // Add it
            item = item + (+monkey.operationTokens[1]);
          }
          // item = Math.floor(item / 3);
          const testCheck = item % monkey.test === 0;
          if(testCheck) {
            monkeys[monkey.ifTrue].items.push(item % divProduct);
          } else {
            monkeys[monkey.ifFalse].items.push(item % divProduct);
          }
        }
      }
    }
  }

  // Calculate answer
  let max1 = -1;
  let max2 = -2;
  for (let monkey in monkeys) {
    if(monkeys[monkey].inspectCount > max1) {
      max2 = max1;
      max1 = monkeys[monkey].inspectCount;
    } else if(monkeys[monkey].inspectCount > max2) {
      max2 = monkeys[monkey].inspectCount;
    }
  }
  answer = max1 * max2;
  console.log(answer);
});