import { useState } from "react";
import pokedex from "../../assets/icons/pokedex.svg";
import crown from "../../assets/icons/crown.svg";
import game from "../../assets/icons/game.svg";
import trainer from "../../assets/icons/trainer.svg";

export default function NavBar() {
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  return (
    <nav className="bg-gradient-to-b from-neutral-700 to-neutral-950 pt-1 pb-1 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {!searchActive && (
          <ul className="flex justify-between flex-1 w-full md:w-auto">
            <li className="navbar-item">
              <a
                href="#"
                className="navbar-custom font-semibold text-zinc-100 flex flex-col items-center"
                title="Data"
              >
                <img src={pokedex} alt="Data" className="w-8 h-8" />
                <span className="navbar-cutsom-text">Data</span>
              </a>
            </li>
            <li className="navbar-item">
              <a
                href="#"
                className="navbar-custom font-semibold text-zinc-100 flex flex-col items-center"
                title="Tournament"
              >
                <img src={crown} alt="Tournament" className="w-8 h-8" />
                <span className="navbar-cutsom-text">Tournament</span>
              </a>
            </li>
            <li className="navbar-item">
              <a
                href="#"
                className="navbar-custom font-semibold text-zinc-100 flex flex-col items-center"
                title="Games"
              >
                <img src={game} alt="Games" className="w-8 h-8" />
                <span className="navbar-cutsom-text">Games</span>
              </a>
            </li>
            <li className="navbar-item">
              <a
                href="#"
                className="navbar-custom font-semibold text-zinc-100 flex flex-col items-center"
                title="Login"
              >
                <img src={trainer} alt="Login/Signup" className="w-8 h-8" />
                <span className="navbar-cutsom-text">Login</span>
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
