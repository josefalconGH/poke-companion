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
    <nav className="navbar">
      <div className="navbar-container">
        {!searchActive && (
          <ul className="navbar-menu">
            <li className="navbar-item">
              <a href="#" className="navbar-link" title="Data">
                <img src={pokedex} alt="Data" className="navbar-icon" />
                <span className="navbar-text">Data</span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="#" className="navbar-link" title="Tournament">
                <img src={crown} alt="Tournament" className="navbar-icon" />
                <span className="navbar-text">Tournament</span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="#" className="navbar-link" title="Games">
                <img src={game} alt="Games" className="navbar-icon" />
                <span className="navbar-text">Games</span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="#" className="navbar-link" title="Login">
                <img src={trainer} alt="Login/Signup" className="navbar-icon" />
                <span className="navbar-text">Login</span>
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
