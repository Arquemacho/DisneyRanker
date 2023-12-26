// Use useNavigate instead of useHistory
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const BackToDashboardButton = () => {
    const navigate = useNavigate();

    const navigateToDashboard = () => {
        navigate('/admin'); // Update to correct admin dashboard route
    };

    return (
        <button onClick={navigateToDashboard} className="dashboard-button">
            Back to Dashboard
        </button>
    );
};

export default BackToDashboardButton;
