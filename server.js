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

const createMoviesTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT UNIQUE
    )`, [], (err) => {
        if (err) {
            console.error('Error creating movies table:', err.message);
        } else {
            console.log('Movies table created or already exists.');
        }
    });
};

const createPostersTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS posters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movieId INTEGER,
        posterUrl TEXT,
        FOREIGN KEY (movieId) REFERENCES movies(id)
    )`, [], (err) => {
        if (err) {
            console.error('Error creating posters table:', err.message);
        } else {
            console.log('Posters table created or already exists.');
        }
    });
};

createMoviesTable();
createPostersTable();


app.post('/api/add-movie', async (req, res) => {
    const { title } = req.body;

    try {
        await db.run('INSERT INTO movies (title) VALUES (?)', [title]);
        res.status(200).send('Movie added successfully');
    } catch (err) {
        console.error('Error adding movie:', err.message);
        res.status(500).send(err.message);
    }
});

app.post('/api/add-poster', async (req, res) => {
    const { movieTitle, posterUrl } = req.body;
    
    try {
        const movie = await db.get('SELECT id FROM movies WHERE title = ?', [movieTitle]);
        if (movie) {
            await db.run('INSERT INTO posters (movieId, posterUrl) VALUES (?, ?)', [movie.id, posterUrl]);
            res.status(200).send('Poster added successfully');
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (err) {
        console.error('Error adding poster:', err.message);
        res.status(500).send(err.message);
    }
});

app.delete('/api/delete-movie', async (req, res) => {
    const { title } = req.body;

    try {
        await db.run('DELETE FROM movies WHERE title = ?', [title]);
        // Optional: Delete posters associated with the movie
        await db.run('DELETE FROM posters WHERE movieId IN (SELECT id FROM movies WHERE title = ?)', [title]);
        
        res.status(200).send('Movie and associated posters deleted successfully');
    } catch (err) {
        console.error('Error deleting movie:', err.message);
        res.status(500).send(err.message);
    }
});


app.get('/api/movies', (req, res) => {
    const sql = `SELECT * FROM movies`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
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

app.get('/api/popular-movies', (req, res) => {
    const sql = `SELECT winner, COUNT(*) as count 
                 FROM selections 
                 GROUP BY winner 
                 ORDER BY count DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

app.get('/api/common-matchups', (req, res) => {
    const sql = `SELECT winner, loser, COUNT(*) as count 
                 FROM selections 
                 GROUP BY winner, loser 
                 ORDER BY count DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// Endpoint for user statistics
app.get('/api/user-stats', (req, res) => {
    const sql = `SELECT COUNT(DISTINCT sessionID) as totalTournaments, 
                        AVG(round) as averageRoundsPerTournament
                 FROM selections`;
    db.get(sql, (err, row) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(row);
    });
});

// Endpoint for device usage patterns
app.get('/api/device-usage', (req, res) => {
    const sql = `SELECT deviceInfo, COUNT(*) as count 
                 FROM selections 
                 GROUP BY deviceInfo`;
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
