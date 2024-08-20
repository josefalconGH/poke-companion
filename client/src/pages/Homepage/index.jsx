// Purpose: Homepage component to render the homepage
import React from "react";
import "./style.css";

export default function Homepage() {
  return (
    <main>
      <h1 className="header-container font-extrabold flex justify-center text-center m-2 px-2">
        Pokémon Companion - Updates &amp; Development
      </h1>
      <div className="panel-home m-4">
        <p className="pb-2">
          <span className="font-bold">Welcome to the PokéCompanion!</span> This
          application is currently under development and will be updated with
          new features/functionalities as they are developed.
        </p>
        <p className="pb-2">
          Current planned features include: <a href="">Pokédex entries</a>,{" "}
          <a href="">Data</a> for (types, evo chains, moves, items, locations),{" "}
          <a href="">Coronation Tournament</a>, <a href="">Video Game</a>{" "}
          information and much more!
        </p>
        <p>
          Please check back for updates and feel free to reach out to the
          developer <a href="https://www.instagram.com/josefalconig/">here</a>.
        </p>
      </div>
    </main>
  );
}
