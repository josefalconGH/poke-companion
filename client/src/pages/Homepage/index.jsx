// Purpose: Homepage component to render the homepage
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./style.css";

export default function Homepage() {
  return (
    <main className="main-container">
      <Helmet>
        <title>Poké Companion - Your Ultimate Pokémon Companion</title>
        <meta
          name="description"
          content="Welcome to Pokémon Companion! Stay updated on new features including Pokédex entries, data for types, evolution chains, moves, items, and more."
        />
        <meta
          name="keywords"
          content="PokéCompanion, Poké Companion, Pokémon, Pokédex, Pokémon Data, Evolution Chains, Moves, Items, Coronation Tournament"
        />
        <link rel="canonical" href="https://poke-companion.com/" />

        {/* Open Graph meta tags for social sharing */}
        <meta
          property="og:title"
          content="Poké Companion - The Ultimate Pokémon Companion"
        />
        <meta
          property="og:description"
          content="Explore detailed Pokémon stats, moves, abilities, and more with Poké Companion. Become the best Pokémon trainer with all the information at your fingertips!"
        />
        <meta property="og:url" content="https://poke-companion.com/" />
        <meta
          property="og:image"
          content="https://poke-companion.com/images/og-image.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Poké Companion" />

        {/* Twitter Card meta tags for social sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Poké Companion - Your Ultimate Pokémon Companion"
        />
        <meta
          name="twitter:description"
          content="Track Pokémon stats, moves, abilities, evolutions, and more with Poké Companion, the ultimate guide for Pokémon trainers."
        />
        <meta
          name="twitter:image"
          content="https://poke-companion.com/images/twitter-image.png"
        />
        <meta name="twitter:site" content="@PokeCompanion" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://poke-companion.com",
            "name": "Poké Companion",
            "description": "Poké Companion is a comprehensive platform for Pokémon trainers, offering detailed Pokémon stats, moves, abilities, and evolutions."
          }
          `}
        </script>
      </Helmet>

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
          <a
            href="#"
            className="hover:underline panel-home-span"
            aria-label="Data for types, evolution chains, moves, items, locations"
          >
            Data
          </a>{" "}
          for (
          <Link
            to="/pokedex"
            className="hover:underline panel-home-span"
            aria-label="Pokédex entries"
          >
            Pokédex entries
          </Link>{" "}
          containing (ID, Sprites, Types, Base Stats), detailed Pokémon pages,
          type charts, evolution chains),{" "}
          <a
            href="#"
            className="hover:underline panel-home-span"
            aria-label="Video Game information"
          >
            Video Game
          </a>{" "}
          related information (locations, items, abilities, moves), a custom{" "}
          <a
            href="#"
            className="hover:underline panel-home-span"
            aria-label="Coronation Tournament"
          >
            World Coronation Series
          </a>{" "}
          battle simulator, and much more!
        </p>
        <p>
          Please check back for updates and feel free to reach out to the
          developer{" "}
          <a
            href="https://www.instagram.com/josefalconig/"
            className="hover:underline panel-home-span"
            aria-label="Developer's Instagram"
          >
            here.
          </a>
        </p>
      </section>
    </main>
  );
}
