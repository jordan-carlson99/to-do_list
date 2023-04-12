import express from "express";
const app = express();
import pg from "pg";
const { Client } = pg;
import path from "path";
import dotenv from "dotenv";
let port = 3000;

dotenv.config();
const pathToFile = path.resolve("./");

let pool = new Client(process.env.connectionURL);

app.get("/", (req, res) => {
  res.sendFile(`${pathToFile}/index.html`);
});

app.get("/index.js", (req, res) => {
  res.sendFile(`${pathToFile}/index.js`);
});

app.get("/styles.css", (req, res) => {
  res.sendFile(`${pathToFile}/styles.css`);
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
