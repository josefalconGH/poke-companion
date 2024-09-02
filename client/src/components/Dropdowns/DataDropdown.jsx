import React from "react";
import "./style.css";

export default function DataDropdown({ isVisible }) {
  if (!isVisible) return null; // Do not render if not visible

  return (
    <ul className="dropdown-menu">
      <li className="dropdown-item">Pokédex</li>
      <li className="dropdown-item">Moves</li>
      <li className="dropdown-item">Type Chart</li>
      <li className="dropdown-item">Abilities</li>
      <li className="dropdown-item">Items</li>
      <li className="dropdown-item">Evo Chain</li>
      <li className="dropdown-item">Locations</li>
    </ul>
  );
}
