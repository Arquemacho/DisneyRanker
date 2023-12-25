import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'Nicocam2001.';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (inputPassword) => {
        if (inputPassword === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            navigate('/admin');
            setError('');
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    return { isAuthenticated, validatePassword, error };
};

export default useAuth;
