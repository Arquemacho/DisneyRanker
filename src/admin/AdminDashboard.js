// AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    console.log("Rendering AdminDashboard"); // Add for debugging
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/admin/movies">Manage Movies</Link></li>
                    <li><Link to="/admin/stats">User Statistics</Link></li>
                    <li><Link to="/admin/device-usage">Device Usage</Link></li>
                    <li><Link to="/admin/popular-movies">Popular Movies Dashboard</Link></li>
                    <li><Link to="/admin/matchups">Matchup Analysis</Link></li>
                    {/* Add more links as needed */}
                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboard;
