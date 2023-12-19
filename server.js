const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.delete('/api/delete-movie', (req, res) => {
    console.log('DELETE request received for /api/delete-movie');
    const movieToDelete = req.body.movieName;
    console.log('Attempting to delete movie:', movieToDelete); // Additional log
    const filePath = path.join(__dirname, 'movies.txt');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file', error: err.message });
        }
        const lines = data.split('\n');
        if (!lines.includes(movieToDelete)) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        const updatedLines = lines.filter(line => line !== movieToDelete);
        fs.writeFile(filePath, updatedLines.join('\n'), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file', error: err.message });
            }
            res.json({ message: 'Movie deleted successfully' });
            console.log('Movie deleted successfully:', movieToDelete); // Additional log
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
