const { Client } = require("pg");

async function requestDB() {
  
  const client = new Client({
    ssl: { rejectUnauthorized: false },
    user: "postgres",
    host: process.env.VITE_SUPABASE_URL,
    database: "postgres",
    password: process.env.VITE_SUPABASE_KEY,
    port: 5432,
  });
  client.connect(function (err) {
    console.log("connected to DB");
  });

  return client;
}

module.exports = requestDB;