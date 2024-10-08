// Purpose: Pokédex component to render the homepage
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./style.css";

import {
  bugIcon,
  darkIcon,
  dragonIcon,
  electricIcon,
  fairyIcon,
  fightingIcon,
  fireIcon,
  flyingIcon,
  ghostIcon,
  grassIcon,
  groundIcon,
  iceIcon,
  normalIcon,
  poisonIcon,
  psychicIcon,
  rockIcon,
  steelIcon,
  waterIcon,
} from "../../assets/icons/types-round-svg";

import Clear from "../../assets/icons/clear-filter.svg";
import Close from "../../assets/icons/close.svg";
import Dropdown from "../../assets/icons/dropdown.svg";

const pokemonTypes = [
  { name: "Bug", icon: bugIcon },
  { name: "Dark", icon: darkIcon },
  { name: "Dragon", icon: dragonIcon },
  { name: "Electric", icon: electricIcon },
  { name: "Fairy", icon: fairyIcon },
  { name: "Fighting", icon: fightingIcon },
  { name: "Fire", icon: fireIcon },
  { name: "Flying", icon: flyingIcon },
  { name: "Ghost", icon: ghostIcon },
  { name: "Grass", icon: grassIcon },
  { name: "Ground", icon: groundIcon },
  { name: "Ice", icon: iceIcon },
  { name: "Normal", icon: normalIcon },
  { name: "Poison", icon: poisonIcon },
  { name: "Psychic", icon: psychicIcon },
  { name: "Rock", icon: rockIcon },
  { name: "Steel", icon: steelIcon },
  { name: "Water", icon: waterIcon },
];

// reusable type icon component
const TypeIcon = React.memo(({ name, icon, onClick, className }) => (
  <div className={`icon ${name.toLowerCase()} ${className || ""}`}>
    <img src={icon} alt={name} onClick={onClick} />
  </div>
));

export default function Pokedex() {
  const [pokemonData, setPokemonData] = useState([]);
  const [sortedPokemonData, setSortedPokemonData] = useState(pokemonData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState({ column: "id", order: "asc" });

  useEffect(() => {
    // fetch the full list of Pokémon when the component mounts
    fetch("/api/pokedex")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        return response.json();
      })
      .then((data) => {
        // sort the fetched data by ID in ascending order
        const sortedById = data.sort((a, b) => a.id - b.id);
        setPokemonData(sortedById);
        setSortedPokemonData(sortedById);
      })
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  }, []);

  const sortByType = (type) => {
    // filter the Pokémon data based on the selected type
    console.log(`Sorting by type: ${type}`);
    if (type === "all") {
      setSortedPokemonData(pokemonData);
    } else {
      const filteredData = pokemonData.filter((pokemon) =>
        pokemon.type.some((pokemonType) => pokemonType.toLowerCase() === type)
      );
      setSortedPokemonData(filteredData);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      // reset the search query to show all Pokémon
      setSortedPokemonData(pokemonData);
    } else {
      const filteredData = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query)
      );
      setSortedPokemonData(filteredData);
    }
  };

  const sortData = (key) => {
    let order = "asc";

    if (activeSort.column === key) {
      order = activeSort.order === "asc" ? "desc" : "asc";
    }

    const sortedData = [...sortedPokemonData].sort((a, b) => {
      if (key === "name") {
        return order === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
      return order === "asc" ? a[key] - b[key] : b[key] - a[key];
    });

    setSortedPokemonData(sortedData);
    setActiveSort({ column: key, order });
  };

  return (
    <main className="main-container">
      <Helmet>
        <title>Pokémon Companion - Pokédex</title>
        <meta
          name="description"
          content="Explore the Pokédex on Pokémon Companion! Discover information about all Pokémon species, including stats, types, abilities, and evolutions."
        />
        <meta
          name="keywords"
          content="Pokédex, Pokémon, Pokémon Stats, Evolution, Pokémon Types, Pokémon Abilities"
        />
        <link rel="canonical" href="https://poke-companion.com/pokedex" />
      </Helmet>
      <header>
        <h1 className="header">Pokémon Companion - Pokédex</h1>
      </header>
      <section className="panel-pokedex">
        <p className="padding-bottom">
          The{" "}
          <span className="panel-pokedex-span">PokémonCompanion Pokédex</span>{" "}
          contains information on all Pokémon species from the Pokémon series.
          Inside of the Pokédex, you can find various stats and information on
          each Pokémon. With more than 1,000 Pokémon species, click on a
          Pokémon's name to get an in-depth look at its Pokédex data, including
          descriptions and sprites from various games, as well as the Pokémon's
          abilities, evolution lines, moves, and more{" "}
          <span className="panel-pokedex-span">(Coming Soon)</span>!
        </p>
        <p className="padding-bottom">
          In addition,{" "}
          <span className="panel-pokedex-span">
            you can filter the Pokédex by{" "}
            <a href="#type-filter" className="hover:underline">
              type
            </a>{" "}
            or sort the Pokémon by their ID, name, or base stats.
          </span>{" "}
          This allows you to navigate the Pokédex in a way that is best suited
          for your needs.
        </p>
      </section>
      <section id="type-filter" className="panel-pokedex panel-filter">
        <div className="filter-header">
          <p className="panel-pokedex-span">Filter by Type</p>
          <button
            onClick={() => sortByType("all")}
            className="reset-filter panel-pokedex-span"
          >
            <img src={Clear} alt="Remove Filter" className="close-icon" />
          </button>
        </div>
        <div className="wrapper">
          {pokemonTypes.map(({ name, icon }) => (
            <TypeIcon
              key={name}
              name={name}
              icon={icon}
              onClick={() => sortByType(name.toLowerCase())}
            />
          ))}
        </div>
      </section>
      <section className="panel-pokedex panel-search">
        <div className="search-bar-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Pokémon by name..."
            className="search-bar"
          />
          {searchQuery && (
            <img
              src={Close}
              alt="Clear search"
              className="clear-icon"
              onClick={() =>
                setSearchQuery("") || setSortedPokemonData(pokemonData)
              }
            />
          )}
        </div>
      </section>
      <section className="pokedex-table-container">
        <table className="pokedex-table sticky-header block-wide">
          <thead className="table-header">
            <tr>
              <th>
                <div
                  className={`sortwrap cell-header ${
                    activeSort.column === "id" ? "active-sort" : ""
                  }`}
                  onClick={() => sortData("id")}
                >
                  ID
                </div>
              </th>
              <th>
                <div className="cell-header">Sprite</div>
              </th>
              <th>
                <div
                  className={`sortwrap cell-header ${
                    activeSort.column === "name" ? "active-sort" : ""
                  }`}
                  onClick={() => sortData("name")}
                >
                  Name
                </div>
              </th>
              <th>
                <div className="cell-header">Type</div>
              </th>
              <th colSpan="7">
                <div className="cell-header">Base Stats</div>
              </th>
            </tr>
            <tr>
              <th colSpan="4"></th>
              <th>
                <div
                  className={`sortwrap cell-header ${
                    activeSort.column === "hp" ? "active-sort" : ""
                  }`}
                  onClick={() => sortData("hp")}
                >
                  HP
                </div>
              </th>
              <th>
                <div
                  className={`sortwrap cell-header ${
                    activeSort.column === "attack" ? "active-sort" : ""
                  }`}
                  onClick={() => sortData("attack")}
                >
                  Attack
                </div>
              </th>
              <th>
                <div
                  className={`sortwrap cell-header ${
                    activeSort.column === "defense" ? "active-sort" : ""
                  }`}
                  onClick={() => sortData("defense")}
                >
                  Defense
                </div>
              </th>
              <th>
                <div
                  className={`sortwrap cell-header ${
                    activeSort.column === "special_attack" ? "active-sort" : ""
                  }`}
                  onClick={() => sortData("special_attack")}
                >
                  Sp. Atk
                </div>
              </th>
              <th>
                <div
                  className={`sortwrap cell-header ${
                    activeSort.column === "special_defense" ? "active-sort" : ""
                  }`}
                  onClick={() => sortData("special_defense")}
                >
                  Sp. Def
                </div>
              </th>
              <th>
                <div
                  className={`sortwrap cell-header ${
                    activeSort.column === "speed" ? "active-sort" : ""
                  }`}
                  onClick={() => sortData("speed")}
                >
                  Speed
                </div>
              </th>
              <th>
                <div
                  className={`sortwrap cell-header ${
                    activeSort.column === "total" ? "active-sort" : ""
                  }`}
                  onClick={() => sortData("total")}
                >
                  Total
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPokemonData.length > 0 ? (
              sortedPokemonData.map((pokemon) => (
                <tr
                  key={pokemon.id}
                  className={
                    searchQuery &&
                    pokemon.name.toLowerCase().includes(searchQuery)
                      ? "highlight"
                      : ""
                  }
                >
                  <td className="cell-num cell-start">
                    #{String(pokemon.id).padStart(4, "0")}
                  </td>
                  <td className="cell-sprite">
                    <img
                      loading="lazy"
                      src={pokemon.sprite}
                      alt={`${pokemon.name} official sprite`}
                      className="pokemon-sprite pokemon-sprite-fixed"
                    />
                  </td>
                  <td className="pokemon-td-name pokemon-link">
                    <Link
                      to={`/pokedex/pokemon/${pokemon.name.toLowerCase()}`}
                      className="pokemon-name"
                    >
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </Link>
                  </td>
                  <td>
                    <a className="type-icon">
                      {pokemon.type.map((type) => {
                        const typeData = pokemonTypes.find(
                          (typeObj) =>
                            typeObj.name.toLowerCase() === type.toLowerCase()
                        );
                        return (
                          <TypeIcon
                            key={type}
                            name={type}
                            icon={typeData.icon}
                            onClick={() => handleSortByType(type.toLowerCase())}
                            className="small-icon"
                          />
                        );
                      })}
                    </a>
                  </td>
                  <td className="stat-num">{pokemon.hp}</td>
                  <td className="stat-num">{pokemon.attack}</td>
                  <td className="stat-num">{pokemon.defense}</td>
                  <td className="stat-num">{pokemon.special_attack}</td>
                  <td className="stat-num">{pokemon.special_defense}</td>
                  <td className="stat-num">{pokemon.speed}</td>
                  <td className="stat-num stat-total">{pokemon.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="no-results">
                  No Pokémon found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
