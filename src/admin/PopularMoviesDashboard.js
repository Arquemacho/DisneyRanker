import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Chart, Bar } from 'react-chartjs-2';
import './admin.css'; // Import the CSS file
import BackToDashboardButton from './BackToDashboardButton';


const PopularMoviesDashboard = () => {
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        fetch('http://186.113.234.239:3001/api/popular-movies')
            .then(res => res.json())
            .then(data => setMovieData(data))
            .catch(err => console.error(err));
    }, []);

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

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                type: 'linear',
            },
            x: {
                type: 'category',
            }
        }
    };

    return (
        <div className="popular-movies-dashboard">
            <h2>Popular Movies Dashboard</h2>
            <Bar data={chartData} options={options} />
            <BackToDashboardButton />
        </div>
    );
};

export default PopularMoviesDashboard;
