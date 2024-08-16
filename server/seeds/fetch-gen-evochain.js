const axios = require("axios");
const fs = require("fs");

const POKEAPI_SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/";
const POKEAPI_EVOLUTION_URL = "https://pokeapi.co/api/v2/evolution-chain/";
const POKEAPI_LIMIT_URL = "https://pokeapi.co/api/v2/pokemon?limit=1";
const MAX_RETRIES = 3;

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

async function fetchPokemonSpeciesData(id, retries = 0) {
  try {
    const response = await axios.get(`${POKEAPI_SPECIES_URL}${id}`);
    const species = response.data;

    // Fetch evolution chain
    const evolutionChainUrl = species.evolution_chain.url;
    const evolutionChainId = evolutionChainUrl.split("/").filter(Boolean).pop();
    const evolutionChain = await fetchEvolutionChainData(evolutionChainId);

    return {
      id: species.id,
      name: species.name,
      generation: species.generation.name,
      evolution_chain: evolutionChain,
    };
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying to fetch data for Pokémon ID ${id} (${
          retries + 1
        }/${MAX_RETRIES})...`
      );
      await delay(1000);
      return fetchPokemonSpeciesData(id, retries + 1);
    } else {
      console.error(`Error fetching data for Pokémon ID ${id}:`, error);
      return null;
    }
  }
}

async function fetchEvolutionChainData(id, retries = 0) {
  try {
    const response = await axios.get(`${POKEAPI_EVOLUTION_URL}${id}`);
    const chain = response.data.chain;
    const evolutionChain = [];

    let currentChain = chain;
    while (currentChain) {
      evolutionChain.push({
        species_name: currentChain.species.name,
        evolves_to: currentChain.evolves_to.map((evo) => evo.species.name),
      });
      currentChain = currentChain.evolves_to[0];
    }

    return evolutionChain;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying to fetch evolution chain ID ${id} (${
          retries + 1
        }/${MAX_RETRIES})...`
      );
      await delay(1000);
      return fetchEvolutionChainData(id, retries + 1);
    } else {
      console.error(`Error fetching evolution chain ID ${id}:`, error);
      return null;
    }
  }
}

async function fetchAllPokemonSpeciesData() {
  const totalPokemonCount = await fetchTotalPokemonCount();
  if (totalPokemonCount === 0) return;

  const pokemonSpeciesData = [];

  for (let id = 1; id <= totalPokemonCount; id++) {
    const data = await fetchPokemonSpeciesData(id);
    if (data) {
      pokemonSpeciesData.push(data);
    }
    await delay(500);
  }

  fs.writeFileSync(
    "pokemon-gen-evochain.json",
    JSON.stringify(pokemonSpeciesData, null, 2)
  );
  console.log(
    "Pokémon evolution and generation data saved to pokemon-gen-evochain.json"
  );
}

fetchAllPokemonSpeciesData();
