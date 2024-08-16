// Purpose: Homepage component to render the homepage
import React from "react";
import "./style.css";

export default function Homepage() {
  return (
    <section className="homepage pt-50">
      <div className="content content-center flex justify-center pt-20">
        <h1 className="font-bold text-6xl">Welcome to PokéCompanion</h1>
      </div>
      <div className="content content-center flex justify-center pt-20">
        <h1 className="fontmedium italic text-4xl">In Development...</h1>
      </div>
    </section>
  );
}
