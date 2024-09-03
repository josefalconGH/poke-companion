// Purpose: Footer component to render the footer
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <a
          href="#"
          className="footer-item"
          aria-label="Frequently Asked Questions"
        >
          Frequently Asked Questions
        </a>
        <p
          className="footer-font"
          aria-label="All content and design copyright"
        >
          All content & design &copy; PokéCompanion 2024.
        </p>
        <p
          className="footer-font"
          aria-label="Pokemon images and names copyright"
        >
          Pokémon images & names &copy; 1995-2024 Game Freak.
        </p>
      </div>
    </footer>
  );
}
