// Purpose: Footer component to render the footer
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link
          to="/faq"
          className="footer-item"
          aria-label="Frequently Asked Questions"
        >
          Frequently Asked Questions
        </Link>
        <p
          className="footer-font"
          aria-label="All content and design copyright"
        >
          Content/Design &copy; PokéCompanion 2024
        </p>
        <p
          className="footer-font"
          aria-label="Pokemon images and names copyright"
        >
          Pokémon Information &copy; 1995-2024 Game Freak
        </p>
      </div>
    </footer>
  );
}
