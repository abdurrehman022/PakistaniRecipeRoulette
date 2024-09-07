import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';
import { FaClock, FaUtensils, FaFire, FaLeaf, FaHeart, FaHeartBroken } from 'react-icons/fa';
import '../styles/RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  const { fetchRecipeById, addFavoriteRecipe, removeFavoriteRecipe, favorites } = useContext(RecipeContext);
  const { authToken } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);

  const isFavorite = favorites.includes(id); // Check if the recipe ID is in the favorites

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await fetchRecipeById(id);
        setRecipe(recipeData);
      } catch (err) {
        console.error('Error fetching recipe:', err);
      }
    };

    fetchRecipe();
  }, [id, fetchRecipeById]);

  const handleFavorite = async () => {
    if (!authToken) {
      console.error('User is not authenticated');
      return;
    }

    try {
      if (isFavorite) {
        await removeFavoriteRecipe(id, authToken);
      } else {
        await addFavoriteRecipe(id, authToken);
      }
    } catch (err) {
      console.error('Error updating favorite status:', err);
    }
  };

  return (
    recipe ? (
      <div className="recipe-container-unique">
        {/* Recipe Image and Name */}
        <div className="recipe-header-unique">
          <div className="recipe-header-content-unique">
            <h1>{recipe.recipename}</h1>
          </div>
        </div>

        {/* Recipe Details Section */}
        <section className="recipe-details-section-unique">
          <div className="content-container-unique">
            <div className="recipe-details-container-unique">
              <img src={recipe.imageurl} alt={recipe.recipename} className="recipe-image-unique" />
              <button 
                onClick={handleFavorite} 
                className={`recipe-favorite-button-unique ${isFavorite ? 'added' : ''}`}
              >
                {isFavorite ? <FaHeartBroken /> : <FaHeart />} {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <div className="recipe-info-unique">
                <div className="recipe-info-column">
                  <p><FaClock /> <strong>Preparation Time:</strong> {recipe.preptime} mins</p>
                  <p><FaClock /> <strong>Cooking Time:</strong> {recipe.cooktime} mins</p>
                  <p><FaClock /> <strong>Total Time:</strong> {recipe.totaltime} mins</p>
                  <p><FaUtensils /> <strong>Servings:</strong> {recipe.servings}</p>
                  <p><FaFire /> <strong>Calories:</strong> {recipe.calories}</p>
                </div>
                <div className="recipe-info-column">
                  <p><FaLeaf /> <strong>Difficulty:</strong> {recipe.difficulty}</p>
                  <p><FaLeaf /> <strong>Type:</strong> {recipe.type}</p>
                  <p><FaLeaf /> <strong>Cuisine:</strong> {recipe.cuisine}</p>
                  <p><FaLeaf /> <strong>Preparation Methods:</strong> {recipe.prepmethods}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients and Steps Section */}
        <section className="recipe-ingredients-steps-section-unique">
          <div className="content-container-unique">
            <div className="recipe-info-unique">
              <div className="recipe-info-column">
                <h3>Ingredients:</h3>
                <ol className="recipe-ingredients-list-unique">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ol>
              </div>
              <div className="recipe-info-column">
                <h3>Steps:</h3>
                <ol className="recipe-steps-list-unique">
                  {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </div>
    ) : (
      <p>Loading recipe...</p>
    )
  );
};

export default RecipePage;