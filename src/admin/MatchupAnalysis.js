import React, { useEffect, useState } from 'react';
import './admin.css'; // Import the CSS file
import BackToDashboardButton from './BackToDashboardButton';

const MatchupAnalysis = () => {
    const [matchupData, setMatchupData] = useState([]);

    useEffect(() => {
        fetch('http://186.113.234.239:3001/api/common-matchups')
            .then(res => res.json())
            .then(data => setMatchupData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="matchup-analysis">
            <h2>Matchup Analysis</h2>
            <ul className="data-list">
                {matchupData.map((matchup, index) => (
                    <li key={index} className="data-item">
                        {matchup.winner} vs {matchup.loser}: {matchup.count} times
                    </li>
                ))}
            </ul>
            <BackToDashboardButton />
        </div>
    );
};

export default MatchupAnalysis;
