const readline = require("readline");
const fs = require("fs");
const path = require("path");

const input = readline.createInterface(process.stdin);

let playerWin = 0;
let playerLoose = 0;
let playerDumb = 0;

console.log("Введите название файла логов");

input.on("line", (args) => {
  if (args.indexOf(".txt") === -1) {
    args += ".txt";
  }
  const data = fs.readFileSync(path.join(__dirname, args), "utf8");
  const splitData = data.split(" ");
  splitData.splice(0, 1);
  console.log(`Всего игр: ${splitData.length}`);
  splitData.map((value) => {
    const newValue = value.split(".");
    newValue[1] == 0 && playerLoose++;
    newValue[1] == 1 && playerWin++;
    newValue[1] == 2 && playerDumb++;
  });
  console.log(
    `Всего игрок угадал: ${playerWin} - ${
      (playerWin * 100) / splitData.length
    }%.`
  );
  console.log(
    `Всего игрок не угадал: ${playerLoose} - ${
      (playerLoose * 100) / splitData.length
    }%.`
  );
  console.log(
    `Игрок ввел неверное значение(не 0 и не 1): ${playerDumb} - ${
      (playerDumb * 100) / splitData.length
    }%.`
  );
});
