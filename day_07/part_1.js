const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

const stack = [];
let sum = 0;

file.on('line', (line) => {
  if(line === '$ cd ..') {
    const dir = stack.pop();
    console.log(`Removing ${dir}`);
    if(dir.size <= 100000) {
      sum += +dir.size;
    }
  } else if(line.startsWith('$ cd')) {
    const dirName = line.split(' ')[2];
    stack.push({name: dirName, size: 0});
    console.log(`Adding ${dirName}`)
  } else if(line.startsWith('dir')) {
    // do nothing
  } else if (line === '$ ls'){
    // do nothing
  } else {
    // should be a file size
    const size = line.split(' ')[0];
    stack.forEach((dir) => {
      dir.size += +size;
    });
  }
});

file.on('close', () => {
  console.log(sum);
});