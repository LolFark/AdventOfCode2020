const fs = require("fs");
const readline = require("readline");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./day02_input.txt"),
});

function solve() {
  let total = 0;
  readInterface.on("line", (line) => {
    let [range, rule, password] = line.split(" ");
    let [lower, upper] = range.split("-");
    let letter = rule[0];
    let count = 0;
    for (let i = 0; i < password.length; i++) {
      if (password[i] === letter) {
        count++;
      }
      if (count > upper) {
        break;
      }
    }
    if (count >= lower && count <= upper) {
      total = total + 1;
    }
    return total;
  });
  readInterface.on("close", (close) => {
    console.log(total);
  });
}

function solvePart2() {
  let total = 0;
  readInterface.on("line", (line) => {
    let [positions, rule, password] = line.split(" ");
    let [first, last] = positions.split("-");
    first--;
    last--;
    let letter = rule[0];
    if (password[first] !== letter && password[last] === letter) {
      total += 1;
    } else if (password[first] === letter && password[last] !== letter) {
      total += 1;
    }
  });

  readInterface.on("close", () => {
    console.log(total);
  });
}

solvePart2();
