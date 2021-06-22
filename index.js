const path = require("path");
const fs = require("fs");
const { randomInt } = require("crypto");
const readline = require("readline");

let random = randomInt(0, 2);
console.log(random);
let gameNumber = 0;

const input = readline.createInterface(process.stdin);
let customPath = "";

console.log("Добро пожаловать! Введите имя файла для ведения логов.");

const handler = (args) => {
  if (args.indexOf(".txt") === -1) {
    args += ".txt";
  }
  customPath = path.join(__dirname, args);
  fs.writeFileSync(customPath, "", "utf8");
  console.log("Файл создан");
  console.log("Введите 0 или 1 что бы угадать число.");
  input.removeListener("line", handler);
  input.on("line", (args) => {
    gameNumber += 1;
    if (args == random) {
      console.log("Верно!");
      fs.appendFileSync(customPath, ` ${gameNumber}.1`, "utf8");
      random = randomInt(0, 2);
    } else if (args == 0 || args == 1) {
      console.log("Неверно!");
      fs.appendFileSync(customPath, ` ${gameNumber}.0`, "utf8");
    } else {
      console.log("Введите 0 или 1.");
      fs.appendFileSync(customPath, ` ${gameNumber}.2`, "utf8");
    }
  });
};

input.on("line", handler);
