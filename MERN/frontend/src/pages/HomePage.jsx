import React, { useEffect, useState, useContext } from 'react';
import RecipeCard from '../components/RecipeCard';
import { RecipeContext } from '../context/RecipeContext';
import '../styles/HomePage.css';

const Home = () => {
  const { recipes, fetchRecipes, error, loading } = useContext(RecipeContext);
  const [topRecipes, setTopRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);

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
    if (recipes.length > 0) {
      setTopRecipes(recipes.slice(0, 4));
      const shuffledRecipes = [...recipes].sort(() => 0.5 - Math.random());
      setRandomRecipes(shuffledRecipes.slice(0, 4));
    }
  }, [recipes]);

  return (
    <div className="home-container-unique">
      {/* Intro Section */}
      <section className="intro-section-unique">
        <div className="content-container-unique">
          <h1>Cooking Made Fun and Easy: Unleash Your Inner Chef</h1>
          <p>Explore a world of flavors, from classic Pakistani dishes to modern recipes that will transform your kitchen experience.</p>
          <p>Whether you are looking for a quick snack or a gourmet meal, we've got something for every occasion.</p>
          <button className="cta-button-unique" onClick={() => window.location.href = '/roulette'}>Try Recipe Roulette</button>
          <button className="cta-button-unique" onClick={() => window.location.href = '/browse'}>Browse All Recipes</button>
        </div>
      </section>

      {/* Top 10 Recipes Section */}
      <section className="top-recipes-section-unique">
        <div className="content-container-unique">
          <div className="section-header-unique">
            <h2>Famous Recipes</h2>
            <button className="cta-button-unique" onClick={() => window.location.href = '/browse'}>See All</button>
          </div>
          {loading ? (
            <p>Loading recipes...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="recipes-container-unique">
              {topRecipes.map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Random Recipes Section */}
      <section className="random-recipes-section-unique">
        <div className="content-container-unique">
          <div className="section-header-unique">
            <h2>Discover Random Recipes</h2>
            <button className="cta-button-unique" onClick={() => window.location.href = '/browse'}>See All</button>
          </div>
          {loading ? (
            <p>Loading recipes...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="recipes-container-unique">
              {randomRecipes.map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section-unique">
        <div className="content-container-unique">
          <div className="content-box-unique">
            <h2>About Us</h2>
            <p>
              Welcome to our recipe platform! We are passionate about connecting
              people with delicious, nutritious, and easy-to-make meals. Our goal is
              to make cooking fun, accessible, and stress-free for everyone, whether
              you're a seasoned chef or just starting in the kitchen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;