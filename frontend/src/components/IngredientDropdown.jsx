import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../styles/IngredientDropdown.css'; // Import the CSS file

const IngredientDropdown = ({ onSelectIngredients }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipes`);
        const recipes = response.data.data;

        // Extract ingredients and remove duplicates
        const ingredientsSet = new Set();
        recipes.forEach(recipe => {
          recipe.ingredients.forEach(ingredient => {
            ingredientsSet.add(ingredient);
          });
        });

        // Convert Set to array of objects for react-select
        const uniqueIngredients = Array.from(ingredientsSet).map(ingredient => ({
          value: ingredient,
          label: ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
        }));

        setOptions(uniqueIngredients);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <Select
      isMulti
      name="ingredients"
      options={options}
      className="ingredient-dropdown"
      classNamePrefix="react-select"
      onChange={onSelectIngredients}
      maxMenuHeight={150}
      placeholder="Select up to 10 ingredients"
    />
  );
};

export default IngredientDropdown;