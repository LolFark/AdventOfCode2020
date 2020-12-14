const fs = require("fs");

function solve03(map, slope) {
  let nTrees = 0;
  let row = map.length;
  let column = map[0].length;
  let c = 0,
    r = 0;
  while (r < row) {
    let pos = map[r][c % column];
    if (pos === "#") {
      nTrees++;
    }
    r += slope[0];
    c += slope[1];
  }
  return nTrees;
}

function solve03Part2(map, slopes) {
  let slopeTrees = [];
  let row = map.length;
  let column = map[0].length;
  slopes.forEach((slope) => {
    let c = 0,
      r = 0;
    nTrees = 0;
    while (r < row) {
      let pos = map[r][c % column];
      if (pos === "#") {
        nTrees++;
      }
      r += slope[0];
      c += slope[1];
    }
    slopeTrees.push(nTrees);
  });
  return slopeTrees.reduce((prev, curr) => prev = prev * curr);
}

function main() {
  let map = [];
  try {
    const data = fs.readFileSync("./day03_input.txt", "utf-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => map.push(line));
  } catch (err) {
    console.log(err);
  }
  const slopes = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1],
  ];
  console.log(solve03(map, slopes[1]));
  console.log(solve03Part2(map, slopes));
}

main();