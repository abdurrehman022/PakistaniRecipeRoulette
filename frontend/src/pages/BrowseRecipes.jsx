import React, { useEffect, useState, useContext } from 'react';
import RecipeCard from '../components/RecipeCard';
import { RecipeContext } from '../context/RecipeContext';
import '../styles/BrowseRecipes.css';

const BrowseRecipes = () => {
  const { recipes, fetchRecipes, error, loading } = useContext(RecipeContext);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRecipes();
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    };

    fetchData();
  }, [fetchRecipes]);

  useEffect(() => {
    setDisplayedRecipes(recipes.slice(0, visibleCount));
  }, [recipes, visibleCount]);

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  return (
    <div className="browse-container-unique">
      {/* Intro Section */}
      <section className="browse-intro-section-unique">
        <div className="content-container-unique">
          <h1>Browse Our Collection of Recipes</h1>
          <p>Discover a variety of delicious recipes to suit every taste and occasion.</p>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="browse-recipes-section-unique">
        <div className="content-container-unique">
          {loading ? (
            <p>Loading recipes...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="recipes-container-unique">
              {displayedRecipes.map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
          {visibleCount < recipes.length && (
            <button className="view-more-button-unique" onClick={handleViewMore}>View More</button>
          )}
        </div>
      </section>
    </div>
  );
};

export default BrowseRecipes;