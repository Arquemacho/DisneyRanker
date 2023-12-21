const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./myTournamentData.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create table for selections if it doesn't exist
const createSelectionsTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS selections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie TEXT,
        round INTEGER,
        timestamp TEXT
    )`);
};

createSelectionsTable();

app.post('/api/selection', (req, res) => {
    const { movie, round, timestamp } = req.body;
    const sql = `INSERT INTO selections (movie, round, timestamp) VALUES (?, ?, ?)`;
    db.run(sql, [movie, round, timestamp], (err) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.status(200).send('Selection data received and stored');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
