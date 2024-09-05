import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import Roulette from './pages/Roulette';
import BrowseRecipes from './pages/BrowseRecipes';
import RecipePage from './pages/RecipePage';
import FavoritePage from './pages/FavoritePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TestRecipePage from './pages/TestRecipePage';
import TestAuthPage from './pages/TestAuthPage';

const App = () => {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/roulette" element={<Roulette />} />
            <Route path="/browse" element={<BrowseRecipes />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/test-recipe" element={<TestRecipePage />} />
            <Route path="/test-auth" element={<TestAuthPage />} />
          </Routes>
          <Footer />
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;