import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const Roulette = lazy(() => import('./pages/Roulette'));
const BrowseRecipes = lazy(() => import('./pages/BrowseRecipes'));
const RecipePage = lazy(() => import('./pages/RecipePage'));
const FavoritePage = lazy(() => import('./pages/FavoritePage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));

const App = () => {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Router>
          <NavBar />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/roulette" element={<Roulette />} />
              <Route path="/browse" element={<BrowseRecipes />} />
              <Route path="/recipes/:id" element={<RecipePage />} />
              <Route path="/favorites" element={<FavoritePage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;