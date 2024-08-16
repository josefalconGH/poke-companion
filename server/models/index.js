// Purpose: Export all models in one place
const User = require("./User");
const Pokemon = require("./Pokemon");
const GenEvoChain = require("./GenEvoChain");
const PokemonLocation = require("./PokemonLocation");
const TypeEffectiveness = require("./TypeEffectiveness");
const Moves = require("./Moves");
const Items = require("./Items");

// export all models
module.exports = {
  User,
  Pokemon,
  GenEvoChain,
  PokemonLocation,
  TypeEffectiveness,
  Moves,
  Items,
};
