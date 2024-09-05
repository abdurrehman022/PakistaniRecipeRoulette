import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import '../styles/TestRecipeFetch.css';

const TestRecipeFetch = () => {
  const { recipes, error, loading } = useContext(RecipeContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="recipe-container">
      {recipes.slice(0, 10).map((recipe, index) => (
        <div key={index} className="recipe-card">
          <h2 className="recipe-title">{recipe.recipename}</h2>
          <img className="recipe-image" src={recipe.imageurl} alt={recipe.recipename} />
          <p className="recipe-description">{recipe.description}</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Prep Time:</strong> {recipe.preptime} mins</p>
          <p><strong>Cook Time:</strong> {recipe.cooktime} mins</p>
          <p><strong>Total Time:</strong> {recipe.totaltime} mins</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          <p><strong>Type:</strong> {recipe.type}</p>
          <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
          <p><strong>Prep Methods:</strong> {recipe.prepmethods}</p>
          <p><strong>Calories:</strong> {recipe.calories}</p>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Steps</h3>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default TestRecipeFetch;