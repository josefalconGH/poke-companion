import React from "react";
import "./style.css";

export default function DataDropdown({ isVisible }) {
  if (!isVisible) return null;

  return (
    <ul className="dropdown-menu" role="menu">
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="View Pokédex">
          Pokédex
        </a>
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
