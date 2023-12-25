import React, { useState } from 'react';
import useAuth from './useAuth';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const { validatePassword } = useAuth();

    const handleLogin = () => {
        validatePassword(password);
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
        </div>
    );
};

export default AdminLogin;
