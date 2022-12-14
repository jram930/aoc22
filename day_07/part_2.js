const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

const stack = [];
let sum = 0;
const allSizes = [];

file.on('line', (line) => {
  if(line === '$ cd ..') {
    const dir = stack.pop();
    console.log(`Removing ${dir}`);
    if(dir.size <= 100000) {
      sum += +dir.size;
    }
    allSizes.push(dir);
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

let needToFreeUp = 0;
let usedSpace = 0;
let availableSpace = 0;

let minDifference = 9999999999;
let answer = 0;

file.on('close', () => {
  stack.forEach((dir) => {
    if(dir.size <= 100000) {
      sum += +dir.size;
    }
    allSizes.push(dir);
  });
  usedSpace = +stack[0].size;
  availableSpace = 70000000 - usedSpace;
  needToFreeUp = 30000000 - availableSpace;
  console.log(`Total used space is ${usedSpace}`);
  console.log(`Available space is ${availableSpace}`);
  console.log(`Need to free up ${needToFreeUp}`);
  allSizes.forEach((dir) => {
    const diff = (+dir.size) - needToFreeUp;
    if(diff > 0 && diff < minDifference) {
      minDifference = diff;
      answer = +dir.size;
    }
  });
  console.log(answer);
});