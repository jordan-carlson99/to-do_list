import express from "express";
const app = express();
import pg from "pg";
const { Client } = pg;
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
let port = 3000;

dotenv.config();
const pathToFile = path.resolve("./");

let pool = new Client(process.env.connectionURL);

pool.connect();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(`${pathToFile}/index.html`);
});

app.get("/index.js", (req, res) => {
  res.sendFile(`${pathToFile}/index.js`);
});

app.get("/styles.css", (req, res) => {
  res.sendFile(`${pathToFile}/styles.css`);
});

// api routes

app.get("/api/list", (req, res) => {
  pool.query(`SELECT * FROM list;`).then((response) => {
    res.send(response);
  });
});

app.post("/api/new", (req, res) => {
  pool
    .query(
      `INSERT INTO list (task,complete)
  VALUES ($1,$2)`,
      [req.body.task, req.body.complete]
    )
    .then(() => {
      res.send("complete");
    });
});

app.patch("/api/update/:id", (req, res) => {
  pool
    .query(
      `UPDATE list SET task=COALESCE($1,task), complete=COALESCE($2,complete) WHERE id=$3`,
      [req.body.task || null, req.body.complete || null, req.params.id]
    )
    .then(() => {
      res.send("complete");
    });
});

app.delete("/api/remove/:id", (req, res) => {
  pool.query(`DELETE FROM list WHERE id=$1`, [req.params.id]).then(() => {
    res.send("complete");
  });
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
