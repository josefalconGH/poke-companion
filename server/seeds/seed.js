// Purpose: Seed the databse
const db = require("../config/connection");
const cleanDB = require("./cleanDB");

const pokemonData = require("./data-pokemon.json");
const typeEffectivenessData = require("./data-type-effectiveness.json");
const itemData = require("./data-items.json");
const moveData = require("./data-moves.json");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});
