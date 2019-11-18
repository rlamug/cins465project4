const express = require('express');
const mysql = require('mysql');
const app = express();

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rola7195!!',
  database: 'tic_tac_toe_stats'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});

// Select stats
app.get('/api/allstats', (req, res) => {
  let sql = 'SELECT * FROM stats';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

// Insert player
app.get('/addplayer/:name', (req, res) => {
  let sql = `INSERT INTO stats (name, xwins, owins, draws) VALUES ('${req.params.name}', '0', '0', '0')`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Player added...');
  });
});

// Select single player
app.get('/login/:name', (req, res) => {
  let sql = `SELECT * FROM stats WHERE id = ${req.params.name}`;
  let query = db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Player fetched...');
  });
});

// Update player xwins
app.get('/updateplayer/:name/:xwins/:owins/:draws', (req, res) => {
  let sql = `UPDATE stats 
    SET xwins = ${req.params.xwins}, 
    owins = ${req.params.owins}, 
    draws = ${req.params.draws}  
    WHERE name = ${req.params.name}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Player updated...');
  });
});

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);