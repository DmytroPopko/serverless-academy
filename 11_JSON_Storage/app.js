const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());

app.put("/:json_path", (req, res) => {
  try {
    const jsonPath = req.params.json_path;
    console.log(jsonPath);
    const jsonData = req.body;
    console.log(jsonData);

    if (!jsonData) {
      return res.status(400).json({ error: "Invalid JSON document" });
    }

    const fileName = `./db/${jsonPath}.json`;
    console.log(fileName);
    fs.writeFileSync(fileName, JSON.stringify(jsonData));

    res.status(201).send({ message: "JSON data stored successfully" });
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
});

app.get("/:jsonPath", (req, res) => {
  const jsonPath = req.params.jsonPath;
  const fileName = `./db/${jsonPath}.json`;

  if (!fs.existsSync(fileName)) {
    console.log("JSON file not found");
    return res.status(404).send({ message: "JSON file not found" });
  }

  const jsonData = fs.readFileSync(fileName, "utf-8");
  console.log(JSON.parse(jsonData));
  res.status(200).send(JSON.parse(jsonData));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
