import React, { useEffect, useState } from 'react';
import './admin.css'; // Import the CSS file
import BackToDashboardButton from './BackToDashboardButton';
const UserStats = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetch('http://186.113.234.239:3001/api/user-stats')
            .then(res => res.json())
            .then(data => {
                // Handle the data
                setStats(data);
            })
            .catch(err => console.error(err));
    }, []);
    

    return (
        <div className="user-stats">
            <h2>User Statistics</h2>
            <p>Total Tournaments: {stats.totalTournaments}</p>
            <p>Average Rounds per Tournament: {stats.averageRoundsPerTournament}</p>
            <BackToDashboardButton />
        </div>
    );
};

export default UserStats;