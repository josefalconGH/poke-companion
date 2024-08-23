const axios = require("axios");
const fs = require("fs");

const POKEAPI_ITEMS_URL = "https://pokeapi.co/api/v2/item/";
const MAX_RETRIES = 3;
const MAX_CONCURRENT_REQUESTS = 5; // Control the number of concurrent requests

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchAllItems(offset = 0, retries = 0) {
  try {
    const response = await axios.get(POKEAPI_ITEMS_URL, {
      params: {
        offset: offset,
        limit: 100, // Fetch in batches of 100
      },
    });
    return response.data;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying to fetch items (offset: ${offset}) (${
          retries + 1
        }/${MAX_RETRIES})...`
      );
      await delay(1000);
      return fetchAllItems(offset, retries + 1);
    } else {
      console.error(`Error fetching items (offset: ${offset}):`, error);
      return null;
    }
  }
}

async function fetchItemDetails(url, retries = 0) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying to fetch item details (${url}) (${
          retries + 1
        }/${MAX_RETRIES})...`
      );
      await delay(1000);
      return fetchItemDetails(url, retries + 1);
    } else {
      console.error(`Error fetching item details (${url}):`, error);
      return null;
    }
  }
}

async function fetchAllItemsData() {
  let allItems = [];
  let offset = 0;
  let totalItems = 0;
  const allItemsCategory = [];
  const keyItemsCategory = [];
  const promises = [];
  let completed = 0;

  // Fetch all item metadata
  do {
    const data = await fetchAllItems(offset);
    if (data) {
      totalItems = data.count;
      allItems.push(...data.results);
      offset += data.results.length;
      console.log(`Fetched ${allItems.length}/${totalItems} items metadata...`);
    }
  } while (offset < totalItems);

  // Fetch item details with progress tracking
  for (let item of allItems) {
    promises.push(fetchItemDetails(item.url));
    if (promises.length >= MAX_CONCURRENT_REQUESTS) {
      const results = await Promise.all(promises);
      processItemResults(results, allItemsCategory, keyItemsCategory);
      completed += results.filter(Boolean).length;
      console.log(`Progress: ${completed}/${totalItems} items fetched.`);
      promises.length = 0; // Reset the array
    }
  }

  // Process any remaining promises
  if (promises.length > 0) {
    const results = await Promise.all(promises);
    processItemResults(results, allItemsCategory, keyItemsCategory);
    completed += results.filter(Boolean).length;
    console.log(`Progress: ${completed}/${totalItems} items fetched.`);
  }

  const itemsData = {
    all_items: allItemsCategory,
    key_items: keyItemsCategory,
  };

  fs.writeFileSync("data-items.json", JSON.stringify(itemsData, null, 2));
  console.log("Items data saved to data-items.json");
}

function processItemResults(results, allItemsCategory, keyItemsCategory) {
  results.forEach((itemDetails) => {
    if (itemDetails) {
      const isKeyItem = itemDetails.category.name === "key-items";

      const itemData = {
        id: itemDetails.id,
        name: itemDetails.name,
        category: itemDetails.category.name,
        effect:
          itemDetails.effect_entries.find(
            (entry) => entry.language.name === "en"
          )?.effect || "No effect information",
        attributes: itemDetails.attributes.map((attr) => attr.name),
        cost: itemDetails.cost || null,
        fling_power: itemDetails.fling_power || null,
        sprite: itemDetails.sprites?.default || null,
        flavor_text: itemDetails.flavor_text_entries
          .filter((entry) => entry.language.name === "en")
          .map((entry) => ({
            version: entry.version_group.name,
            text: entry.text,
          })),
        held_by_pokemon: itemDetails.held_by_pokemon.map((held) => ({
          pokemon: held.pokemon.name,
          rarity: held.version_details[0]?.rarity || 0,
        })),
        games: itemDetails.game_indices
          ? itemDetails.game_indices.map(
              (game) => game.version?.name || "unknown"
            )
          : [],
      };

      if (isKeyItem) {
        keyItemsCategory.push(itemData);
      } else {
        allItemsCategory.push(itemData);
      }
    }
  });
}

fetchAllItemsData();
