import React from "react";

export default function GamesDropdown({ isVisible }) {
  if (!isVisible) return null;

  return (
    <ul className="dropdown-menu" role="menu">
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 9 (ScVi)">
          Generation 9 (ScVi)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 8 (SwSh)">
          Generation 8 (SwSh)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 7 (SuMo-USUM)">
          Generation 7 (SuMo-USUM)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 6 (XY-ORAS)">
          Generation 6 (XY-ORAS)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 5 (BW-B2W2)">
          Generation 5 (BW-B2W2)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 4 (DP-Pt-HGSS)">
          Generation 4 (DP-Pt-HGSS)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 3 (RS-E-FRLG)">
          Generation 3 (RS-E-FRLG)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 2 (GS-C)">
          Generation 2 (GS-C)
        </a>
      </li>
      <li className="dropdown-item" role="menuitem">
        <a href="#" title="Generation 1 (RB-Y)">
          Generation 1 (RB-Y)
        </a>
      </li>
    </ul>
  );
}
