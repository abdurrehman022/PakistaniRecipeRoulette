import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';
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
        {/* Intro Section */}
        <section 
          className="recipe-intro-section-unique" 
          style={{ backgroundImage: `url(${recipe.imageurl})` }} // Set background image dynamically
        >
          <div className="content-container-unique">
            <h1>{recipe.recipename}</h1>
            <p>{recipe.description}</p>
          </div>
        </section>

        {/* Recipe Details Section */}
        <section className="recipe-details-section-unique">
          <div className="content-container-unique">
            <div className="recipe-details-container-unique">
              <img src={recipe.imageurl} alt={recipe.recipename} className="recipe-image-unique" />
              <h1 className="recipe-title-unique">{recipe.recipename}</h1>
              <button 
                onClick={handleFavorite} 
                className={`recipe-favorite-button-unique ${isFavorite ? 'added' : ''}`}
              >
                {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
              </button>
              <div className="recipe-info-unique">
                <p><strong>Description:</strong> {recipe.description}</p>
                <p><strong>Preparation Time:</strong> {recipe.preptime} mins</p>
                <p><strong>Cooking Time:</strong> {recipe.cooktime} mins</p>
                <p><strong>Servings:</strong> {recipe.servings}</p>
                <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                <h3>Ingredients:</h3>
                <ul className="recipe-ingredients-list-unique">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
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