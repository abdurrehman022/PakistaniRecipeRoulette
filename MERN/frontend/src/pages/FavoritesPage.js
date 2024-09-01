import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import '../styles/FavoritesPage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/favourites`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result); // Log data to verify its structure
        setFavorites(Array.isArray(result.data) ? result.data : []); // Ensure data is an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="favorites-page">
      <h2>Favorite Recipes</h2>
      <div className="recipe-cards-container">
        {favorites.length > 0 ? (
          favorites.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
        ) : (
          <div>No favorite recipes available</div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
