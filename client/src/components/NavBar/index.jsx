import { useState, useEffect, useRef } from "react";
import pokedex from "../../assets/icons/pokedex.svg";
import game from "../../assets/icons/game.svg";
import star from "../../assets/icons/star.svg";
import umbreon from "../../assets/icons/umbreon.svg";

import DataDropdown from "../Dropdowns/DataDropdown";
import GamesDropdown from "../Dropdowns/GamesDropdown";
import WorldCSDropdown from "../Dropdowns/WorldCSDropdown";
import LoginDropdown from "../Dropdowns/LoginDropdown";

import "./style.css";

export default function NavBar() {
  const [searchActive, setSearchActive] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const navbarRef = useRef(null);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleItemClick = (item) => {
    if (activeItem === item) {
      // If the same item is clicked again, close the dropdown
      setActiveItem(null);
    } else {
      // Otherwise, open the dropdown for the clicked item
      setActiveItem(item);
    }
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
            {/* Data Menu Item */}
            <li
              className={`navbar-item ${activeItem === "data" ? "active" : ""}`}
              onClick={() => handleItemClick("data")}
            >
              <div className="navbar-menu-heading" title="Data">
                <img src={pokedex} alt="Data" className="navbar-icon" />
                <span className="navbar-text">Data</span>
              </div>
              <div
                className={`navbar-sub-menu ${
                  activeItem === "data" ? "visible" : ""
                }`}
              >
                <DataDropdown isVisible={activeItem === "data"} />
              </div>
            </li>

            {/* Games Menu Item */}
            <li
              className={`navbar-item ${
                activeItem === "games" ? "active" : ""
              }`}
              onClick={() => handleItemClick("games")}
            >
              <div className="navbar-menu-heading" title="Games">
                <img src={game} alt="Games" className="navbar-icon" />
                <span className="navbar-text">Games</span>
              </div>
              <div
                className={`navbar-sub-menu navbar-sub-menu-games ${
                  activeItem === "games" ? "visible" : ""
                }`}
              >
                <GamesDropdown isVisible={activeItem === "games"} />
              </div>
            </li>

            {/* World CS Menu Item */}
            <li
              className={`navbar-item ${
                activeItem === "world cs" ? "active" : ""
              }`}
              onClick={() => handleItemClick("world cs")}
            >
              <div className="navbar-menu-heading" title="World CS">
                <img src={star} alt="World CS" className="navbar-icon" />
                <span className="navbar-text">World CS</span>
              </div>
              <div
                className={`navbar-sub-menu navbar-sub-menu-world-cs ${
                  activeItem === "world cs" ? "visible" : ""
                }`}
              >
                <WorldCSDropdown isVisible={activeItem === "world cs"} />
              </div>
            </li>
            {/* Login Menu Item */}
            <li
              className={`navbar-item ${
                activeItem === "login" ? "active" : ""
              }`}
              onClick={() => handleItemClick("login")}
            >
              <div className="navbar-menu-heading" title="Login">
                <img src={umbreon} alt="Login/Signup" className="navbar-icon" />
                <span className="navbar-text">Login</span>
              </div>
              <div
                className={`navbar-sub-menu navbar-sub-menu-login ${
                  activeItem === "login" ? "visible" : ""
                }`}
              >
                <LoginDropdown isVisible={activeItem === "login"} />
              </div>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
