// Purpose: Seed the database
import mongoose from "mongoose";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { cleanDB } from "./cleanDB.js";
import Pokedex from "../models/Pokedex.js";

// get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// mongoDB connection
import db from "../config/connection.js";

db.once("open", async () => {
  try {
    // clean the database for the Pokedex collection
    await cleanDB(Pokedex);

    // load the data-pokedex.json file
    const pokedexDataPath = path.join(__dirname, "data-pokedex.json");
    const pokedexData = JSON.parse(await readFile(pokedexDataPath, "utf8"));

    // seed the Pokedex collection with the data from the JSON file
    await Pokedex.insertMany(pokedexData);
    console.log("Pokedex data successfully seeded!");

    // close the database connection after seeding
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding the database:", err);
    throw new Error(err);
  }
});
