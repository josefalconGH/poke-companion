// Purpose: Moves model
const { Schema, model } = require("mongoose");

// create moves schema
const movesSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  power: {
    type: Number,
    required: true,
  },
  accuracy: {
    type: Number,
    required: true,
  },
  pp: {
    type: Number,
    required: true,
  },
  effect: {
    type: String,
    required: true,
    trim: true,
  },
  probability: {
    type: Number,
    required: true,
  },
});

// create moves model and export
const Moves = model("Moves", movesSchema);
module.exports = Moves;
