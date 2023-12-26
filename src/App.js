import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import MovieSelectionScreen from './MovieSelectionScreen';
import Tournament from './Tournament';
import Ranking from './Ranking';
import PrivateRoute from './admin/PrivateRoute'; // Adjust the path as needed
import AdminDashboard from './admin/AdminDashboard'; // Adjust the path as needed
import MoviesManagement from './admin/MoviesManagement'; // Adjust the path as needed
import UserStats from './admin/UserStats'; // Adjust the path as needed
import DeviceUsage from './admin/DeviceUsage'; // Adjust the path as needed
import AdminLogin from './admin/AdminLogin';
import { AuthProvider } from './AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MovieSelectionScreen />} />
                    <Route path="/selection" element={<MovieSelectionScreen />} />
                    <Route path="/tournament" element={<Tournament />} />
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/admin/movies" element={<PrivateRoute><MoviesManagement /></PrivateRoute>} />
                    <Route path="/admin/stats" element={<PrivateRoute><UserStats /></PrivateRoute>} />
                    <Route path="/admin/device-usage" element={<PrivateRoute><DeviceUsage /></PrivateRoute>} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
