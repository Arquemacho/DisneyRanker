// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './path-to-your-auth-hook'; // Update with actual path

const PrivateRoute = ({ children }) => {
    const auth = useAuth(); // Implement this hook based on your authentication logic
    return auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
