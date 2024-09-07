import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import Roulette from './pages/Roulette';
import BrowseRecipes from './pages/BrowseRecipes';
import RecipePage from './pages/RecipePage';
import FavoritePage from './pages/FavoritePage';
import AuthPage from './pages/AuthPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';


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
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
          <Footer />
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;