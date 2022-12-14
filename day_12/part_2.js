const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

const key = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
  S: 0,
  E: 25,
};

const grid = [];
let index = 0;
const visited = [];
const distances = [];
let startRow = -1;
let startCol = -1;
let startHeight = key['a'];
let endRow = -1;
let endCol = -1;

const possibleStartingLocations = [];

file.on('line', (line) => {
  grid.push([]);
  visited.push([]);
  distances.push([]);
  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i);
    visited[index].push(false);
    distances[index].push(Number.MAX_SAFE_INTEGER);
    if(char === 'S') {
      grid[index].push('a');
      possibleStartingLocations.push(`${index} ${i}`);
    } else {
      grid[index].push(char);
      if(char === 'a') {
        possibleStartingLocations.push(`${index} ${i}`);
      } else if(char === 'E') {
        endRow = index;
        endCol = i;
      }
    }
  }
  index++;
});

const values = [];

file.on('close', () => {
  possibleStartingLocations.forEach((startingLocation) => {
    startRow = +startingLocation.split(' ')[0];
    startCol = +startingLocation.split(' ')[1];
    startHeight = key[grid[startRow][startCol]];
    // console.log(`Trying ${startRow} ${startCol}`);

    for(let i=0; i<grid.length; i++) {
      for(let j=0; j<grid[0].length; j++) {
        if(i === startRow && j === startCol) {
          visited[i][j] = true;
          distances[i][j] = 0;
        } else {
          visited[i][j] = false;
          distances[i][j] = Number.MAX_SAFE_INTEGER;
        }
      }
    }

    let currentRow = startRow;
    let currentCol = startCol;
    let currentHeight = startHeight;
    let currentDistance = 0;
    let deadEnd = false;
    while((currentRow !== endRow || currentCol !== endCol) && !deadEnd) {
      // console.log(`Current cell ${currentRow} ${currentCol} with height ${currentHeight}`);
      currentDistance = distances[currentRow][currentCol];
      if(currentCol > 0 && !visited[currentRow][currentCol-1] && key[grid[currentRow][currentCol-1]] <= currentHeight + 1) {
        // Look left
        if(currentDistance + 1 < distances[currentRow][currentCol - 1]) {
          distances[currentRow][currentCol - 1] = currentDistance + 1;
        }
      }
      
      if(currentCol < grid[0].length-1 && !visited[currentRow][currentCol+1] && key[grid[currentRow][currentCol+1]] <= currentHeight + 1) {
        // Look right
        if(currentDistance + 1 < distances[currentRow][currentCol + 1]) {
          distances[currentRow][currentCol + 1] = currentDistance + 1;
        }
      }
      
      if(currentRow > 0 && !visited[currentRow-1][currentCol] && key[grid[currentRow-1][currentCol]] <= currentHeight + 1) {
        // Look up
        if(currentDistance + 1 < distances[currentRow-1][currentCol]) {
          distances[currentRow - 1][currentCol] = currentDistance + 1;
        }
      }
      
      if(currentRow < grid.length-1 && !visited[currentRow+1][currentCol] && key[grid[currentRow+1][currentCol]] <= currentHeight + 1) {
        // Look down
        if(currentDistance + 1 < distances[currentRow+1][currentCol]) {
          distances[currentRow+1][currentCol] = currentDistance + 1;
        }
      }

      // Find unvisited node with smallest known distance
      let toVisitRow = -1;
      let toVisitCol = -1;
      let minValueFound = Number.MAX_SAFE_INTEGER;
      for(let i=0; i<grid.length; i++) {
        for(let j=0; j<grid[0].length; j++) {
          if(!visited[i][j] && distances[i][j] < minValueFound) {
            minValueFound = distances[i][j];
            toVisitRow = i;
            toVisitCol = j;
          }
        }
      }
      if(toVisitRow === -1 || toVisitCol === -1) {
        deadEnd = true;
        // console.log('dead end');
      } else {
        currentRow = toVisitRow;
        currentCol = toVisitCol;
        // console.log(`New min to visit ${currentRow} ${currentCol}`);
        currentHeight = key[grid[currentRow][currentCol]];
        visited[currentRow][currentCol] = true;
      }
    }
    if(!deadEnd) {
      values.push(distances[endRow][endCol]);
    }
  });
  console.log(Math.min(...values));
});