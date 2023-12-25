import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'Nicocam2001.';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            console.log("Navigating to admin dashboard");
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);


    const validatePassword = (inputPassword) => {
        console.log("Validating password", inputPassword);
        if (inputPassword === ADMIN_PASSWORD) {
            console.log("Password is correct");
            setIsAuthenticated(true);
            setError('');
        } else {
            console.log("Password is incorrect");
            setError('Incorrect password. Please try again.');
        }
    };


    return { isAuthenticated, validatePassword, error };
};

export default useAuth;
