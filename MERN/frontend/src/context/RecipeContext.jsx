import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create Recipe Context
export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // API URL from .env file
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all recipes
  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/recipes`);
      setRecipes(response.data.data); // Update based on API response structure
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to fetch recipes'}`);
      } else if (err.request) {
        setError('Error: No response received from server');
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchRecipes(); // Fetch recipes when component mounts
  }, [fetchRecipes]); // Dependency on fetchRecipes

  // Fetch a single recipe by ID
  const fetchRecipeById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/recipes/${id}`);
      return response.data.data; // Adjust based on your API response
    } catch (err) {
      console.error('Error fetching recipe by ID:', err);
      throw new Error(`Error fetching recipe by ID: ${err.message}`);
    }
  };

  // Search recipes by ingredients
  const searchRecipesByIngredients = async (ingredients) => {
    try {
      const response = await axios.post(`${API_URL}/api/recipes/search`, { ingredients });
      return response.data.data; // Adjust based on your API response
    } catch (err) {
      console.error('Error searching recipes by ingredients:', err);
      throw new Error(`Error searching recipes by ingredients: ${err.message}`);
    }
  };

  // Add a recipe to favorites
  const addFavoriteRecipe = async (recipeId, token) => {
    try {
      await axios.post(
        `${API_URL}/api/users/favourites`,
        { recipeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorites((prevFavorites) => [...prevFavorites, recipeId]); // Update favorites state
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to add recipe to favorites'}`);
      } else if (err.request) {
        setError('Error: No response received from server');
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error('Error adding recipe to favorites:', err);
    }
  };

  // Remove a recipe from favorites
  const removeFavoriteRecipe = async (recipeId, token) => {
    try {
      await axios.delete(`${API_URL}/api/users/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { recipeId },
      });
      setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== recipeId)); // Update favorites state
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to remove recipe from favorites'}`);
      } else if (err.request) {
        setError('Error: No response received from server');
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error('Error removing recipe from favorites:', err);
    }
  };

  // Fetch user's favorite recipes
  const fetchFavoriteRecipes = useCallback(async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/users/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.headers['content-type'].includes('application/json')) {
        throw new Error('Invalid response format');
      }

      setFavorites(response.data.data); // Adjust based on your API response
      setError(null);
      return response.data.data; // Return the favorite recipes
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to fetch favorite recipes'}`);
      } else if (err.request) {
        setError('Error: No response received from server');
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error('Error fetching favorite recipes:', err);
      throw err; // Rethrow the error to be caught in the component
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  return (
    <RecipeContext.Provider value={{ recipes, favorites, fetchRecipes, fetchRecipeById, searchRecipesByIngredients, addFavoriteRecipe, removeFavoriteRecipe, fetchFavoriteRecipes, error, loading }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
