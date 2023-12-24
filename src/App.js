import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import MovieSelectionScreen from './MovieSelectionScreen';
import Tournament from './Tournament';
import Ranking from './Ranking';

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
