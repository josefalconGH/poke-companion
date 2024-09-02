import { useState } from "react";
import pokedex from "../../assets/icons/pokedex.svg";
import crown from "../../assets/icons/crown.svg";
import game from "../../assets/icons/game.svg";
import trainer from "../../assets/icons/trainer.svg";

export default function NavBar() {
  const [searchActive, setSearchActive] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {!searchActive && (
          <ul className="navbar-menu">
            <li
              className={`navbar-item ${activeItem === "Data" ? "active" : ""}`}
              onClick={() => handleItemClick("Data")}
            >
              <a className="navbar-menu-heading" title="Data">
                <img src={pokedex} alt="Data" className="navbar-icon" />
                <span className="navbar-text">Data</span>
              </a>
            </li>
            <li
              className={`navbar-item ${
                activeItem === "World CS" ? "active" : ""
              }`}
              onClick={() => handleItemClick("World CS")}
            >
              <a className="navbar-menu-heading" title="World CS">
                <img src={crown} alt="World CS" className="navbar-icon" />
                <span className="navbar-text">World CS</span>
              </a>
            </li>
            <li
              className={`navbar-item ${
                activeItem === "Games" ? "active" : ""
              }`}
              onClick={() => handleItemClick("Games")}
            >
              <a className="navbar-menu-heading" title="Games">
                <img src={game} alt="Games" className="navbar-icon" />
                <span className="navbar-text">Games</span>
              </a>
            </li>
            <li
              className={`navbar-item ${
                activeItem === "Login" ? "active" : ""
              }`}
              onClick={() => handleItemClick("Login")}
            >
              <a className="navbar-menu-heading" title="Login">
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
