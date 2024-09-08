// Purpose: server.js file to start the server and connect to the database
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import path from "path";
import { fileURLToPath } from "url";
import { typeDefs, resolvers } from "./schemas/index.js";
import db from "./config/connection.js";
import cors from "cors";
import Pokedex from "./models/Pokedex.js";

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

  // serve Pokémon data from data-pokemon.json
  app.get("/api/pokedex", async (req, res) => {
    try {
      // fetch Pokédex data only necessary for pokedex-table
      const pokemonData = await Pokedex.find(
        {},
        {
          name: 1,
          id: 1,
          sprite: 1,
          type: 1,
          hp: 1,
          attack: 1,
          defense: 1,
          special_attack: 1,
          special_defense: 1,
          speed: 1,
          total: 1,
        }
      );
      res.json(pokemonData);
    } catch (err) {
      console.error("Error fetching Pokémon data from MongoDB:", err);
      res.status(500).json({ error: "Failed to load Pokémon data" });
    }
  });

  // serve client/public as static files
  app.use(express.static(path.join(__dirname, "../client/public")));

  // serve sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    res.set("Content-Type", "application/xml");
    res.sendFile(path.join(__dirname, "../client/public", "sitemap.xml"));
  });

  // serve robots.txt
  app.get("/robots.txt", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public", "robots.txt"));
  });

  // serve production build of app
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
