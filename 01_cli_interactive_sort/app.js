const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin, // ввод из стандартного потока
  output: process.stdout, // вывод в стандартный поток
});

function sortValue() {
  rl.question(
    "Hello. Enter 10 words or digits deviding them in spaces: ",
    (answer) => {
      let wordsOrDigits = answer.split(" ");
      wordsOrDigits = wordsOrDigits.map((item) => {
        const numerItem = parseInt(item, 10);
        return isNaN(numerItem) ? item : numerItem;
      });
      console.log(wordsOrDigits);

      rl.question(
        `How would you like to sort values:
  1. Words by name (from A to Z).
  2. Show digits from the smallest.
  3. Show digits from the biggest.
  4. Words by quantity of letters.
  5. Only unique words.
  6. Display only unique values from the set of words and numbers entered by the user
  Select (1-5) and press ENTER:
  `,
        (answer) => {
          if (answer == 1) {
            const words = wordsOrDigits.filter(
              (item) => typeof item === "string"
            );
            words.sort();
            console.log(words);
            sortValue();
          } else if (answer == 2) {
            const numbers = wordsOrDigits.filter(
              (item) => typeof item === "number"
            );
            numbers.sort();
            console.log(numbers);
            sortValue();
          } else if (answer == 3) {
            const numbers = wordsOrDigits.filter(
              (item) => typeof item === "number"
            );
            numbers.sort((a, b) => b - a);
            console.log(numbers);
            sortValue();
          } else if (answer == 4) {
            const words = wordsOrDigits.filter(
              (item) => typeof item === "string"
            );
            words.sort((a, b) => a.length - b.length);
            console.log(words);
            sortValue();
          } else if (answer == 5) {
            let uniqueWords = [];

            for (let str of wordsOrDigits) {
              if (!uniqueWords.includes(str)) {
                uniqueWords.push(str);
              }
            }
            console.log(uniqueWords);
            sortValue();
          } else if (answer == 6) {
            const unique = wordsOrDigits.filter(
              (a) => wordsOrDigits.filter((b) => b === a).length == 1
            );
            console.log(unique);
            sortValue();
          } else if (answer == "exit") {
            console.log("Good bye! Come back again!");
          }
        }
      );
    }
  );
}

sortValue();
