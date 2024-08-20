import { useState } from "react";
import pokedex from "../../assets/icons/pokedex.svg";
import crown from "../../assets/icons/crown.svg";
import game from "../../assets/icons/game.svg";
import trainer from "../../assets/icons/trainer.svg";
import pokeball from "../../assets/icons/pokeball.svg";

export default function NavBar() {
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  return (
    <nav className="bg-gradient-to-b from-neutral-700 to-neutral-950 pt-1 pb-2 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {!searchActive && (
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
              <img src={crown} alt="Tournament" className="w-8 h-8" />
              <span className="navbar-cutsom-text">Tournament</span>
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
        )}
      </div>
    </nav>
  );
}
