import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import './admin.css'; // Import the CSS file

const PopularMoviesDashboard = () => {
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        fetch('http://186.113.234.239:3001/api/popular-movies')
            .then(res => res.json())
            .then(data => setMovieData(data))
            .catch(err => console.error(err));
    }, []);

    // Prepare data for Chart.js
    const chartData = {
        labels: movieData.map(movie => movie.winner),
        datasets: [{
            label: 'Number of Wins',
            data: movieData.map(movie => movie.count),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div className="popular-movies-dashboard">
            <h2>Popular Movies Dashboard</h2>
            <Chart type="bar" data={chartData} />
        </div>
    );
};

export default PopularMoviesDashboard;