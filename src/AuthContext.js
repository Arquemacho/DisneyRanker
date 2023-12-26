import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const ADMIN_PASSWORD = 'Nicocam2001.'; // Replace with your actual admin password

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const validatePassword = (inputPassword) => {
        // Assuming ADMIN_PASSWORD is imported or defined here
        if (inputPassword === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, validatePassword }}>
            {children}
        </AuthContext.Provider>
    );
};
