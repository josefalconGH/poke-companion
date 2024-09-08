// Purpose: FAQ component to render the homepage
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./style.css";

export default function FAQ() {
  return (
    <main className="main-container">
      <Helmet>
        <title>Pokémon Companion - Frequently Asked Questions</title>
        <meta
          name="description"
          content="Common questions and answers about using the Pokémon Companion application"
        />
        <meta
          name="keywords"
          content="pokemon, faq, pokedex, mern stack, graphql"
        />
        <link rel="canonical" href="https://poke-companion.com/faq" />
      </Helmet>
      <header>
        <h1 className="header">Frequently Asked Questions</h1>
      </header>

      <section className="faq-container">
        <div className="faq-item">
          <h2 className="faq-header">History</h2>
          <section className="panel-faq">
            <p className="padding-bottom">
              <span className="panel-faq-span">
                Pokémon Companion started as a project during my time at the
                University of Columbia.
              </span>{" "}
              It's first iteration was called{" "}
              <span className="panel-faq-span">"DexPedia"</span> and used only{" "}
              <span className="panel-faq-span">HTML, CSS, and JavaScript</span>.
              DexPedia was exclusively a Pokédex wedpage designed for mobile and
              deployed using GitHub Pages.{" "}
              <span className="panel-faq-span">
                Pokémon Companion is now a reactive application that is built
                using the MERN stack and GraphQL.
              </span>
            </p>
            <p className="panel-faq-span">
              You can view DexPedia{" "}
              <a
                href="https://josefalcongh.github.io/dex-pedia/"
                className="hover:underline panel-home-span"
                aria-label="Developer's Instagram"
              >
                here!
              </a>
            </p>
          </section>
          <h2 className="faq-header">Frequently Asked Questions</h2>
          <section className="panel-faq">
            <p className="panel-faq-question padding-bottom">
              What is the purpose of this application?
            </p>
            <section className="panel-faq-answer">
              <p className="padding-bottom">
                <span className="panel-faq-answer-span">
                  This application is designed to display comprehensive Pokémon
                  data by fetching it from the PokéAPI and storing it in a
                  MongoDB database.
                </span>{" "}
                It allows users to view and interact with data such as Pokémon
                stats, abilities, types, evolution chains, and more.
              </p>
              <p>
                <span className="panel-faq-answer-span">
                  Pokémon Companion also serves as a platform for honing my
                  skills as a web developer, particularly in building
                  full-stack, scalable applications.
                </span>
              </p>
            </section>
            <p className="panel-faq-question padding-top padding-bottom">
              Which technologies are used in the application?
            </p>
            <section className="panel-faq-answer">
              <p className="padding-bottom">
                This application is built using the{" "}
                <span className="panel-faq-span">MERN stack:</span>
                <div class="tech-stack">
                  <p className="tabbing">
                    <strong>- MongoDB</strong>: For storing Pokémon data fetched
                    from the PokéAPI.
                  </p>
                  <p className="tabbing">
                    <strong>- Express</strong>: Backend framework for handling
                    routes and API requests.
                  </p>
                  <p className="tabbing">
                    <strong>- React</strong>: Frontend library for building the
                    user interface.
                  </p>
                  <p className="tabbing padding-bottom">
                    <strong>- Node.js</strong>: Server-side environment to run
                    the backend.
                  </p>
                  <p className="tabbing">
                    <strong>- GraphQL</strong>: Used to query and mutate Pokémon
                    data from the backend efficiently.
                  </p>
                  <p className="tabbing">
                    <strong>
                      {" "}
                      <a
                        href="https://pokeapi.co"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        -PokéAPI:
                      </a>
                    </strong>{" "}
                    a RESTful Pokémon API.
                  </p>
                </div>
              </p>
              <p className="panel-faq-answer-span">
                This project allows me to experiment with best practices in both
                frontend and backend development, refine my knowledge of
                database management, and enhance the scalability and efficiency
                of modern web applications.
              </p>
            </section>
            <p className="panel-faq-question padding-top padding-bottom">
              Why use MongoDB to store Pokémon data?
            </p>
            <section className="panel-faq-answer">
              <p className="padding-bottom">
                <span className="panel-faq-answer-span">
                  MongoDB provides a flexible NoSQL structure,
                </span>{" "}
                which is ideal for storing Pokémon data with complex
                relationships, such as types, abilities, evolution chains, and
                stats. It allows for efficient querying and supports dynamic
                data structures like the ones returned from the PokéAPI.
              </p>
              The app uses a script that fetches Pokémon data from the PokéAPI
              using <span className="italic">node-fetch</span>. The fetched data
              is then processed and stored in MongoDB for persistent storage.
              <span className="panel-faq-answer-span">
                This allows faster access to data, reducing dependency on
                external API limits and avoiding potential rate limiting from
                the PokéAPI.
              </span>
            </section>
            <p className="panel-faq-question padding-top padding-bottom">
              Is authentication required to use the app?
            </p>
            <section className="panel-faq-answer">
              <p>
                <span className="panel-faq-answer-span">
                  Currently, the app is publicly accessible,
                </span>{" "}
                but plans are in place to introduce user authentication for
                features like personalized Pokémon lists, team building,
                leaderboards, etc.{" "}
                <span className="panel-faq-answer-span">
                  JWT tokens will be used for secure authentication.
                </span>
              </p>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
}
