import React from "react";
import "./style.css";

export default function DataDropdown({ isVisible }) {
  if (!isVisible) return null;

  return (
    <ul className="dropdown-menu" role="menu">
      <li className="dropdown-item" role="menuitem">
        <a href="/pokedex" title="View Pokédex">
          Pokédex
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="/moves" title="View Moves">
          Moves
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="/type-chart" title="View Type Chart">
          Type Chart
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="/abilities" title="View Abilities">
          Abilities
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="/items" title="View Items">
          Items
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="/evo-chain" title="View Evolution Chain">
          Evo Chain
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="/locations" title="View Locations">
          Locations
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="/training" title="View Training (EVs)">
          Training (EVs)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="/breeding" title="View Breeding">
          Breeding
        </a>
      </li>
    </ul>
  );
}
