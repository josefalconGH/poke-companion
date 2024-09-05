// Purpose: server.js file to start the server and connect to the database
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { typeDefs, resolvers } from "./schemas/index.js";
import db from "./config/connection.js";
import cors from "cors";

// set up __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// start the ApolloServer
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.authorization || "",
      }),
    })
  );

  // serve client/build as static files
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // serve Pokémon data from data-pokemon.json
  app.get("/api/pokedex", (req, res) => {
    const filePath = path.join(__dirname, "seeds", "data-pokedex.json");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading data-pokedex.json:", err);
        return res.status(500).json({ error: "Failed to load Pokémon data" });
      }

      try {
        const pokemonData = JSON.parse(data);
        res.json(pokemonData);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        res.status(500).json({ error: "Invalid JSON format" });
      }
    });
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
