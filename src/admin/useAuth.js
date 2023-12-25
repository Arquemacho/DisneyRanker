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
            return true; // Indicate successful validation
        } else {
            setError('Incorrect password. Please try again.');
            return false; // Indicate failed validation
        }
    };

    return { isAuthenticated, validatePassword, error };
};

export default useAuth;
