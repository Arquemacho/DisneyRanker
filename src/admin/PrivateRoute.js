// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from './useAuth'; // Update this path
import AdminLogin from './AdminLogin'; // Path to your AdminLogin component

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return children;
};

export default PrivateRoute;
