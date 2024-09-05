// Purpose: Pokédex component to render the homepage
import React from "react";
import "./style.css";

import bugIcon from "../../assets/icons/types-round-svg/bug.svg";
import darkIcon from "../../assets/icons/types-round-svg/dark.svg";
import dragonIcon from "../../assets/icons/types-round-svg/dragon.svg";
import electricIcon from "../../assets/icons/types-round-svg/electric.svg";
import fairyIcon from "../../assets/icons/types-round-svg/fairy.svg";
import fightingIcon from "../../assets/icons/types-round-svg/fighting.svg";
import fireIcon from "../../assets/icons/types-round-svg/fire.svg";
import flyingIcon from "../../assets/icons/types-round-svg/flying.svg";
import ghostIcon from "../../assets/icons/types-round-svg/ghost.svg";
import grassIcon from "../../assets/icons/types-round-svg/grass.svg";
import groundIcon from "../../assets/icons/types-round-svg/ground.svg";
import iceIcon from "../../assets/icons/types-round-svg/ice.svg";
import normalIcon from "../../assets/icons/types-round-svg/normal.svg";
import poisonIcon from "../../assets/icons/types-round-svg/poison.svg";
import psychicIcon from "../../assets/icons/types-round-svg/psychic.svg";
import rockIcon from "../../assets/icons/types-round-svg/rock.svg";
import steelIcon from "../../assets/icons/types-round-svg/steel.svg";
import waterIcon from "../../assets/icons/types-round-svg/water.svg";

export default function Pokedex() {
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
          Pokémon's name to get a in-depth look at it's Pokédex data, including
          descriptions and sprites from various games, as well as the Pokémon's
          abilities, evolution lines, moves and more!
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
          {/* Render SVG icons dynamically */}
          <div className="icon bug">
            <img
              src={bugIcon}
              alt="Bug"
              onClick={() => handleSortByType("bug")}
            />
          </div>
          <div className="icon dark">
            <img
              src={darkIcon}
              alt="Dark"
              onClick={() => handleSortByType("dark")}
            />
          </div>
          <div className="icon dragon">
            <img
              src={dragonIcon}
              alt="Dragon"
              onClick={() => handleSortByType("dragon")}
            />
          </div>
          <div className="icon electric">
            <img
              src={electricIcon}
              alt="Electric"
              onClick={() => handleSortByType("electric")}
            />
          </div>
          <div className="icon fairy">
            <img
              src={fairyIcon}
              alt="Fairy"
              onClick={() => handleSortByType("fairy")}
            />
          </div>
          <div className="icon fighting">
            <img
              src={fightingIcon}
              alt="Fighting"
              onClick={() => handleSortByType("fighting")}
            />
          </div>
          <div className="icon fire">
            <img
              src={fireIcon}
              alt="Fire"
              onClick={() => handleSortByType("fire")}
            />
          </div>
          <div className="icon flying">
            <img
              src={flyingIcon}
              alt="Flying"
              onClick={() => handleSortByType("flying")}
            />
          </div>
          <div className="icon ghost">
            <img
              src={ghostIcon}
              alt="Ghost"
              onClick={() => handleSortByType("ghost")}
            />
          </div>
          <div className="icon grass">
            <img
              src={grassIcon}
              alt="Grass"
              onClick={() => handleSortByType("grass")}
            />
          </div>
          <div className="icon ground">
            <img
              src={groundIcon}
              alt="Ground"
              onClick={() => handleSortByType("ground")}
            />
          </div>
          <div className="icon ice">
            <img
              src={iceIcon}
              alt="Ice"
              onClick={() => handleSortByType("ice")}
            />
          </div>
          <div className="icon normal">
            <img
              src={normalIcon}
              alt="Normal"
              onClick={() => handleSortByType("normal")}
            />
          </div>
          <div className="icon poison">
            <img
              src={poisonIcon}
              alt="Poison"
              onClick={() => handleSortByType("poison")}
            />
          </div>
          <div className="icon psychic">
            <img
              src={psychicIcon}
              alt="Psychic"
              onClick={() => handleSortByType("psychic")}
            />
          </div>
          <div className="icon rock">
            <img
              src={rockIcon}
              alt="Rock"
              onClick={() => handleSortByType("rock")}
            />
          </div>
          <div className="icon steel">
            <img
              src={steelIcon}
              alt="Steel"
              onClick={() => handleSortByType("steel")}
            />
          </div>
          <div className="icon water">
            <img
              src={waterIcon}
              alt="Water"
              onClick={() => handleSortByType("water")}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
