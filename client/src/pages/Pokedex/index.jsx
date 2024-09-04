// Purpose: Pokédex component to render the homepage
import React from "react";
import "./style.css";

export default function Pokedex() {
  return (
    <main className="main-container">
      <header>
        <h1 className="header-container font-extrabold flex justify-center text-center m-2 px-2">
          Pokédex - Pokémon Database
        </h1>
      </header>
    </main>
  );
}
