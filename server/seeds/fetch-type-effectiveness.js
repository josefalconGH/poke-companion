const axios = require("axios");
const fs = require("fs");

const POKEAPI_TYPE_URL = "https://pokeapi.co/api/v2/type/";
const MAX_RETRIES = 3;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchTypeData(typeName, retries = 0) {
  try {
    const response = await axios.get(`${POKEAPI_TYPE_URL}${typeName}`);
    const type = response.data;

    const effectiveness = {
      no_effect: type.damage_relations.no_damage_to.map((t) => t.name),
      not_very_effective: type.damage_relations.half_damage_to.map(
        (t) => t.name
      ),
      normal_effective: [], // This will be filled based on what remains
      super_effective: type.damage_relations.double_damage_to.map(
        (t) => t.name
      ),
    };

    // Populate normal_effective (types not in other categories)
    const allTypesResponse = await axios.get(POKEAPI_TYPE_URL);
    const allTypes = allTypesResponse.data.results.map((t) => t.name);

    effectiveness.normal_effective = allTypes.filter(
      (t) =>
        !effectiveness.no_effect.includes(t) &&
        !effectiveness.not_very_effective.includes(t) &&
        !effectiveness.super_effective.includes(t)
    );

    return {
      type: typeName,
      effectiveness: effectiveness,
    };
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying to fetch type data for ${typeName} (${
          retries + 1
        }/${MAX_RETRIES})...`
      );
      await delay(1000);
      return fetchTypeData(typeName, retries + 1);
    } else {
      console.error(`Error fetching data for type ${typeName}:`, error);
      return null;
    }
  }
}

async function fetchAllTypesEffectiveness() {
  const allTypesResponse = await axios.get(POKEAPI_TYPE_URL);
  const allTypes = allTypesResponse.data.results.map((t) => t.name);
  const typeEffectivenessData = {};

  for (let type of allTypes) {
    console.log(`Fetching effectiveness data for type: ${type}`);
    const typeData = await fetchTypeData(type);
    if (typeData) {
      typeEffectivenessData[type] = typeData.effectiveness;
    }
    await delay(500); // Slight delay to avoid hitting API limits
  }

  fs.writeFileSync(
    "type-effectiveness.json",
    JSON.stringify(typeEffectivenessData, null, 2)
  );
  console.log("Type effectiveness data saved to data-type-effectiveness.json");
}

fetchAllTypesEffectiveness();
