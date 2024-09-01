import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import '../styles/TopRecipesSection.css';

const TopRecipesSection = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log data to verify its structure
        setRecipes(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="top-recipes-section">
      <h2>Top Recipes</h2>
      <div className="recipe-cards-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id.$oid}
              recipe={recipe}
            />
          ))
        ) : (
          <div>No recipes available</div>
        )}
      </div>
    </section>
  );
};

export default TopRecipesSection;