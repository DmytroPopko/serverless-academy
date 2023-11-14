const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const { links } = require("./db.json");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/makeShortLink", (req, res) => {
    try{
  const originalUrl = req.body.url;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortUrl = nanoid();

  links.push({ [`${shortUrl}`]: originalUrl });
  fs.writeFileSync("./db.json", JSON.stringify({ links }), "utf-8");

  const shortenedUrl = `http://localhost:${port}/${shortUrl}`;
  res.json({ shortenedUrl });
} catch (e){
    res.status(500).send(e.message);
    console.error(e.message);
  }
});

app.get("/getOrigineLink", (req, res) => {
  try {
    const shortLink = req.query.shortLink;

    const data = fs.readFileSync('./db.json', 'utf-8');
    const { links } = JSON.parse(data);

    const originalUrlObj = links.find(obj => Object.keys(obj)[0] === shortLink);
 
    if (originalUrlObj) {
      res.redirect(originalUrlObj[shortLink]);
    } else {
      res.status(404).json({ error: "short link not found" });
    }
  } catch (e) {
    res.status(500).send(e.message);
    console.error(e.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
