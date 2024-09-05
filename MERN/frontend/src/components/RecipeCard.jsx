import React, { useState, useEffect, useContext } from 'react';
import '../styles/RecipeCard.css';
import { FaClock, FaUtensils, FaSignal, FaHeart } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { RecipeContext } from '../context/RecipeContext';
import ErrorNotification from './ErrorNotification';

const RecipeCard = ({ recipe }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const { authToken, user } = useContext(AuthContext);
  const { addFavoriteRecipe, removeFavoriteRecipe, favorites } = useContext(RecipeContext);
  const [isFavorited, setIsFavorited] = useState(favorites.includes(recipe._id));

  useEffect(() => {
    setIsFavorited(favorites.includes(recipe._id)); // Update when favorites change
  }, [favorites, recipe._id]);

  const toggleFavorite = async () => {
    if (user) {
      try {
        if (isFavorited) {
          await removeFavoriteRecipe(recipe._id, authToken);
        } else {
          await addFavoriteRecipe(recipe._id, authToken);
        }
      } catch (err) {
        console.error('Failed to update favorite status:', err);
        setErrorMessage('Failed to update favorite status');
      }
    } else {
      setErrorMessage('Please log in to add recipes to favorites');
    }
  };

  return (
    <div className="recipe-card">
      <img src={recipe.imageurl} alt={recipe.recipename} className="recipe-image" />
      <FaHeart 
        className={`heart-icon ${isFavorited ? 'filled' : ''}`} 
        onClick={toggleFavorite} 
      />
      <div className="recipe-details">
        <div className="info-item">
          <FaClock className="icon" /> {recipe.preptime} Mins
        </div>
        <div className="info-item">
          <FaUtensils className="icon" /> {recipe.servings} Servings
        </div>
        <div className="info-item">
          <FaSignal className="icon" /> {recipe.difficulty}
        </div>
      </div>
      <div className="recipe-content">
        <h2 className="recipe-title">{recipe.recipename}</h2>
        <div className="recipe-actions">
          <a href={`/recipes/${recipe._id}`} className="view-recipe">View Recipe</a>
        </div>
      </div>
      {errorMessage && <ErrorNotification message={errorMessage} />}
    </div>
  );
};

export default RecipeCard;