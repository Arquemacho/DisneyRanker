import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Go up one directory level
import './admin.css'; // Import the CSS file
import BackToDashboardButton from './BackToDashboardButton'; // Correct path as per your project structure

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const { isAuthenticated, validatePassword, error } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = () => {
        validatePassword(password);
    };

    return (
        <div className="admin-login">
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Admin Password"
                className="input-field"
            />
            <button onClick={handleLogin} className="action-button">Login</button>
            {error && <p className="error-text">Error: {error}</p>}
        </div>
    );
};

export default AdminLogin;
