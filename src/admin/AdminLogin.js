import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const { isAuthenticated, validatePassword, error } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (validatePassword(password)) {
            navigate('/admin');
        }
    };


    return (
        <div>
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Admin Password"
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AdminLogin;
