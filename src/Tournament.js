import React, { useState, useEffect } from 'react';
import MoviePoster from './MoviePoster';
import { useLocation } from 'react-router-dom';
import './TournamentStyles.css';
import confetti from 'canvas-confetti';
import { TwitterShareButton, WhatsappShareButton, TwitterIcon, WhatsappIcon } from 'react-share';

const Tournament = () => {
    const [currentRound, setCurrentRound] = useState([]);
    const [nextRound, setNextRound] = useState([]);
    const [winner, setWinner] = useState(null);
    const [matchupIndex, setMatchupIndex] = useState(0);
    const [totalMatchupsInRound, setTotalMatchupsInRound] = useState(0);
    const location = useLocation();
    const moviesFromSelection = location.state?.movies || [];
    const [selectionHistory, setSelectionHistory] = useState([]);
    const [sessionID, setSessionID] = useState('');

    useEffect(() => {
        setSessionID(generateUniqueID());

        const savedState = localStorage.getItem('tournamentState');
        if (savedState) {
            const { currentRound, nextRound, winner, matchupIndex, totalMatchupsInRound, selectionHistory } = JSON.parse(savedState);
            setCurrentRound(currentRound);
            setNextRound(nextRound);
            setWinner(winner);
            setMatchupIndex(matchupIndex);
            setTotalMatchupsInRound(totalMatchupsInRound);
            setSelectionHistory(selectionHistory);
        } else if (moviesFromSelection.length > 0) {
            initializeTournament(moviesFromSelection);
        } else {
            fetchMoviesAndInitialize();
        }
    }, [moviesFromSelection]);

    const fetchMoviesAndInitialize = () => {
        fetch('http://localhost:3001/api/movies')
            .then(response => response.json())
            .then(moviesData => {
                const movieTitles = moviesData.map(movie => movie.title);
                initializeTournament(movieTitles);
            })
            .catch(error => console.error('Failed to fetch movies:', error));
    };

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

    function generateUniqueID() {
        return Math.random().toString(36).substr(2, 9);
    }

    const handleKeyDown = (event) => {
        const currentMatchup = currentRound[matchupIndex];
        if (!currentMatchup || currentMatchup.length === 0) return;

        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            const movieIndex = event.key === 'ArrowLeft' ? 0 : 1;
            if (currentMatchup[movieIndex]) {
                selectMovie(currentMatchup[movieIndex]);
            }
        } else if (event.key === 'a' && currentMatchup.length > 0) {
            deleteMovie(currentMatchup[0]);
        } else if (event.key === 's' && currentMatchup.length > 1) {
            deleteMovie(currentMatchup[1]);
        }
    };

    function selectMovie(selectedMovie) {
        if (winner) return;

        let updatedNextRound = [...nextRound, selectedMovie];
        const loserMovie = currentRound[matchupIndex].find(movie => movie !== selectedMovie);

        const selection = {
            sessionID: sessionID,
            matchup: {
                winner: selectedMovie,
                loser: loserMovie
            },
            round: calculateTournamentRound(totalMatchupsInRound),
            timestamp: new Date().toISOString(),
            deviceInfo: navigator.userAgent
        };

        setSelectionHistory(prevHistory => [...prevHistory, selection]);
        sendDataToBackend(selection);

        if (matchupIndex === currentRound.length - 1) {
            if (updatedNextRound.length === 1) {
                setWinner(updatedNextRound[0]);
            } else {
                setCurrentRound(createRound(updatedNextRound));
                setTotalMatchupsInRound(updatedNextRound.length);
                setNextRound([]);
                setMatchupIndex(0);
            }
        } else {
            setNextRound(updatedNextRound);
            setMatchupIndex(prevIndex => prevIndex + 1);
        }
    }

    async function sendDataToBackend(selection) {
        try {
            await fetch('http://186.113.234.239:3001/api/selection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selection)
            });
        } catch (error) {
            console.error('Error sending selection data to backend:', error);
        }
    }

    const deleteMovie = async (movieTitle) => {
        try {
            const response = await fetch('http://localhost:3001/api/delete-movie', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: movieTitle })
            });

            if (response.ok) {
                setCurrentRound(currentRound => currentRound.map(matchup => matchup.filter(movie => movie !== movieTitle)));
                setNextRound(nextRound => nextRound.filter(movie => movie !== movieTitle));
            } else {
                console.error('Failed to delete the movie');
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
        const names = ['Final', 'Semi Final', 'Cuartos de Final', 'Octavos de Final', 'Ronda de 32', 'Ronda de 64', 'Ronda de 128', 'Ronda de 256', 'Ronda de 512', 'Ronda de 1024'];
        let index = Math.ceil(Math.log2(numMovies / 2));
        return names[index] || '';
    };

    const triggerConfetti = () => {
        if (winner) {
            confetti({
                particleCount: 2001,
                spread: 300,
                origin: { y: 0.4 }
            });
        }
    };

    useEffect(triggerConfetti, [winner]);
    const calculateTournamentRound = (totalMatchups) => {
        return Math.ceil(Math.log2(totalMatchups * 2));
    };

    const startNewTournament = () => {
        fetchMoviesAndInitialize();
        setSessionID(generateUniqueID());
        setWinner(null);
        setSelectionHistory([]);
        localStorage.removeItem('tournamentState');
    };
        

    if (winner) {
        const shareUrl = 'http://186.113.234.239:3000/';
        const title = `Mi película favorita de Disney es ${winner}. ¡Averigua cuál es la tuya!`;
    
        return (
            <div className="winner-container">
                <h3>Ganador:</h3>
                <MoviePoster title={winner} />
                <button className="button" onClick={startNewTournament}>Empezar un Nuevo Torneo</button>
    
                <div className="social-share-buttons">
                    <TwitterShareButton url={shareUrl} title={title}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
    
                    <WhatsappShareButton url={shareUrl} title={title}>
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </div>
            </div>
        );
    }

    const roundName = getRoundName(currentRound.length * 2);
    const totalMatchups = currentRound.length + Math.ceil(nextRound.length / 2);

    return (
        <div className="tournament-container">
            <div className="tournament-title">Torneo de Peliculas Disney</div>
            {!winner && (
                <div>
                    <div className="info-container">
                        <div className="info-box">
                            <p>Enfrentamiento {matchupIndex + 1} de {totalMatchupsInRound}</p>
                        </div>
                        <div className="info-box">
                            <p>{roundName}</p>
                        </div>
                    </div>

                    <div className="matchup">
                        {currentRound[matchupIndex] && currentRound[matchupIndex].map((movie, index) => (
                            <div key={`${movie}-${index}`} className="card" onClick={() => selectMovie(movie)}> {/* Change made here */}
                                <MoviePoster title={movie} />
                            </div>
                        ))}
                    </div>
                    <button className="button" onClick={startNewTournament}>Empezar un Nuevo Torneo</button>
                </div>
            )}
            <div className="footnote">
                Creado por <a href="https://www.instagram.com/nicocamachoaa/" target="_blank" rel="noopener noreferrer">Nicolas Camacho</a>
            </div>

        </div>
    );
};

export default Tournament;