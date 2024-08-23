require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const POKEAPI_URL =
  process.env.POKEAPI_URL || "https://pokeapi.co/api/v2/pokemon/";
const SPECIES_URL =
  process.env.SPECIES_URL || "https://pokeapi.co/api/v2/pokemon-species/";
const TYPE_URL = process.env.TYPE_URL || "https://pokeapi.co/api/v2/type/";
const MAX_RETRIES = parseInt(process.env.MAX_RETRIES, 10) || 3;
const MAX_POKEMON = parseInt(process.env.MAX_POKEMON, 10) || 500;
const MAX_CONCURRENT_REQUESTS =
  parseInt(process.env.MAX_CONCURRENT_REQUESTS, 10) || 5;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const typeCache = new Map();

async function fetchTypeData(typeName) {
  if (typeCache.has(typeName)) {
    return typeCache.get(typeName);
  }

  try {
    const response = await axios.get(`${TYPE_URL}${typeName}`);
    typeCache.set(typeName, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching type data for ${typeName}:`, error.message);
    return null;
  }
}

async function fetchRegionalFormSprites(pokemonUrl) {
  try {
    const response = await axios.get(pokemonUrl);
    const sprites = response.data.sprites;

    return {
      front_default: sprites.other["official-artwork"].front_default,
      showdown_sprite: sprites.other["showdown"].front_default,
    };
  } catch (error) {
    console.error(`Error fetching sprites for ${pokemonUrl}:`, error.message);
    return null;
  }
}

function formatEvolutionChain(evolutionChain) {
  if (!evolutionChain) return null;

  const formatChain = (chain) => {
    return {
      species: chain.species.name,
      min_level: chain.evolution_details[0]?.min_level || null,
      evolves_to: chain.evolves_to.map((evol) => formatChain(evol)),
    };
  };

  return formatChain(evolutionChain);
}

async function fetchPokemonData(id, retries = 0) {
  try {
    // Fetch basic Pokemon data
    const pokemonResponse = await axios.get(`${POKEAPI_URL}${id}`);
    const pokemon = pokemonResponse.data;

    // Fetch species data for additional details
    const speciesResponse = await axios.get(`${SPECIES_URL}${id}`);
    const species = speciesResponse.data;

    // Fetch type data for weaknesses
    const typePromises = pokemon.types.map((typeInfo) =>
      fetchTypeData(typeInfo.type.name)
    );
    const typeResponses = await Promise.all(typePromises);
    const weaknesses = new Set();
    typeResponses.forEach((response) => {
      if (response) {
        response.damage_relations.double_damage_from.forEach((weakness) => {
          weaknesses.add(weakness.name);
        });
      }
    });

    // Flavor text
    const flavorText = species.flavor_text_entries
      .filter((entry) => entry.language.name === "en")
      .map((entry) => ({
        version: entry.version.name,
        text: entry.flavor_text,
      }));

    // Fetch evolution chain data
    const evolutionResponse = await axios.get(species.evolution_chain.url);
    const evolutionChainData = evolutionResponse.data.chain;
    const formattedEvolutionChain = formatEvolutionChain(evolutionChainData);

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

    // Determine generation introduced
    const generation_introduced = {
      generation: species.generation.name,
    };

    // Regional forms
    const regionalForms = [];
    for (const variety of species.varieties) {
      if (variety.is_default === false) {
        const sprites = await fetchRegionalFormSprites(variety.pokemon.url);
        if (sprites) {
          regionalForms.push({
            form_name: variety.pokemon.name.split("-")[1],
            form_style: "regional",
            abilities: variety.abilities
              ? variety.abilities.map((ability) => ability.ability.name)
              : [],
            sprite: sprites.front_default,
            showdown_sprite: sprites.showdown_sprite,
          });
        }
      }
    }

    // Encounter locations
    const encounterResponse = await axios.get(pokemon.location_area_encounters);
    const encounterLocations = encounterResponse.data.map((encounter) => ({
      game_version: encounter.version_details.map(
        (detail) => detail.version.name
      ),
      location: encounter.location_area.name,
      method: encounter.version_details[0].encounter_details[0].method.name,
    }));

    // Training data
    const training = {
      ev_yield: pokemon.stats.map((stat) => ({
        [stat.stat.name]: stat.effort,
      })),
      catch_rate: species.capture_rate,
      base_friendship: species.base_happiness,
      base_experience: pokemon.base_experience,
      growth_rate: species.growth_rate.name,
    };

    // Breeding data
    const breeding = {
      egg_groups: species.egg_groups.map((group) => group.name),
      egg_cycles: species.hatch_counter,
      gender_probability: {
        male:
          species.gender_rate === -1 ? null : 100 - species.gender_rate * 12.5,
        female: species.gender_rate === -1 ? null : species.gender_rate * 12.5,
      },
    };

    return {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      species: species.genera
        .find((genus) => genus.language.name === "en")
        .genus.toLowerCase(),
      type: pokemon.types.map((typeInfo) => typeInfo.type.name),
      weakness: Array.from(weaknesses),
      flavor_text: flavorText,
      abilities: pokemon.abilities.map((ability) => ability.ability.name),
      ...stats,
      total,
      generation_introduced: [generation_introduced],
      evolution_chain: formattedEvolutionChain,
      regional_form: regionalForms,
      encounter_location: encounterLocations,
      training: [training],
      breeding: [breeding],
    };
  } catch (error) {
    console.error(
      `Error fetching data for Pokémon ID ${id} on attempt ${retries + 1}:`,
      error.message,
      error.config?.url || "URL not available"
    );
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying to fetch data for Pokémon ID ${id} (${
          retries + 1
        }/${MAX_RETRIES})...`
      );
      await delay(1000);
      return fetchPokemonData(id, retries + 1);
    } else {
      return null;
    }
  }
}

async function fetchFirst500Pokemon() {
  const pokemonData = [];
  const promises = [];
  let completed = 0;

  for (let id = 1; id <= MAX_POKEMON; id++) {
    promises.push(fetchPokemonData(id));
    if (promises.length >= MAX_CONCURRENT_REQUESTS) {
      const results = await Promise.all(promises);
      pokemonData.push(...results.filter(Boolean));
      completed += results.filter(Boolean).length;
      console.log(`Progress: ${completed}/${MAX_POKEMON} Pokémon fetched.`);
      promises.length = 0; // Reset the array
    }
  }

  // Fetch remaining Pokémon if any
  if (promises.length > 0) {
    const results = await Promise.all(promises);
    pokemonData.push(...results.filter(Boolean));
    completed += results.filter(Boolean).length;
    console.log(`Progress: ${completed}/${MAX_POKEMON} Pokémon fetched.`);
  }

  fs.writeFileSync(
    "pokemon-data-1-500.json",
    JSON.stringify(pokemonData, null, 2)
  );
  console.log("First 500 Pokémon data saved to pokemon-data-1-500.json");
}

fetchFirst500Pokemon();
