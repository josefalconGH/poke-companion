// Purpose: server.js file to start the server and connect to the database
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const fs = require("fs");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const cors = require("cors");

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
  app.get("/api/pokemon", (req, res) => {
    const filePath = path.join(__dirname, "seeds", "data-pokemon.json");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading data-pokemon.json:", err);
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
