import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TournamentStyles.css';


// Example static list of movies
const staticMovies = [
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    // ... more movies
];

const MovieSelectionScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedMovies, setSelectedMovies] = useState([]);
    const mode = location.state?.mode || 'tournament'; // Default to 'tournament'

    useEffect(() => {
        // Placeholder for logic to fetch movies or set up selection
        // Replace staticMovies with your dynamic movies data if needed
    }, []);

    const handleMovieSelect = (movie) => {
        setSelectedMovies(prevMovies => {
            // Add or remove movie from the selected list
            if (prevMovies.includes(movie)) {
                return prevMovies.filter(m => m !== movie);
            } else {
                return [...prevMovies, movie];
            }
        });
    };

    const startTournamentOrRanking = () => {
        if (mode === 'tournament') {
            navigate('/tournament', { state: { movies: selectedMovies } });
        } else if (mode === 'ranking') {
            navigate('/ranking', { state: { movies: selectedMovies } });
        }
    };

    return (
        <div className="landing-page">
            <div className="button-container">
                <button className="button" onClick={startTournamentOrRanking}>Empezar Torneo!</button>
            </div>
            <div className="footnote">
                Creado por <a href="https://www.instagram.com/nicocamachoaa/" target="_blank" rel="noopener noreferrer">Nico Camacho</a>
            </div>
        </div>
    );
};

export default MovieSelectionScreen;
