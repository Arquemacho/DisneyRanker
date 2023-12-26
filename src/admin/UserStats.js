import React, { useEffect, useState } from 'react';

const UserStats = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetch('http://localhost:3001/api/user-stats')
            .then(res => res.json())
            .then(data => {
                // Handle the data
                setStats(data);
            })
            .catch(err => console.error(err));
    }, []);
    

    return (
        <div>
            <h2>User Statistics</h2>
            <p>Total Tournaments: {stats.totalTournaments}</p>
            <p>Average Rounds per Tournament: {stats.averageRoundsPerTournament}</p>
            {/* Display more stats as needed */}
        </div>
    );
};

export default UserStats;
