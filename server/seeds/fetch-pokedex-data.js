import fetch from "node-fetch";
import fs from "fs";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/";
const MAX_RETRIES = 3;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = 0) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(`Retrying (${retries + 1}/${MAX_RETRIES})...`);
      await delay(1000);
      return fetchWithRetry(url, retries + 1);
    } else {
      console.error(`Failed to fetch after ${MAX_RETRIES} attempts:`, error);
      return null;
    }
  }
}

async function fetchPokemonData() {
  const allPokemonData = [];

  // fetch the total number of Pokémon from the API
  let data = await fetchWithRetry(`${API_URL}?limit=1`);
  if (!data) {
    console.error("Failed to fetch total Pokémon count.");
    return;
  }

  const totalPokemon = data.count;

  for (let id = 1; id <= totalPokemon; id++) {
    try {
      console.log(`Fetching data for Pokémon ID: ${id}`);

      // fetch the basic Pokémon data with retries
      const pokemonData = await fetchWithRetry(`${API_URL}${id}`);
      if (!pokemonData) {
        continue;
      }

      // fetch the species data to get more details like species name and game versions
      const speciesData = await fetchWithRetry(`${POKEMON_SPECIES_URL}${id}`);
      if (!speciesData) {
        continue;
      }

      // gather basic info
      const basicInfo = {
        id: pokemonData.id,
        name: pokemonData.name,
        sprite: pokemonData.sprites.front_default,
        species: speciesData.genera.find(
          (genus) => genus.language.name === "en"
        ).genus,
        type: pokemonData.types.map((type) => type.type.name),
        abilities: pokemonData.abilities.map((ability) => ability.ability.name),
        hp: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
        attack: pokemonData.stats.find((stat) => stat.stat.name === "attack")
          .base_stat,
        defense: pokemonData.stats.find((stat) => stat.stat.name === "defense")
          .base_stat,
        special_attack: pokemonData.stats.find(
          (stat) => stat.stat.name === "special-attack"
        ).base_stat,
        special_defense: pokemonData.stats.find(
          (stat) => stat.stat.name === "special-defense"
        ).base_stat,
        speed: pokemonData.stats.find((stat) => stat.stat.name === "speed")
          .base_stat,
        total: pokemonData.stats.reduce((sum, stat) => sum + stat.base_stat, 0),
        appears_in: speciesData.flavor_text_entries
          .filter((entry) => entry.language.name === "en")
          .map((entry) => ({
            game_version: entry.version.name,
          })),
      };

      allPokemonData.push(basicInfo);
    } catch (error) {
      console.error(`Failed to process data for Pokémon ID: ${id}`, error);
    }
  }

  // write data to JSON file
  fs.writeFileSync(
    "data-pokedex.json",
    JSON.stringify(allPokemonData, null, 2)
  );
  console.log("Pokédex data has been saved to data-pokedex.json");
}

fetchPokemonData();
