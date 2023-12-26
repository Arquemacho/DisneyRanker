import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Go up one directory level

// AdminLogin.js

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

    // AdminLogin.js

// ... other code ...

return (
    <div>
        <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Admin Password"
        />
        <button onClick={handleLogin}>Login</button>
        {/* <p style={{ color: 'red' }}>Error: {error}</p>  Directly display the error state */}
    </div>
);

};


export default AdminLogin;
