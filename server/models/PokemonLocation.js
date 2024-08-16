// Purpose: PokemonLocation model
const { Schema, model } = require("mongoose");

// create version schema
const versionSchema = new Schema({
  game: {
    type: String, // The game version, e.g., "firered", "red"
    required: true,
  },
  pokemon: {
    type: [String], // List of Pokémon names found in this version
    required: true,
  },
});

// create area schema
const areaSchema = new Schema({
  area_name: {
    type: String, // Name of the area, e.g., "celadon-city-area"
    required: true,
  },
  versions: {
    type: Map, // Map of version names to versionSchema
    of: versionSchema,
  },
});

// create region schema
const regionSchema = new Schema({
  region_name: {
    type: String, // Name of the region, e.g., "kanto"
    required: true,
  },
  areas: {
    type: Map, // Map of area names to areaSchema
    of: areaSchema,
  },
});

// create PokemonLocation model and export
const PokemonLocation = model("PokemonLocation", regionSchema);
module.exports = PokemonLocation;
