import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import RoulettePage from './pages/RoulettePage';  // Add this import
import RecipesPage from './pages/RecipesPage';  // Add this import
import LoginPage from './pages/LoginPage';  // Add this import
import RegisterPage from './pages/RegisterPage';  // Add this import
import FavoritesPage from './pages/FavoritesPage';  // Add this import
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roulette" element={<RoulettePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
