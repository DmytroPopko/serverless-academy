const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const requestIp = require("request-ip");

const app = express();
const port = 3000;

const csvFilePath = "./db/IP2LOCATION-LITE-DB1.CSV";
const ipDatabase = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    ipDatabase.push(row);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

app.get("/", (req, res) => {
  const userIP = requestIp.getClientIp(req);
  console.log(req.body);

  const userCountry = getCountryByIP(userIP);

  if (!userCountry) {
    return res.status(404).send({ message: "User location not found" });
  }

  res.status(200).send({
    ipAddress: userIP,
    country: userCountry.country,
    countryFullName: userCountry.countryName,
  });
});

function getCountryByIP(ip) {
  const ipNumber = ipToNumber(ip);

  for (const entry of ipDatabase) {
    const startRange = parseInt(entry.from);
    const endRange = parseInt(entry.to);

    if (ipNumber >= startRange && ipNumber <= endRange) {
      return {
        IP: ipAddress,
        country: ipRange.country,
        countryName: ipRange.countryFullName,
      };
    }
  }

  return "Unknown";
}

function ipToNumber(ip) {
  const parts = ip.split(".");
  return (
    (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parseInt(parts[3])
  );
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
