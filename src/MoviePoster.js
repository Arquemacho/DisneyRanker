import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TournamentStyles.css';

const MoviePoster = ({ title }) => {
    const [posterUrl, setPosterUrl] = useState('');

    useEffect(() => {
        const apiKey = '83ec3237b21273a67ebe413154877f59'; // Replace with your actual API key
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;

        axios.get(url)
            .then(response => {
                const results = response.data.results;
                if (results.length > 0) {
                    const movie = results[0];
                    const posterPath = movie.poster_path;
                    setPosterUrl(`https://image.tmdb.org/t/p/w500${posterPath}`);
                }
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [title]);

    return (
        <div>
            <h3>{title}</h3>
            {posterUrl ? <img src={posterUrl} alt={`Poster of ${title}`} className="movie-poster" /> : <p>Loading...</p>}
        </div>
    );
};


export default MoviePoster;
