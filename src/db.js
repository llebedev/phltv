const db = require('better-sqlite3')('db.db');

const getTeams = () => {
    const result = db.prepare('SELECT * FROM teams').all;
    console.log(result);
}