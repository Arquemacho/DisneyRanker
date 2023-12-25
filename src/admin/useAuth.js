import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'Nicocam2001.';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (inputPassword) => {
        console.log("Attempting to validate password");
        if (inputPassword === ADMIN_PASSWORD) {
            console.log("Password correct, navigating to admin");
            setIsAuthenticated(true);
            navigate('/admin');
            setError('');
        } else {
            console.log("Password incorrect");
            setError('Incorrect password. Please try again.');
        }
    };


    return { isAuthenticated, validatePassword, error };
};

export default useAuth;
