const Recipe = require('../models/Recipe');
const { validationResult } = require('express-validator');

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json({ success: true, data: recipes });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    res.json({ success: true, data: recipe });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Search recipes by ingredients
exports.searchRecipesByIngredients = async (req, res) => {
  const { ingredients } = req.body;  // Assume ingredients are passed as an array in the request body

  if (!ingredients || ingredients.length < 1 || ingredients.length > 10) {
    return res.status(400).json({ success: false, message: 'Please provide between 1 and 10 ingredients' });
  }

  try {
    const recipes = await Recipe.find({ ingredients: { $all: ingredients } });

    if (recipes.length === 0) {
      return res.status(404).json({ success: false, message: 'No recipes found with the given ingredients' });
    }

    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    res.json({ success: true, data: randomRecipe });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};
