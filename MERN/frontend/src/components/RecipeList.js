import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('/api/recipes')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (data.success) {
          setRecipes(data.data);
        }
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  if (recipes.length === 0) {
    return <div>No recipes available</div>;
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => {
        console.log('Rendering recipe:', recipe);
        return <RecipeCard key={recipe._id.$oid} recipe={recipe} />;
      })}
    </div>
  );
};

export default RecipeList;