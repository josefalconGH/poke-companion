// Purpose: GenEvoChain model
const { Schema, model } = require("mongoose");

// create evolutionStep schema
const evolutionStepSchema = new Schema({
  species_name: {
    type: String,
    required: true,
    trim: true,
  },
  evolves_to: {
    type: [String],
    default: [],
  },
});

// create genEvoChain schema
const genEvoChainSchema = new Schema({
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
  generation: {
    type: String,
    required: true,
    trim: true,
  },
  evolution_chain: {
    type: [evolutionStepSchema],
    default: [],
    required: true,
  },
});

// create genEvoChain model and export
const GenEvoChain = model("GenEvoChain", genEvoChainSchema);
module.exports = GenEvoChain;
