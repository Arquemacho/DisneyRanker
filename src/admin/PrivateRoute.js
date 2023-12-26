import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Go up one directory level

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    console.log("PrivateRoute, isAuthenticated:", isAuthenticated); // Add this for debugging
    return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
