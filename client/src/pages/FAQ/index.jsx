// Purpose: FAQ component to render the homepage
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./style.css";

export default function Pokedex() {
  return (
    <main className="main-container">
      <Helmet>
        <title>Pokémon - </title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link rel="canonical" href="https://poke-companion.com/faq" />
      </Helmet>
      <header>
        <h1 className="header">Frequently Asked Questions</h1>
      </header>
      <section className="panel-faq"></section>
    </main>
  );
}
