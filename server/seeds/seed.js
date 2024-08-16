// Purpose: Seed the databse
const db = require("../config/connection");
const { User, Post } = require("../models");
const cleanDB = require("./cleanDB");

const pokemonData = require("./pokemon-data.json");
const pokemonGenEvoData = require("./pokemon-gen-evochain.json");
const pokemonLocationData = require("./pokemon-locations-by-region.json");
const typeEffectivenessData = require("./type-effectiveness.json");
const itemData = require("./items.json");
const moveData = require("./moves.json");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});
