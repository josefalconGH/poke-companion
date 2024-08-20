// Purpose: Footer component to render the footer
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-neutral-700 to-neutral-950 text-white p-2">
      <div className="footer-custom text-left mb-2 ml-2">
        <a
          href="/about#privacy"
          className="font-bold text-zinc-100 hover:text-amber-200 underline inline-block mb-2"
        >
          Privacy Policy
        </a>
        <p className="footer-font font-semibold text-sm">
          All content & design &copy; PokéCompanion 2024.
        </p>
        <p className="footer-font font-semibold text-sm">
          Pokémon images & names &copy; 1995-2024 Game Freak.
        </p>
      </div>
    </footer>
  );
}
