// Purpose: Export all models in one place
const User = require("./User");
const Pokemon = require("./Pokemon");
const TypeEffectiveness = require("./TypeEffectiveness");
const Moves = require("./Moves");
const Items = require("./Items");

// export all models
module.exports = {
  User,
  Pokemon,
  TypeEffectiveness,
  Moves,
  Items,
};
