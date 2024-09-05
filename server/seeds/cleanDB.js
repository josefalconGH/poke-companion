// Purpose: Clean the database
import { Pokedex, User } from "../models/index.js";
import db from "../config/connection.js";

export const cleanDB = async (model) => {
  try {
    const collectionName = model.collection.name; // Get the collection name from the model

    // Check if the collection exists
    const collectionExists = await db.db
      .listCollections({ name: collectionName })
      .hasNext();

    if (collectionExists) {
      await model.collection.drop(); // Drop the collection if it exists
      console.log(`${collectionName} collection dropped.`);
    } else {
      console.log(`${collectionName} collection does not exist.`);
    }
  } catch (err) {
    console.error("Error dropping collection:", err);
    throw err;
  }
};
