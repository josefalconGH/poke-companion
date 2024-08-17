// Purpose: NavBar component to render the navbar
import pokedex from "../../assets/icons/pokedex.svg";
import crown from "../../assets/icons/crown.svg";
import game from "../../assets/icons/game.svg";
import trainer from "../../assets/icons/trainer.svg";
import search from "../../assets/icons/search.svg";

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-b from-neutral-700 to-neutral-950 pt-1 pb-2 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-between flex-1 w-full md:w-auto">
          <a
            href="#"
            className="navbar-custom font-semibold text-zinc-100 flex flex-col items-center"
          >
            <img src={pokedex} alt="Data" className="w-8 h-8" />
            <span className="navbar-cutsom-text">Data</span>
          </a>
          <a
            href="#"
            className="navbar-custom font-semibold text-zinc-100 flex flex-col items-center"
          >
            <img src={crown} alt="Coronation" className="w-8 h-8" />
            <span className="navbar-cutsom-text">Coronation</span>
          </a>
          <a
            href="#"
            className="navbar-custom font-semibold text-zinc-100 flex flex-col items-center"
          >
            <img src={game} alt="Games" className="w-8 h-8" />
            <span className="navbar-cutsom-text">Games</span>
          </a>
          <a
            href="#"
            className="navbar-custom font-semibold text-zinc-100 flex flex-col items-center"
          >
            <img src={trainer} alt="Login/Signup" className="w-8 h-8" />
            <span className="navbar-cutsom-text">Login</span>
          </a>
        </div>
        <div className="w-full md:w-auto mt-1 md:mt-0 md:ml-4 relative">
          <input
            type="text"
            placeholder="Search"
            className="font-semibold w-full md:w-60 bg-neutral-400 text-neutral-900 placeholder-neutral-900 rounded-md px-3 py-1 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <img
              src={search}
              alt="Search Icon"
              className="w-5 h-5 text-gray-400"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
