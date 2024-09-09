// Purpose: Homepage component to render the homepage
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Instagram from "../../assets/icons/socials/instagram.svg";
import GitHub from "../../assets/icons/socials/github.svg";

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
        <p className="panel-home-span">Please check back for updates!</p>
      </section>
      <div className="homepage-layout">
        <div className="developer-blog">
          <h2 className="blog-title">Developer Blog</h2>
          <p className="blog-content">
            <h3 className="tabbing padding-bottom">Sunday, 09/08/2024</h3>
            <section className="panel-blog">
              <p className="padding-bottom">
                <span className="panel-blog-span">
                  As of today, the Pokémon Companion application is still a work
                  in progress.
                </span>{" "}
                However, substantial advancements have been made. The Pokédex
                now features comprehensive data on over 1,000 Pokémon species,
                including key details such as ID numbers, sprites, types, and
                base stats.{" "}
                <span className="panel-blog-span">
                  The Pokédex offers filtering by type and sorting options by
                  ID, name, or base stat totals.
                </span>{" "}
                This flexible functionality allows users to explore the Pokédex
                in a way that best suits their needs.
              </p>

              <p className="padding-bottom">
                <span className="panel-blog-span">Each Pokémon name</span> in
                the Pokédex{" "}
                <span className="panel-blog-span">
                  links to a preliminary detail page
                </span>{" "}
                which, while currently under construction, will soon include
                expanded information such as names in multiple languages,
                abilities, flavor text, alternate sprites, and forms, along with
                much more.
              </p>

              <p>
                <span className="panel-blog-span">
                  Stay tuned for further updates and exciting new features as
                  they are actively being developed!
                </span>
              </p>
            </section>
          </p>
        </div>
        <div className="social-panels">
          <a
            href="https://www.instagram.com/josefalconig/"
            target="_blank"
            aria-label="Instagram"
            className="social-panel social-link instagram-panel"
          >
            <img src={Instagram} alt="Instagram Logo" className="social-icon" />
            <span className="social-text">Follow Developer's Instagram</span>
          </a>
          <a
            href="https://github.com/josefalconGH"
            target="_blank"
            aria-label="GitHub"
            className="social-panel social-link github-panel"
          >
            <img src={GitHub} alt="GitHub Logo" className="social-icon" />
            <span className="social-text">PokéCompanion's Repository</span>
          </a>
        </div>
      </div>
    </main>
  );
}
