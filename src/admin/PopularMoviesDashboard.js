import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart, Bar } from 'react-chartjs-2';
import './admin.css'; // Import the CSS file
import BackToDashboardButton from './BackToDashboardButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PopularMoviesDashboard = () => {
    const [movieData, setMovieData] = useState([]);
    const [detailedMovieStats, setDetailedMovieStats] = useState(null);
    const [filteredMovieData, setFilteredMovieData] = useState([]);


    useEffect(() => {
        fetch('http://186.113.234.239:3001/api/popular-movies')
            .then(res => res.json())
            .then(data => {
                const filteredData = data.filter(movie => movie.winner.trim() !== '');
                setMovieData(filteredData);
                setFilteredMovieData(filteredData.slice(0, 10)); // Show top 10 by default
            })
            .catch(err => console.error(err));
    }, []);

    const showTopWinners = () => {
        const sortedData = [...movieData].sort((a, b) => b.count - a.count);
        setFilteredMovieData(sortedData.slice(0, 10));
    };

    const showTopLosers = () => {
        const sortedData = [...movieData].sort((a, b) => a.count - b.count);
        setFilteredMovieData(sortedData.slice(0, 10));
    };

    const fetchMovieDetails = (movieTitle) => {
        fetch(`http://186.113.234.239:3001/api/movie-details/${movieTitle}`)
            .then(res => res.json())
            .then(data => setDetailedMovieStats(data))
            .catch(err => console.error(err));
    };


    const chartData = {
        labels: filteredMovieData.map(movie => movie.winner),
        datasets: [{
            label: 'Number of Wins',
            data: filteredMovieData.map(movie => movie.count),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            y: { beginAtZero: true, type: 'linear' },
            x: { type: 'category' }
        },
        onClick: (e, element) => {
            if (element.length > 0) {
                const index = element[0].index;
                const movieTitle = filteredMovieData[index].winner;
                fetchMovieDetails(movieTitle);
            }
        }
    };


    return (
        <div className="popular-movies-dashboard">
            <h2>Popular Movies Dashboard</h2>
            <div className="dashboard-controls">
                <button onClick={showTopWinners}>Show Top Winners</button>
                <button onClick={showTopLosers}>Show Top Losers</button>
            </div>
            <Bar data={chartData} options={options} />
            {detailedMovieStats && (
                <div className="movie-details">
                    <h3>Details for {detailedMovieStats.title}</h3>
                    <p>Wins: {detailedMovieStats.wins}</p>
                    <p>Losses: {detailedMovieStats.losses}</p>
                </div>
            )}

            <BackToDashboardButton />
        </div>
    );

};

export default PopularMoviesDashboard;
