import React, { useState, useEffect } from 'react';
import './TournamentStyles.css';
import postersData from './movie_posters.json'; // Import your JSON file

const MoviePoster = ({ title }) => {
    const [posterUrl, setPosterUrl] = useState('');

    useEffect(() => {
        // Retrieve poster URL from the imported JSON data
        const posterPath = postersData[title];
        if (posterPath) {
            setPosterUrl(posterPath);
        } else {
            console.error('Poster not found for: ', title);
        }
    }, [title]);

    return (
        <div>
            <h3>{title}</h3>
            {posterUrl ? <img src={posterUrl} alt={`Poster of ${title}`} className="movie-poster" /> : <p>Poster not found</p>}
        </div>
    );
};

export default MoviePoster;
