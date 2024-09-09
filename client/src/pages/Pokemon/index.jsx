// Purpose: Pokémon component to render the homepage
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
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
const TypeIcon = React.memo(({ name, icon, onClick, className }) => (
  <div className={`icon ${name.toLowerCase()} ${className || ""}`}>
    <img src={icon} alt={name} onClick={onClick} />
  </div>
));

export default function PokemonDetail() {
  const { name } = useParams();

  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    // fetch the Pokémon's details based on the name in the URL
    fetch(`/api/pokedex/pokemon/${name.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  }, [name]);

  return (
    <main className="main-container">
      <Helmet>
        <title>{`Pokémon Companion - ${
          name.charAt(0).toUpperCase() + name.slice(1)
        }`}</title>
        <meta
          name="description"
          content={`Discover details about ${
            name.charAt(0).toUpperCase() + name.slice(1)
          } on Pokémon Companion!`}
        />
        <meta
          name="keywords"
          content={`Pokémon, ${name}, Pokémon Stats, Evolution, Pokémon Types, Pokémon Abilities`}
        />
        <link
          rel="canonical"
          href={`https://poke-companion.com/pokedex/pokemon/${name}`}
        />
      </Helmet>
      <header>
        <h1 className="header">{`Pokémon Companion - ${
          name.charAt(0).toUpperCase() + name.slice(1)
        }`}</h1>
      </header>
      <section className="panel-pokemon"></section>
    </main>
  );
}
