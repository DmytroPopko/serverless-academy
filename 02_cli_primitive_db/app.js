import inquirer from "inquirer";
import fs from "fs";
const fsPromises = fs.promises;

function addUser() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "Enter the user's name. To cancel press ENTER",
      },
    ])
    .then((answers) => {
      const userName = answers.name;
      if (userName == "") {
        inquirer
          .prompt([
            {
              type: "confirm",
              name: "wantSearch",
              message: "Would you to search values in DB?",
            },
          ])
          .then((answers) => {
            if (answers.wantSearch) {
              (async () => {
                try {
                  const data = await fsPromises.readFile("./data.txt", "utf8");
                  const obj = JSON.parse("[" + data + "]");
                  console.log(obj);

                  inquirer
                    .prompt([
                      {
                        name: "search",
                        message: "Enter the user's name you wanna find in DB:",
                      },
                    ])
                    .then((answers) => {
                      const result = obj.filter(
                        (item) => item.user === answers.search.toLowerCase()
                      );
                      if (result.length == 0) {
                        console.log(`User ${answers.search} not found`);
                      } else {
                        console.log(`User ${answers.search} was found.`);
                        console.log(result);
                      }
                    });
                } catch (err) {
                  console.error(err);
                }
              })();
            }
          });
      } else {
        inquirer
          .prompt([
            {
              type: "list",
              name: "gender",
              message: "Choose your gender.",
              choices: ["male", "female"],
            },
            {
              name: "age",
              message: "Enter your age:",
            },
          ])
          .then((answers) => {
            (async () => {
              try {
                const data = await fsPromises.readFile("./data.txt", "utf8");
                const newUser =
                  data +
                  (data.trim() ? "," : "") +
                  JSON.stringify({
                    user: userName.toLowerCase(),
                    gender: answers.gender,
                    age: answers.age,
                  });

                await fs.writeFileSync("./data.txt", newUser, "utf-8");
                addUser();
              } catch (err) {
                console.error(err);
              }
            })();
          });
      }
    });
}

addUser();
