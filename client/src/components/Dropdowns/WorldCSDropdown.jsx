import React from "react";

export default function WorldCSDropdown({ isVisible }) {
  if (!isVisible) return null;

  return (
    <ul className="dropdown-menu" role="menu">
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="World Coronation Series">
          World Coronation Series
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Rankings">
          Rankings
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Rules">
          Rules
        </a>
      </li>
    </ul>
  );
}
