import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleViewDetails = () => {
    if (isMounted.current) {
      navigate(`/recipes/${recipe._id.$oid}`); // Navigate to the recipe details page
    }
  };

  const handleAddToFavorites = () => {
    if (isMounted.current) {
      // Add to favorites functionality here
      console.log('Add to favorites:', recipe._id.$oid);
    }
  };

  if (!recipe) {
    console.log('No recipe data available');
    return null;
  }

  console.log('Rendering RecipeCard with recipe:', recipe);

  return (
    <div className="recipe-card">
      <img src={recipe.imageurl} alt={recipe.recipename} className="recipe-card-image" />
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.recipename}</h3>
        <div className="recipe-card-details">
          <span>Prep Time: {recipe.preptime} mins</span>
          <span>Cook Time: {recipe.cooktime} mins</span>
          <span>Difficulty: {recipe.difficulty}</span>
        </div>
        <button className="recipe-card-btn" onClick={handleViewDetails}>View Details</button>
        <button className="recipe-card-btn" onClick={handleAddToFavorites}>Add to Favorites</button>
      </div>
    </div>
  );
};

export default RecipeCard;