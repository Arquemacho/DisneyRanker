import React from 'react';
import { Link } from 'react-router-dom';
import './admin.css'; // Import the CSS file
import BackToDashboardButton from './BackToDashboardButton'; // Correct path as per your project structure

const AdminDashboard = () => {
    console.log("Rendering AdminDashboard");
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <nav className="admin-nav">
                <ul>
                    <li><Link to="/admin/movies" className="nav-link">Manage Movies</Link></li>
                    <li><Link to="/admin/stats" className="nav-link">User Statistics</Link></li>
                    <li><Link to="/admin/device-usage" className="nav-link">Device Usage</Link></li>
                    <li><Link to="/admin/popular-movies" className="nav-link">Popular Movies Dashboard</Link></li>
                    <li><Link to="/admin/matchups" className="nav-link">Matchup Analysis</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboard;
