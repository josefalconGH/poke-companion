// Purpose: Pokemon model
const { Schema, model } = require("mongoose");

// create pokemon schema
const pokemonSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sprite: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: [String],
    required: true,
  },
  hp: {
    type: Number,
    required: true,
  },
  attack: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  special_attack: {
    type: Number,
    required: true,
  },
  special_defense: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

// create pokemon model and export
const Pokemon = model("Pokemon", pokemonSchema);
module.exports = Pokemon;
