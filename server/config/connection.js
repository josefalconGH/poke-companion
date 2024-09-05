// Purpose: Connect to MongoDB
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pokecompanion"
);

const connection = mongoose.connection;
export default connection;
