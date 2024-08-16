// Purpose: Hero component to render the hero section
import React from "react";
import pokeCompanionSM from "../../assets/images/poke-companion-sm.png";
import pokeCompanionMD from "../../assets/images/poke-companion-md.png";

const Hero = () => {
  return (
    <div className="hero-container">
      <img
        src={pokeCompanionSM}
        alt="poke-companion-sm"
        className="hero-image"
      />
    </div>
  );
};

export default Hero;
