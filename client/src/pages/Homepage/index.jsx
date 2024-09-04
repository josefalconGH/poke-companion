// Purpose: Homepage component to render the homepage
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Homepage() {
  return (
    <main className="main-container">
      <header>
        <h1 className="header">
          Pokémon Companion - Updates &amp; Development
        </h1>
      </header>
      <section className="panel-home">
        <p className="padding-bottom">
          <span className="panel-home-span">
            Welcome to the PokémonCompanion!
          </span>{" "}
          This application is currently under development and will be updated
          with new features and functionalities as they are developed.
        </p>
        <p className="padding-bottom">
          Current planned features include:{" "}
          <Link to="/pokedex" title="View Pokédex">
            <a className="hover:underline" aria-label="Pokédex entries">
              Pokédex entries
            </a>
          </Link>
          ,{" "}
          <a
            href="#"
            className="hover:underline"
            aria-label="Data for types, evolution chains, moves, items, locations"
          >
            Data
          </a>{" "}
          for (types, evo chains, moves, items, locations),{" "}
          <a
            href="#"
            className="hover:underline"
            aria-label="Coronation Tournament"
          >
            Coronation Tournament
          </a>
          ,{" "}
          <a
            href="#"
            className="hover:underline"
            aria-label="Video Game information"
          >
            Video Game
          </a>{" "}
          information and much more!
        </p>
        <p>
          Please check back for updates and feel free to reach out to the
          developer{" "}
          <a
            href="https://www.instagram.com/josefalconig/"
            className="hover:underline"
            aria-label="Developer's Instagram"
          >
            here
          </a>
          .
        </p>
      </section>
    </main>
  );
}
