import React from "react";
import "./style.css";

export default function LoginDropdown({ isVisible }) {
  if (!isVisible) return null;

  return (
    <ul className="dropdown-menu" role="menu">
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Login">
          Login
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Register">
          Register
        </a>
      </li>
    </ul>
  );
}
