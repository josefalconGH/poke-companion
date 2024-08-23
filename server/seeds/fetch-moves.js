const axios = require("axios");
const fs = require("fs");

const POKEAPI_MOVES_URL = "https://pokeapi.co/api/v2/move/";
const MAX_RETRIES = 3;
const MAX_CONCURRENT_REQUESTS = 5; // Control the number of concurrent requests
const TOTAL_MOVES = 850; // Adjust based on the actual number of moves in the API

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchMoveData(id, retries = 0) {
  try {
    const response = await axios.get(`${POKEAPI_MOVES_URL}${id}`);
    return response.data;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying to fetch move ID ${id} (${retries + 1}/${MAX_RETRIES})...`
      );
      await delay(1000);
      return fetchMoveData(id, retries + 1);
    } else {
      console.error(`Error fetching data for move ID ${id}:`, error);
      return null;
    }
  }
}

async function fetchAllMoves() {
  const allMoves = [];
  const promises = [];
  let completed = 0;

  for (let id = 1; id <= TOTAL_MOVES; id++) {
    promises.push(fetchMoveData(id));
    if (promises.length >= MAX_CONCURRENT_REQUESTS) {
      const results = await Promise.all(promises);
      processMoveResults(results, allMoves);
      completed += results.filter(Boolean).length;
      console.log(`Progress: ${completed}/${TOTAL_MOVES} moves fetched.`);
      promises.length = 0; // Reset the array
    }
  }

  // Fetch remaining moves if any
  if (promises.length > 0) {
    const results = await Promise.all(promises);
    processMoveResults(results, allMoves);
    completed += results.filter(Boolean).length;
    console.log(`Progress: ${completed}/${TOTAL_MOVES} moves fetched.`);
  }

  const movesData = formatMovesData(allMoves);
  fs.writeFileSync("data-moves.json", JSON.stringify(movesData, null, 2));
  console.log("Move data saved to data-moves.json");
}

function processMoveResults(results, allMoves) {
  results.forEach((moveDetails) => {
    if (moveDetails) {
      const moveData = {
        id: moveDetails.id,
        name: moveDetails.name,
        type: moveDetails.type.name,
        category: moveDetails.damage_class.name,
        power: moveDetails.power || null,
        accuracy: moveDetails.accuracy || null,
        pp: moveDetails.pp,
        priority: moveDetails.priority,
        target: moveDetails.target.name,
        damage_class: moveDetails.damage_class.name,
        effect:
          moveDetails.effect_entries.find(
            (entry) => entry.language.name === "en"
          )?.effect || "No effect information",
        effect_chance: moveDetails.effect_chance || null,
        generation: moveDetails.generation.name,
        meta: {
          ailment: moveDetails.meta?.ailment.name || "none",
          min_hits: moveDetails.meta?.min_hits || 1,
          max_hits: moveDetails.meta?.max_hits || 1,
          min_turns: moveDetails.meta?.min_turns || 1,
          max_turns: moveDetails.meta?.max_turns || 1,
          drain: moveDetails.meta?.drain || 0,
          healing: moveDetails.meta?.healing || 0,
          crit_rate: moveDetails.meta?.crit_rate || 0,
          ailment_chance: moveDetails.meta?.ailment_chance || 0,
          flinch_chance: moveDetails.meta?.flinch_chance || 0,
          stat_chance: moveDetails.meta?.stat_chance || 0,
        },
        machines: moveDetails.machines.map((machine) => ({
          version: machine.version_group.name,
          machine: machine.machine.url.split("/").slice(-2, -1)[0], // Extract the machine ID
        })),
        z_move: moveDetails.meta?.z_move_power
          ? {
              name: moveDetails.name, // Assuming Z-Move is based on the move itself
              type: moveDetails.type.name,
              power: moveDetails.meta.z_move_power,
            }
          : null,
        flavor_text: moveDetails.flavor_text_entries
          .filter((entry) => entry.language.name === "en")
          .map((entry) => ({
            version: entry.version_group.name,
            text: entry.flavor_text,
          })),
      };

      allMoves.push(moveData);
    }
  });
}

function formatMovesData(allMoves) {
  const movesByGeneration = {};
  const moveCategories = {
    physical: [],
    special: [],
    status: [],
  };
  const moveGroups = {
    z_moves: [],
    non_battle_moves: [],
    multi_target_moves: [],
    unmissable_moves: [],
    one_hit_knock_out_moves: [],
  };
  const hmMoves = {};

  allMoves.forEach((move) => {
    // Group by generation
    if (!movesByGeneration[move.generation]) {
      movesByGeneration[move.generation] = [];
    }
    movesByGeneration[move.generation].push(move.name);

    // Categorize by move category
    moveCategories[move.category].push(move.name);

    // Group by special groups
    if (move.z_move) {
      moveGroups.z_moves.push({
        name: move.z_move.name,
        type: move.z_move.type,
        power: move.z_move.power,
        base_move: move.name,
      });
    }

    if (move.target === "user") {
      moveGroups.non_battle_moves.push(move.name);
    }

    if (
      move.target === "all-opponents" ||
      move.target === "all-other-pokemon"
    ) {
      moveGroups.multi_target_moves.push(move.name);
    }

    if (move.effect === "This move does not check accuracy.") {
      moveGroups.unmissable_moves.push(move.name);
    }

    if (move.effect.includes("faints instantly")) {
      moveGroups.one_hit_knock_out_moves.push(move.name);
    }

    // HM moves (This part assumes you have a way to identify HM moves, such as a specific category or other identifier)
    if (
      move.name.startsWith("cut") ||
      move.name.startsWith("surf") ||
      move.name.startsWith("fly")
    ) {
      // Example condition
      const generation = move.generation;
      if (!hmMoves[generation]) {
        hmMoves[generation] = [];
      }
      hmMoves[generation].push({
        hm_number: "HM0X", // Replace with actual HM number
        name: move.name,
        location: "Unknown", // Replace with actual location data if available
        learnable_by: [], // Add Pokémon learnable by this move if needed
      });
    }
  });

  return {
    all_moves: allMoves,
    moves_by_generation: movesByGeneration,
    move_categories: moveCategories,
    move_groups: moveGroups,
    hm_moves: hmMoves,
  };
}

fetchAllMoves();
