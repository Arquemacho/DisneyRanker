import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'Nicocam2001.';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    const validatePassword = (inputPassword) => {
        if (inputPassword === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
            // Remove the navigate call here
        } else {
            setError('Incorrect password. Please try again.');
        }
    };


    return { isAuthenticated, validatePassword, error };
};

export default useAuth;
