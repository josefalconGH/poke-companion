// Purpose: Pokédex component to render the homepage
import React, { useEffect, useState } from "react";
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
const TypeIcon = ({ name, icon, onClick, className }) => (
  <div className={`icon ${name.toLowerCase()} ${className || ""}`}>
    <img src={icon} alt={name} onClick={onClick} />
  </div>
);

export default function Pokedex() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetch("/api/pokemon")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        return response.json();
      })
      .then((data) => setPokemonData(data))
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  }, []);

  const handleSortByType = (type) => {
    console.log(`Sorting by type: ${type}`);
    // sorting logic here
  };

  return (
    <main className="main-container">
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
          abilities, evolution lines, moves, and more!
        </p>
        <p className="padding-bottom">
          In addition,{" "}
          <span className="panel-pokedex-span">
            you can navigate the Pokédex by{" "}
            <a href="#type-filter" className="underline">
              type
            </a>{" "}
            or{" "}
            <a href="" className="underline">
              generation
            </a>{" "}
            the Pokémon was introduced in.
          </span>{" "}
          This allows you to filter the Pokédex to showcase Pokémon of the same
          type or from the same generation.
        </p>
      </section>
      <section id="type-filter" className="panel-pokedex panel-filter">
        <p className="panel-pokedex-span">Filter by type:</p>
        <div className="wrapper">
          {pokemonTypes.map(({ name, icon }) => (
            <TypeIcon
              key={name}
              name={name}
              icon={icon}
              onClick={() => handleSortByType(name.toLowerCase())}
            />
          ))}
        </div>
      </section>
      <section className="pokedex-table-container">
        <table className="pokedex-table sticky-header block-wide">
          <thead className="table-header">
            <tr>
              <th>
                <div className="sortwrap cell-header">ID</div>
              </th>
              <th>
                <div className="sortwrap cell-header">Sprite</div>
              </th>
              <th>
                <div className="sortwrap cell-header">Name</div>
              </th>
              <th>
                <div className="sortwrap cell-header">Type</div>
              </th>
              <th colSpan="7">
                <div className="sortwrap cell-header">Base Stats</div>
              </th>
            </tr>
            <tr>
              <th colSpan="4"></th>
              <th>
                <div className="sortwrap cell-header">HP</div>
              </th>
              <th>
                <div className="sortwrap cell-header">Attack</div>
              </th>
              <th>
                <div className="sortwrap cell-header">Defense</div>
              </th>
              <th>
                <div className="sortwrap cell-header">Sp. Atk</div>
              </th>
              <th>
                <div className="sortwrap cell-header">Sp. Def</div>
              </th>
              <th>
                <div className="sortwrap cell-header">Speed</div>
              </th>
              <th>
                <div className="sortwrap cell-header">Total</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {pokemonData.map((pokemon) => (
              <tr key={pokemon.id}>
                <td className="cell-num cell-start">
                  #{String(pokemon.id).padStart(4, "0")}
                </td>
                <td className="cell-sprite">
                  <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="pokemon-sprite pokemon-sprite-fixed"
                  />
                </td>
                <td class="pokemon-td-name">
                  <a className="pokemon-name">
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </a>
                </td>
                <td>
                  <a className="type-icon">
                    {/* Render Type Icons with smaller size using small-icon class */}
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
                          className="small-icon" // Apply the smaller size class
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
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
