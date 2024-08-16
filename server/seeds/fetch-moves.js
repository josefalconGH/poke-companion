const axios = require("axios");
const fs = require("fs");

const POKEAPI_MOVE_URL = "https://pokeapi.co/api/v2/move/";
const POKEAPI_GENERATION_URL = "https://pokeapi.co/api/v2/generation/";
const POKEAPI_VERSION_GROUP_URL = "https://pokeapi.co/api/v2/version-group/";
const MAX_RETRIES = 3;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchMoveData(moveName, retries = 0) {
  try {
    const response = await axios.get(`${POKEAPI_MOVE_URL}${moveName}`);
    const move = response.data;

    return {
      name: move.name,
      type: move.type.name,
      category: move.damage_class.name,
      power: move.power,
      accuracy: move.accuracy,
      pp: move.pp,
      effect:
        move.effect_entries.length > 0
          ? move.effect_entries[0].short_effect
          : "No effect",
      probability: move.effect_chance || null,
    };
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying to fetch data for move ${moveName} (${
          retries + 1
        }/${MAX_RETRIES})...`
      );
      await delay(1000);
      return fetchMoveData(moveName, retries + 1);
    } else {
      console.error(`Error fetching data for move ${moveName}:`, error);
      return null;
    }
  }
}

async function fetchAllMoves() {
  try {
    const response = await axios.get(POKEAPI_MOVE_URL, {
      params: { limit: 1000 },
    });
    return response.data.results.map((move) => move.name);
  } catch (error) {
    console.error("Error fetching all moves:", error);
    return [];
  }
}

async function fetchGenerationData(generationName) {
  try {
    const response = await axios.get(
      `${POKEAPI_GENERATION_URL}${generationName}`
    );
    const generation = response.data;

    return generation.moves.map((move) => move.name);
  } catch (error) {
    console.error(
      `Error fetching generation data for ${generationName}:`,
      error
    );
    return [];
  }
}

async function fetchHMData(versionGroupName) {
  try {
    const response = await axios.get(
      `${POKEAPI_VERSION_GROUP_URL}${versionGroupName}`
    );
    const versionGroup = response.data;

    const hmData = {};

    for (let move of versionGroup.move_learn_methods) {
      if (move.name.startsWith("hm")) {
        const moveData = await fetchMoveData(move.name);
        hmData[move.name] = {
          location: "Unknown", // Need to manually map locations based on game knowledge
          pokemon: versionGroup.pokemon.map((p) => p.name),
        };
      }
    }

    return hmData;
  } catch (error) {
    console.error(
      `Error fetching HM data for version group ${versionGroupName}:`,
      error
    );
    return {};
  }
}

async function createMovesJson() {
  const allMoves = await fetchAllMoves();
  const moveDataList = [];
  const movesByGeneration = {};
  const moveFilters = {
    z_moves: [],
    non_battle_moves: [],
    multi_target_moves: [],
    move_groups: {
      cannot_miss: [],
      one_hit_knockout: [],
    },
  };
  const hmTable = {};

  for (let move of allMoves) {
    const moveData = await fetchMoveData(move);
    if (moveData) {
      moveDataList.push(moveData);

      // Example filtering logic (needs to be expanded with real data)
      if (moveData.category === "z-move") {
        moveFilters.z_moves.push(moveData.name);
      }
      if (moveData.name.includes("surf")) {
        moveFilters.multi_target_moves.push(moveData.name);
      }
      if (moveData.name === "swift") {
        moveFilters.move_groups.cannot_miss.push(moveData.name);
      }
      if (moveData.name === "fissure") {
        moveFilters.move_groups.one_hit_knockout.push(moveData.name);
      }
    }
    await delay(100); // Slight delay to avoid hitting API limits
  }

  for (let i = 1; i <= 8; i++) {
    const generationName = `generation-${i}`;
    movesByGeneration[generationName] = await fetchGenerationData(
      generationName
    );
  }

  const versionGroups = [
    "red-blue",
    "gold-silver",
    "ruby-sapphire",
    "diamond-pearl",
    "black-white",
    "x-y",
    "sun-moon",
    "sword-shield",
  ];
  for (let versionGroup of versionGroups) {
    hmTable[versionGroup] = await fetchHMData(versionGroup);
  }

  const movesJson = {
    all_moves: moveDataList,
    moves_by_generation: movesByGeneration,
    move_filters: moveFilters,
    hm_table: hmTable,
  };

  fs.writeFileSync("moves.json", JSON.stringify(movesJson, null, 2));
  console.log("Moves data saved to moves.json");
}

createMovesJson();
