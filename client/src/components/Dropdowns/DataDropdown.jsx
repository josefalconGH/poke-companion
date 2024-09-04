import React from "react";
import { Link } from "react-router-dom";
import comingSoon from "../../assets/icons/coming-soon.svg";

export default function DataDropdown({ isVisible }) {
  if (!isVisible) return null;

  return (
    <ul className="dropdown-menu" role="menu">
      <Link to="/pokedex" title="View Pokédex">
        <li className="dropdown-item" role="menuitem">
          <a title="View Pokédex">Pokédex</a>
        </li>
      </Link>
      {/* Coming Soon Divider */}
      <li className="dropdown-divider" role="separator">
        <span>Coming Soon -</span>
        <img src={comingSoon} alt="Coming Soon" className="coming-soon-icon" />
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="View Moves">
          Moves
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="View Type Chart">
          Type Chart
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="View Abilities">
          Abilities
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="View Items">
          Items
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="View Evolution Chain">
          Evo Chain
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="View Locations">
          Locations
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="View Training (EVs)">
          Training (EVs)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="View Breeding">
          Breeding
        </a>
      </li>
    </ul>
  );
}
