import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/RecipesPage.css';

const RecipesPage = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success) {
          setRecipe(result.data);
        } else {
          throw new Error('Failed to fetch recipe');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="recipes-page">
      {recipe ? (
        <div className="recipe-detail">
          <img src={recipe.imageurl} alt={recipe.recipename} />
          <h1>{recipe.recipename}</h1>
          <p>{recipe.description}</p>
          <div className="recipe-info">
            <span>Prep Time: {recipe.preptime} mins</span>
            <span>Cook Time: {recipe.cooktime} mins</span>
            <span>Difficulty: {recipe.difficulty}</span>
            <span>Servings: {recipe.servings}</span>
            <span>Calories: {recipe.calories} kcal</span>
          </div>
          <div className="recipe-methods">
            <h3>Preparation Methods:</h3>
            <p>{recipe.prepmethods}</p>
          </div>
          <div className="recipe-steps">
            <h3>Steps:</h3>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="recipe-ingredients">
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <Link to="/" className="back-to-home">Back to Home</Link>
        </div>
      ) : (
        <div>No recipe found</div>
      )}
    </div>
  );
};

export default RecipesPage;
