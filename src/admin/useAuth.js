// useAuth.js
import { useState } from 'react';

const ADMIN_PASSWORD = 'Nicocam2001.'; // Your desired password

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const validatePassword = (inputPassword) => {
        if (inputPassword === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        }
    };

    return { isAuthenticated, validatePassword };
};

export default useAuth;
