const axios = require("axios");
const fs = require("fs");

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon/";
const MAX_RETRIES = 3;
const MAX_POKEMON = 500;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPokemonData(id, retries = 0) {
  try {
    const response = await axios.get(`${POKEAPI_URL}${id}`);
    const pokemon = response.data;

    const stats = {
      hp: pokemon.stats.find((stat) => stat.stat.name === "hp").base_stat,
      attack: pokemon.stats.find((stat) => stat.stat.name === "attack")
        .base_stat,
      defense: pokemon.stats.find((stat) => stat.stat.name === "defense")
        .base_stat,
      special_attack: pokemon.stats.find(
        (stat) => stat.stat.name === "special-attack"
      ).base_stat,
      special_defense: pokemon.stats.find(
        (stat) => stat.stat.name === "special-defense"
      ).base_stat,
      speed: pokemon.stats.find((stat) => stat.stat.name === "speed").base_stat,
    };

    const total = Object.values(stats).reduce((acc, stat) => acc + stat, 0);

    return {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      type: pokemon.types.map((typeInfo) => typeInfo.type.name),
      ...stats,
      total,
    };
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying to fetch data for Pokémon ID ${id} (${
          retries + 1
        }/${MAX_RETRIES})...`
      );
      await delay(1000);
      return fetchPokemonData(id, retries + 1);
    } else {
      console.error(`Error fetching data for Pokémon ID ${id}:`, error);
      return null;
    }
  }
}

async function fetchFirst500Pokemon() {
  const pokemonData = [];

  for (let id = 1; id <= MAX_POKEMON; id++) {
    const data = await fetchPokemonData(id);
    if (data) {
      pokemonData.push(data);
    }
    await delay(500);
  }

  fs.writeFileSync(
    "pokemon-data-1-500.json",
    JSON.stringify(pokemonData, null, 2)
  );
  console.log("First 500 Pokémon data saved to pokemon-data-1-500.json");
}

fetchFirst500Pokemon();
