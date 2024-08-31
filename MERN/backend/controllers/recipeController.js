const Recipe = require('../models/Recipe');

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
};

// Get a specific recipe
exports.getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    res.json({ recipe });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error });
  }
};

// Add a new recipe
exports.addRecipe = async (req, res) => {
  const { recipename, description, servings, preptime, cooktime, totaltime, difficulty, type, cuisine, prepmethods, calories, steps, ingredients, imageurl } = req.body;

  try {
    const newRecipe = new Recipe({
      recipename,
      description,
      servings,
      preptime,
      cooktime,
      totaltime,
      difficulty,
      type,
      cuisine,
      prepmethods,
      calories,
      steps,
      ingredients,
      imageurl
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error adding recipe', error });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { recipename, description, servings, preptime, cooktime, totaltime, difficulty, type, cuisine, prepmethods, calories, steps, ingredients, imageurl } = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, {
      recipename,
      description,
      servings,
      preptime,
      cooktime,
      totaltime,
      difficulty,
      type,
      cuisine,
      prepmethods,
      calories,
      steps,
      ingredients,
      imageurl
    }, { new: true });

    if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });

    res.json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    await Recipe.findByIdAndDelete(id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error });
  }
};
