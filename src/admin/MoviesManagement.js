import React, { useState, useEffect } from 'react';
import './admin.css'; // Import the CSS file
import BackToDashboardButton from './BackToDashboardButton'; // Correct path as per your project structure

const MoviesManagement = () => {
    const [movies, setMovies] = useState([]);
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newMoviePosterUrl, setNewMoviePosterUrl] = useState('');
    const history = useHistory();

    const navigateToDashboard = () => {
        history.push('/admin-dashboard'); // Update with your admin dashboard route
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        fetch('http://186.113.234.239:3001/api/movies')
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(err => console.error(err));
    };

    const addMovie = () => {
        // Add movie
        fetch('http://186.113.234.239:3001/api/add-movie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newMovieTitle })
        })
        .then(response => response.json())
        .then(() => {
            // Add poster
            fetch('http://186.113.234.239:3001/api/add-poster', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieTitle: newMovieTitle, posterUrl: newMoviePosterUrl })
            })
        })
        .then(() => {
            setNewMovieTitle('');
            setNewMoviePosterUrl('');
            fetchMovies(); // Refresh the movie list
        })
        .catch(err => console.error('Failed to add movie:', err));
    };

    const deleteMovie = (title) => {
        fetch('http://186.113.234.239:3001/api/delete-movie', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        })
        .then(() => {
            fetchMovies(); // Refresh the movie list
        })
        .catch(err => console.error('Failed to delete movie:', err));
    };

    return (
        <div className="movies-management">
            <h2>Manage Movies</h2>
            <div className="add-movie-form">
                <input
                    type="text"
                    value={newMovieTitle}
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                    placeholder="Movie Title"
                    className="input-field"
                />
                <input
                    type="text"
                    value={newMoviePosterUrl}
                    onChange={(e) => setNewMoviePosterUrl(e.target.value)}
                    placeholder="Poster URL"
                    className="input-field"
                />
                <button onClick={addMovie} className="action-button">Add Movie</button>
            </div>

            <div className="movie-list">
                {movies.map((movie, index) => (
                    <div key={index} className="movie-item">
                        <span>{movie.title}</span>
                        <button onClick={() => deleteMovie(movie.title)} className="delete-button">Delete</button>
                    </div>
                ))}
            </div>
            <BackToDashboardButton />
        </div>
    );
};

export default MoviesManagement;
