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
        } else {
            setIsAuthenticated(false);
            setError('Incorrect password. Please try again.');
            console.log('Error set:', 'Incorrect password. Please try again.'); // For debugging
        }
    };    

    return { isAuthenticated, validatePassword, error };
};

export default useAuth;
