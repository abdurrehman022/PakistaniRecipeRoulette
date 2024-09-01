import React, { useState } from 'react';
import '../styles/RoulettePage.css';

const RoulettePage = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredients.split(',').map(ing => ing.trim()) }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result.success) {
        setRecipe(result.data);
      } else {
        throw new Error('No recipes found for the provided ingredients');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="roulette-page">
      <h1>Recipe Roulette</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ingredients">Enter Ingredients (comma separated):</label>
        <input
          type="text"
          id="ingredients"
          value={ingredients}
          onChange={handleInputChange}
          placeholder="e.g., chicken, rice, tomatoes"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Find Recipe'}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {recipe && (
        <div className="recipe-result">
          <h2>Recipe Found:</h2>
          <div className="recipe-card">
            <img src={recipe.imageurl} alt={recipe.recipename} />
            <h3>{recipe.recipename}</h3>
            <p>{recipe.description}</p>
            <span>Prep Time: {recipe.preptime} mins</span>
            <span>Cook Time: {recipe.cooktime} mins</span>
            <span>Difficulty: {recipe.difficulty}</span>
            <a href={`/recipes/${recipe._id.$oid}`} className="view-recipe-button">View Recipe</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoulettePage;
