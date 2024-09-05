// Purpose: Clean the database
import models from "../models/index.js";
import db from "../config/connection.js";

export const cleanDB = async (model) => {
  try {
    // check if the model's collection exists and drop it if so
    if (models[model]) {
      const collectionName = models[model].collection.name;

      const collectionExists = await db.db
        .listCollections({ name: collectionName })
        .hasNext();

      if (collectionExists) {
        await models[model].collection.drop();
        console.log(`${collectionName} collection dropped.`);
      } else {
        console.log(`${collectionName} does not exist.`);
      }
    } else {
      throw new Error(`Model ${model} does not exist.`);
    }
  } catch (err) {
    console.error("Error dropping collection:", err);
    throw err;
  }
};
