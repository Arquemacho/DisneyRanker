import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';
import AdminLogin from './AdminLogin';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return isAuthenticated ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;
