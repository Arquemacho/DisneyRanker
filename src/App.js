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
                <Route path="/" element={<LandingPage />} />
                <Route path="/selection" element={<MovieSelectionScreen />} />
                <Route path="/tournament" element={<Tournament />} />
                <Route path="/ranking" element={<Ranking />} />
            </Routes>
        </Router>
    );
};

export default App;
