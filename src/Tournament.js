import React, { useState, useEffect } from 'react';
import movies from './movies';
import MoviePoster from './MoviePoster';
import { useLocation } from 'react-router-dom';
import './TournamentStyles.css';
import confetti from 'canvas-confetti';

const Tournament = () => {
    const [currentRound, setCurrentRound] = useState([]);
    const [nextRound, setNextRound] = useState([]);
    const [winner, setWinner] = useState(null);
    const [matchupIndex, setMatchupIndex] = useState(0);
    const [totalMatchupsInRound, setTotalMatchupsInRound] = useState(0);
    const location = useLocation();
    const moviesFromSelection = location.state?.movies || [];

    useEffect(() => {
        if (moviesFromSelection.length > 0) {
            initializeTournament(moviesFromSelection);
        } else {
            // Handle case where no movies are passed
            initializeTournament(movies);
        }
    }, [moviesFromSelection]);

    useEffect(() => {
        // Automatically advance if only one movie in the matchup
        if (currentRound[matchupIndex] && currentRound[matchupIndex].length === 1) {
            selectMovie(currentRound[matchupIndex][0]);
        }
    }, [currentRound, matchupIndex]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentRound, matchupIndex]);



    const initializeTournament = (moviesArray) => {
        const shuffledMovies = [...moviesArray].sort(() => 0.5 - Math.random());
        const initialRound = [];

        while (shuffledMovies.length) {
            initialRound.push([shuffledMovies.shift(), shuffledMovies.shift()].filter(Boolean));
        }

        setCurrentRound(initialRound);
        setTotalMatchupsInRound(initialRound.length);
        setNextRound([]);
        setWinner(null);
        setMatchupIndex(0);
    };

    const handleKeyDown = (event) => {
        const currentMatchup = currentRound[matchupIndex];
        if (!currentMatchup || currentMatchup.length === 0) return;

        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            // Existing logic for selecting movies
            const movieIndex = event.key === 'ArrowLeft' ? 0 : 1;
            if (currentMatchup[movieIndex]) {
                selectMovie(currentMatchup[movieIndex]);
            }
        } else if (event.key === 'a' && currentMatchup.length > 0) {
            // 'A' key pressed, delete the movie on the left
            deleteMovie(currentMatchup[0]);
        } else if (event.key === 's' && currentMatchup.length > 1) {
            // 'S' key pressed, delete the movie on the right
            deleteMovie(currentMatchup[1]);
        }
    };




    function selectMovie(movie) {
        if (winner) return;

        let updatedNextRound = [...nextRound, movie];

        if (matchupIndex === currentRound.length - 1) {
            if (updatedNextRound.length === 1) {
                setWinner(updatedNextRound[0]);
            } else {
                const newRound = createRound(updatedNextRound);
                setCurrentRound(newRound);
                setTotalMatchupsInRound(newRound.length);
                setNextRound([]);
                setMatchupIndex(0);
            }
        } else {
            setNextRound(updatedNextRound);
            setMatchupIndex(prevIndex => prevIndex + 1);
        }
    }
    const deleteMovie = async (movieTitle) => {
        try {
            // Update the URL to point to your backend server on port 3001
            const response = await fetch('http://localhost:3001/api/delete-movie', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movieName: movieTitle }),
            });

            if (response.ok) {
                // Assuming the response is successful, update the state to remove the movie from the UI
                setCurrentRound(currentRound => currentRound.map(matchup => matchup.filter(movie => movie !== movieTitle)));
                setNextRound(nextRound => nextRound.filter(movie => movie !== movieTitle));
            } else {
                // Handle any errors here
                console.error('Failed to delete the movie');
                const resText = await response.text();
                console.log('Server response:', resText);
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };



    const createRound = (winners) => {
        let newRound = [];
        for (let i = 0; i < winners.length; i += 2) {
            newRound.push(winners.slice(i, i + 2));
        }
        return newRound;
    };

    const getRoundName = (numMovies) => {
        if (numMovies <= 2) return 'Final';
        if (numMovies <= 4) return 'Semi Finals';
        if (numMovies <= 8) return 'Quarter Finals';
        if (numMovies <= 16) return 'Round of 16';
        if (numMovies <= 32) return 'Round of 32';
        if (numMovies <= 64) return 'Round of 64';
        if (numMovies <= 128) return 'Round of 128';
        if (numMovies <= 256) return 'Round of 256';
        if (numMovies <= 512) return 'Round of 512';
        if (numMovies <= 1024) return 'Round of 1024';
        return '';
    };

    if (winner) {
        // Trigger confetti
        confetti({
            particleCount: 300,
            spread: 100,
            origin: { y: 0.6 }
        });

        return (
            <div className="winner-container">
                <h3>Winner:</h3>
                <MoviePoster title={winner} />
            </div>
        );
    }

    const roundName = getRoundName(currentRound.length * 2);
    const totalMatchups = currentRound.length + Math.ceil(nextRound.length / 2);

    return (
        <div className="tournament-container">
            <h2>Tournament Mode</h2>
            {!winner && (
                <div>
                    <div className="tournament-info">
                        <p>Current Matchup: {matchupIndex + 1} out of {totalMatchupsInRound}</p>
                        <p>Current Round: {roundName}</p>
                    </div>
                    <div className="matchup">
                        {currentRound[matchupIndex] && currentRound[matchupIndex].map((movie, index) => (
                            <div key={index} className="card" onClick={() => selectMovie(movie)}>
                                <MoviePoster title={movie} />
                                {/*<button onClick={() => deleteMovie(movie)}>Delete Movie</button>*/}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tournament;