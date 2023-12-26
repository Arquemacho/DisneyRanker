// BackToDashboardButton.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import './admin.css'; // Assuming your styles are defined here

const BackToDashboardButton = () => {
    const history = useHistory();

    const navigateToDashboard = () => {
        history.push('/admin'); // Update with your admin dashboard route
    };

    return (
        <button onClick={navigateToDashboard} className="dashboard-button">
            Back to Dashboard
        </button>
    );
};

export default BackToDashboardButton;
