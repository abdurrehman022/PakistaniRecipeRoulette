import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import ErrorNotification from '../components/ErrorNotification';
import '../styles/FavoritePage.css';

const FavoritePage = () => {
  const { authToken, user, error: authError, loading: authLoading } = useContext(AuthContext);
  const { fetchFavoriteRecipes, error: recipeError, loading: recipeLoading } = useContext(RecipeContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      if (authToken) {
        try {
          const favoriteRecipes = await fetchFavoriteRecipes(authToken);
          setFavoriteRecipes(favoriteRecipes);
        } catch (err) {
          console.error('Error fetching favorite recipes:', err);
          setErrorMessage('Failed to fetch favorite recipes');
        }
      } else {
        setErrorMessage('User is not authenticated');
      }
    };

    fetchFavorites();
  }, [authToken, fetchFavoriteRecipes]);

  if (!authToken) {
    return (
      <div className="favorite-container">
        <section className="favorite-intro-section">
          <div className="content-container">
            <h1>Please Log In</h1>
            <p>You need to log in to view your favorite recipes.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="favorite-container">
      {errorMessage && <ErrorNotification message={errorMessage} />}
      <section className="favorite-intro-section">
        <div className="content-container">
          <h1>Your Favorite Recipes</h1>
          <p>Here are the recipes you have marked as your favorites.</p>
        </div>
      </section>

      <section className="favorite-recipes-section">
        <div className="content-container">
          {recipeLoading ? (
            <p>Loading recipes...</p>
          ) : recipeError ? (
            <p>{recipeError}</p>
          ) : (
            <div className="recipes-container">
              {favoriteRecipes.length > 0 ? (
                favoriteRecipes.map(recipe => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))
              ) : (
                <p>You have no favorite recipes yet.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FavoritePage;