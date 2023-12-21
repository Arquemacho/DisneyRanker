import React from 'react';
import './TournamentStyles.css';
import { useNavigate } from 'react-router-dom';
import './TournamentStyles.css';

const LandingPage = () => {
    let navigate = useNavigate();

    const navigateToSelection = (mode) => {
        navigate('/selection', { state: { mode } });
    };

    return (
        <div className="landing-page">
            {/* Logo and Header */}
            <button className="button" onClick={() => navigateToSelection('tournament')}>Iniciar</button>
           {/* <button onClick={() => navigateToSelection('ranking')}>Start Ranking</button>*/}
        </div>
    );
};

export default LandingPage;
