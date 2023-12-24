const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./myTournamentData.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create table for selections if it doesn't exist
const createSelectionsTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS selections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sessionID TEXT,
        winner TEXT,
        loser TEXT,
        round INTEGER,
        timestamp TEXT,
        deviceInfo TEXT
    )`, [], (err) => {
        if (err) {
            console.error('Error creating selections table:', err.message);
        } else {
            console.log('Selections table created or already exists.');
        }
    });
};

createSelectionsTable();

app.post('/api/selection', (req, res) => {
    const { sessionID, matchup, round, timestamp, deviceInfo } = req.body;

    console.log('Received selection:', { sessionID, matchup, round, timestamp, deviceInfo });

    const sql = `INSERT INTO selections (sessionID, winner, loser, round, timestamp, deviceInfo) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [sessionID, matchup.winner, matchup.loser, round, timestamp, deviceInfo], (err) => {
        if (err) {
            console.error('Error inserting data into selections table:', err.message);
            res.status(500).send(err.message);
            return;
        }
        console.log('Selection data stored in database');
        res.status(200).send('Selection data received and stored');
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
