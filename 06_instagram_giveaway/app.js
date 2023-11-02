const fs = require("fs");
const folder = "./words/";
const files = [];
const uniqueRecords = {};

fs.readdirSync(folder).forEach((file) => {
  files.push(file);
});

files.forEach((file) => {
  const filePath = folder + file;
  const data = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
  const unique = [...new Set(data.split(/\r?\n/))];
  unique.forEach((record) => {
    uniqueRecords[record]
      ? uniqueRecords[record].push(file)
      : (uniqueRecords[record] = [file]);
  });
});

function uniqueValues() {
  const start = new Date();
  console.log("Unique usernames: ", Object.keys(uniqueRecords).length);
  console.log(
    "Time: ",
    (new Date() - start) / 1000
  );
}

function existInAllFiles() {
    const start = new Date();
  const existedInAllFiles = [];
  for (const [key, value] of Object.entries(uniqueRecords)) {
    if (value.length === 20) existedInAllFiles.push(key);
  }
  console.log("Exist in all files: ", existedInAllFiles.length);
  console.log(
    "Time: ",
    (new Date() - start) / 1000
  );
}

function existInAtleastTen() {
    const start = new Date();
  const existedInAtLeastTen = [];
  for (const [key, value] of Object.entries(uniqueRecords)) {
    if (value.length >= 10) existedInAtLeastTen.push(key);
  }
  console.log("Exist in all files: ", existedInAtLeastTen.length);
  console.log(
    "Time: ",
    (new Date() - start) / 1000
  );
}

uniqueValues();
existInAllFiles();
existInAtleastTen();