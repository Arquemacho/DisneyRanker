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
        movie TEXT,
        round INTEGER,
        timestamp TEXT
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
    const { movie, round, timestamp } = req.body;

    console.log('Received selection:', { movie, round, timestamp }); // Log the received data

    const sql = `INSERT INTO selections (movie, round, timestamp) VALUES (?, ?, ?)`;
    db.run(sql, [movie, round, timestamp], (err) => {
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
