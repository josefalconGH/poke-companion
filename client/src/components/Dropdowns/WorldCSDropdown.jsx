import React from "react";
import comingSoon from "../../assets/icons/coming-soon.svg";

export default function WorldCSDropdown({ isVisible }) {
  if (!isVisible) return null;

  return (
    <ul className="dropdown-menu" role="menu">
      {/* Coming Soon Divider */}
      <li className="dropdown-divider" role="separator">
        <span>Coming Soon -</span>
        <img src={comingSoon} alt="Coming Soon" className="coming-soon-icon" />
      </li>
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
