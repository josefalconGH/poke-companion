const axios = require("axios");
const fs = require("fs");

const POKEAPI_LOCATION_AREA_URL = "https://pokeapi.co/api/v2/location-area/";
const POKEAPI_REGION_URL = "https://pokeapi.co/api/v2/region/";
const MAX_RETRIES = 3;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchAllRegions() {
  try {
    const response = await axios.get(POKEAPI_REGION_URL);
    return response.data.results.map((region) => region.name);
  } catch (error) {
    console.error("Error fetching regions:", error);
    return [];
  }
}

async function fetchLocationAreaData(locationAreaUrl, retries = 0) {
  try {
    const response = await axios.get(locationAreaUrl);
    return response.data;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying to fetch location area data (${
          retries + 1
        }/${MAX_RETRIES})...`
      );
      await delay(1000);
      return fetchLocationAreaData(locationAreaUrl, retries + 1);
    } else {
      console.error(`Error fetching location area data:`, error);
      return null;
    }
  }
}

async function fetchRegionData(regionName, retries = 0) {
  try {
    const response = await axios.get(`${POKEAPI_REGION_URL}${regionName}`);
    const region = response.data;
    const regionData = {};

    for (let location of region.locations) {
      const locationResponse = await axios.get(location.url);
      const locationAreas = locationResponse.data.areas;

      for (let locationArea of locationAreas) {
        const locationAreaData = await fetchLocationAreaData(locationArea.url);
        if (
          locationAreaData &&
          Array.isArray(locationAreaData.pokemon_encounters)
        ) {
          const routeName = locationAreaData.name;

          regionData[routeName] = {};

          for (let encounter of locationAreaData.pokemon_encounters) {
            const pokemonName = encounter.pokemon.name;
            const versionDetails = encounter.version_details;

            for (let detail of versionDetails) {
              const versionName = detail.version.name;
              const generationName = detail.version.name.split("-")[0]; // Simplified

              if (!regionData[routeName][generationName]) {
                regionData[routeName][generationName] = {};
              }

              if (!regionData[routeName][generationName][versionName]) {
                regionData[routeName][generationName][versionName] = [];
              }

              regionData[routeName][generationName][versionName].push(
                pokemonName
              );
            }
          }
        }
      }
    }

    return regionData;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying to fetch data for region ${regionName} (${
          retries + 1
        }/${MAX_RETRIES})...`
      );
      await delay(1000);
      return fetchRegionData(regionName, retries + 1);
    } else {
      console.error(`Error fetching data for region ${regionName}:`, error);
      return null;
    }
  }
}

async function fetchAllRegionsData() {
  const regions = await fetchAllRegions();
  const allRegionData = {};

  for (let region of regions) {
    console.log(`Fetching data for region: ${region}`);
    const regionData = await fetchRegionData(region);
    if (regionData) {
      allRegionData[region] = regionData;
    }
    await delay(500); // Slight delay to avoid hitting API limits
  }

  fs.writeFileSync(
    "pokemon-locations-by-region.json",
    JSON.stringify(allRegionData, null, 2)
  );
  console.log(
    "Pokémon location data saved to pokemon-locations-by-region.json"
  );
}

fetchAllRegionsData();
