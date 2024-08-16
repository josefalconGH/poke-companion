const axios = require("axios");
const fs = require("fs");

const POKEAPI_ITEMS_URL = "https://pokeapi.co/api/v2/item/";
const MAX_RETRIES = 3;

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

  do {
    const data = await fetchAllItems(offset);
    if (data) {
      totalItems = data.count;
      allItems.push(...data.results);
      offset += data.results.length;
    }
  } while (offset < totalItems);

  for (let item of allItems) {
    const itemDetails = await fetchItemDetails(item.url);
    if (itemDetails) {
      const isKeyItem = itemDetails.category.name === "key-items";

      const itemData = {
        id: itemDetails.id,
        name: itemDetails.name,
        category: itemDetails.category.name,
        effect:
          itemDetails.effect_entries[0]?.effect || "No effect information",
      };

      if (isKeyItem) {
        keyItemsCategory.push(itemData);
      } else {
        allItemsCategory.push(itemData);
      }
    }
    await delay(100); // Slight delay to avoid API rate limits
  }

  const itemsData = {
    all_items: allItemsCategory,
    key_items: keyItemsCategory,
  };

  fs.writeFileSync("items.json", JSON.stringify(itemsData, null, 2));
  console.log("Items data saved to items.json");
}

fetchAllItemsData();
