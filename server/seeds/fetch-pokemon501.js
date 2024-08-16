const axios = require("axios");
const fs = require("fs");

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKEAPI_LIMIT_URL = "https://pokeapi.co/api/v2/pokemon?limit=1";
const MAX_RETRIES = 3;
const START_POKEMON = 501;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchTotalPokemonCount() {
  try {
    const response = await axios.get(POKEAPI_LIMIT_URL);
    console.log("Total Pokémon count:", response.data.count);
    return response.data.count;
  } catch (error) {
    console.error("Error fetching total Pokémon count:", error);
    return 0;
  }
}

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

async function fetchRemainingPokemon() {
  const totalPokemonCount = await fetchTotalPokemonCount();
  if (totalPokemonCount === 0) return;

  const pokemonData = [];

  for (let id = START_POKEMON; id <= totalPokemonCount; id++) {
    const data = await fetchPokemonData(id);
    if (data) {
      pokemonData.push(data);
    }
    await delay(500);
  }

  fs.writeFileSync(
    "pokemon-data-501.json",
    JSON.stringify(pokemonData, null, 2)
  );
  console.log("Remaining Pokémon data saved to pokemon-data-501.json");
}

fetchRemainingPokemon();
