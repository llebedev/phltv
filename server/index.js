const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("database.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS teams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        players TEXT
    )
`);


db.exec(`
    CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nick TEXT NOT NULL,
        rate FLOAT,
        team TEXT,
        role TEXT,
        number INTEGER
    )
`);


app.get("/teams", (req, res) => {
  const users = db.prepare("SELECT * FROM teams").all();
  res.json(users);
});

app.get("/player/:nick", (req, res ) => {
  const nick = req.params.nick;

  const player = db.prepare("SELECT * FROM players WHERE nick = ?").all(nick);
  res.json(player);
});


app.get("/team/:team", (req, res) => {
  const teamName = req.params.team;

  const teamRow = db.prepare("SELECT * FROM teams WHERE name = ?").get(teamName);

  if (teamRow) {
    res.json(teamRow);             
  } else {
    res.status(404).json({ error: "Команда не найдена" });
  }
});
    
/*
app.post("/users", (req, res) => {
  const { name } = req.body;
  const stmt = db.prepare("INSERT INTO users (name) VALUES (?)");
  const result = stmt.run(name);
  res.json({ id: result.lastInsertRowid });
});
*/

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
