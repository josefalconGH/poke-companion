import React from "react";
import "./style.css";

export default function GamesDropdown({ isVisible }) {
  if (!isVisible) return null;

  return (
    <ul className="dropdown-menu" role="menu">
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 9">
          Generation 9 (ScVi)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 8">
          Generation 8 (SwSh)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 7">
          Generation 7 (SuMo-USUM)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 6">
          Generation 6 (XY-ORAS)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 5">
          Generation 5 (BW-B2W2)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 4">
          Generation 4 (DP-Pt-HGSS)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 3">
          Generation 3 (RS-E-FRLG)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 2">
          Generation 2 (GS-C)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 1">
          Generation 1 (RB-Y)
        </a>
      </li>
    </ul>
  );
}
