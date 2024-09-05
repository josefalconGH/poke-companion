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
const TypeIcon = ({ name, icon, onClick }) => (
  <div className={`icon ${name.toLowerCase()}`}>
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
        <table className="pokedex-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sprite</th>
              <th>Name</th>
              <th>Type</th>
              <th colSpan="6">Base Stats</th>
            </tr>
            <tr>
              <th colSpan="4"></th>
              <th>HP</th>
              <th>Att</th>
              <th>Def</th>
              <th>Sp. Att</th>
              <th>Sp. Def</th>
              <th>Spd</th>
            </tr>
          </thead>
          <tbody>
            {pokemonData.map((pokemon) => (
              <tr key={pokemon.id}>
                <td>#{String(pokemon.id).padStart(4, "0")}</td>
                <td>
                  <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="pokemon-sprite"
                  />
                </td>
                <td>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </td>
                <td>{pokemon.type.join(" / ")}</td>
                <td>{pokemon.hp}</td>
                <td>{pokemon.attack}</td>
                <td>{pokemon.defense}</td>
                <td>{pokemon.special_attack}</td>
                <td>{pokemon.special_defense}</td>
                <td>{pokemon.speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
