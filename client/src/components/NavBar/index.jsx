import { useState, useEffect, useRef } from "react";
import pokedex from "../../assets/icons/pokedex.svg";
import crown from "../../assets/icons/crown.svg";
import game from "../../assets/icons/game.svg";
import trainer from "../../assets/icons/trainer.svg";

export default function NavBar() {
  const [searchActive, setSearchActive] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const navbarRef = useRef(null);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveItem(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        {!searchActive && (
          <ul className="navbar-menu">
            <li
              className={`navbar-item ${activeItem === "data" ? "active" : ""}`}
              onClick={() => handleItemClick("data")}
            >
              <a className="navbar-menu-heading" title="Data">
                <img src={pokedex} alt="Data" className="navbar-icon" />
                <span className="navbar-text">Data</span>
              </a>
            </li>
            <li
              className={`navbar-item ${
                activeItem === "tournament" ? "active" : ""
              }`}
              onClick={() => handleItemClick("tournament")}
            >
              <a className="navbar-menu-heading" title="Tournament">
                <img src={crown} alt="Tournament" className="navbar-icon" />
                <span className="navbar-text">Tournament</span>
              </a>
            </li>
            <li
              className={`navbar-item ${
                activeItem === "games" ? "active" : ""
              }`}
              onClick={() => handleItemClick("games")}
            >
              <a className="navbar-menu-heading" title="Games">
                <img src={game} alt="Games" className="navbar-icon" />
                <span className="navbar-text">Games</span>
              </a>
            </li>
            <li
              className={`navbar-item ${
                activeItem === "login" ? "active" : ""
              }`}
              onClick={() => handleItemClick("login")}
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
