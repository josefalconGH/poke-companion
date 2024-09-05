// Purpose: Pokedex model
import { Schema, model } from "mongoose";

// create pokemon schema
const pokedexSchema = new Schema(
  {
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
    species: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: [String],
      required: true,
    },
    abilities: {
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
    appears_in: [
      {
        game_version: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: "pokedex" }
);

// export pokemon model using ES module syntax
export default model("Pokedex", pokedexSchema);
