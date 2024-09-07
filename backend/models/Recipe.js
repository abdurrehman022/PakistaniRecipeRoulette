const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipename: { type: String, required: true },
  description: { type: String, required: true },
  servings: { type: Number, required: true },
  preptime: { type: Number, required: true },
  cooktime: { type: Number, required: true },
  totaltime: { type: Number, required: true },
  difficulty: { type: String, required: true },
  type: { type: String, required: true },
  cuisine: { type: String, required: true },
  prepmethods: { type: String, required: true },
  calories: { type: Number, required: true },
  steps: { type: [String], required: true },
  ingredients: { type: [String], required: true },
  imageurl: { type: String, required: true }
});

module.exports = mongoose.model('Recipe', recipeSchema);
