// Purpose: Homepage component to render the homepage
import React from "react";
import "./style.css";

export default function Homepage() {
  return (
    <main>
      <header>
        <h1 className="header-container font-extrabold flex justify-center text-center m-2 px-2">
          Pokémon Companion - Updates &amp; Development
        </h1>
      </header>
      <section className="panel-home my-4 mx-2">
        <p className="pb-2">
          <span className="font-bold">Welcome to the PokéCompanion!</span> This
          application is currently under development and will be updated with
          new features and functionalities as they are developed.
        </p>
        <p className="pb-2">
          Current planned features include:{" "}
          <a href="#" className="hover:underline" aria-label="Pokédex entries">
            Pokédex entries
          </a>
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
