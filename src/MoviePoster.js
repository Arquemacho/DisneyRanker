import React, { useState, useEffect } from 'react';

const MoviePoster = ({ title }) => {
    const [posterUrl, setPosterUrl] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3001/api/poster/${title}`)
            .then(res => res.json())
            .then(data => setPosterUrl(data.posterUrl))
            .catch(err => console.error('Failed to fetch poster:', err));
    }, [title]);
    

    return (
        <div>
            <h3>{title}</h3>
            {posterUrl ? <img src={posterUrl} alt={`Poster of ${title}`} /> : <p>Poster not found</p>}
        </div>
    );
};

export default MoviePoster;
