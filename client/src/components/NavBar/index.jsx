import { useState, useEffect, useRef } from "react";
import pokedex from "../../assets/icons/pokedex.svg";
import crown from "../../assets/icons/crown.svg";
import game from "../../assets/icons/game.svg";
import trainer from "../../assets/icons/trainer.svg";

import DataDropdown from "../Dropdowns/DataDropdown";

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
              <div
                className={`navbar-sub-menu ${
                  activeItem === "data" ? "visible" : ""
                }`}
              >
                <DataDropdown isVisible={activeItem === "data"} />
              </div>
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
                activeItem === "world cs" ? "active" : ""
              }`}
              onClick={() => handleItemClick("world cs")}
            >
              <a className="navbar-menu-heading" title="World CS">
                <img src={crown} alt="World CS" className="navbar-icon" />
                <span className="navbar-text">World CS</span>
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
