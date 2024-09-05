import React, { useState, useContext } from 'react';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorNotification from '../components/ErrorNotification';
import IngredientDropdown from '../components/IngredientDropdown';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/Roulette.css'; // Use a separate CSS file for RoulettePage

const Roulette = () => {
  const { searchRecipesByIngredients, error, loading } = useContext(RecipeContext);
  const { authToken } = useContext(AuthContext);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectIngredients = (ingredients) => {
    setSelectedIngredients(ingredients.map(ingredient => ingredient.value));
  };

  const spinRoulette = async () => {
    if (selectedIngredients.length === 0) {
      setErrorMessage('Please select at least one ingredient.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ ingredients: selectedIngredients })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Log the response to debug
      const recipe = data.data;

      if (recipe) {
        setRandomRecipe(recipe);
        console.log('Selected Recipe:', recipe); // Log the selected recipe
        setErrorMessage('');
      } else {
        setErrorMessage('No recipes found with the selected ingredients.');
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setErrorMessage('Failed to fetch recipes. Please try again.');
    }
  };

  return (
    <div className="roulette-container">
      {/* Header Section */}
      <section className="header-section">
        <div className="header-content">
          <h1>Recipe Roulette</h1>
          <p>Discover a recipe from our database of 200+ Pakistani recipes of different cuisines and types.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="content-container">
          <h2>How It Works</h2>
          <p>Our Recipe Roulette feature allows you to discover new recipes based on the ingredients you have on hand. Simply select up to 10 ingredients from the dropdown menu and click "Spin the Roulette!" to get a random recipe suggestion from our extensive database of Pakistani recipes.</p>
          <p>Whether you're in the mood for a traditional dish or something more modern, our Recipe Roulette has something for everyone. Try it now and explore the rich culinary heritage of Pakistan!</p>
        </div>
      </section>

      {/* Feature Description Section */}
      <section className="feature-description-section">
        <div className="content-container">
          <p>Select up to 10 ingredients and spin the roulette to find a recipe!</p>
          <IngredientDropdown onSelectIngredients={handleSelectIngredients} />
          <button className="cta-button" onClick={spinRoulette}>Spin the Roulette!</button>
        </div>
      </section>

      {/* Recipe Result Section */}
      <section className="recipe-result-section">
        <div className="content-container">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorNotification message={error} />
          ) : errorMessage ? (
            <ErrorNotification message={errorMessage} />
          ) : (
            randomRecipe && (
              <>
                <RecipeCard recipe={randomRecipe} />
                <button className="cta-button" onClick={spinRoulette}>Try Again!</button>
              </>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Roulette;