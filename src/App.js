import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import MovieSelectionScreen from './MovieSelectionScreen';
import Tournament from './Tournament';
import Ranking from './Ranking';
import PrivateRoute from './PrivateRoute'; // Adjust the path as needed
import AdminDashboard from './AdminDashboard'; // Adjust the path as needed
import MoviesManagement from './MoviesManagement'; // Adjust the path as needed
import UserStats from './UserStats'; // Adjust the path as needed
import DeviceUsage from './DeviceUsage'; // Adjust the path as needed

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MovieSelectionScreen />} />
                <Route path="/selection" element={<MovieSelectionScreen />} />
                <Route path="/tournament" element={<Tournament />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                <Route path="/admin/movies" element={<PrivateRoute><MoviesManagement /></PrivateRoute>} />
                <Route path="/admin/stats" element={<PrivateRoute><UserStats /></PrivateRoute>} />
                <Route path="/admin/device-usage" element={<PrivateRoute><DeviceUsage /></PrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
