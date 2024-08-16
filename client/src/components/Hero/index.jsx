// Purpose: Hero component to render the hero section
import React from "react";
import pokeCompanionSM from "../../assets/images/poke-companion-sm.png";
import pokeCompanionSMEdge from "../../assets/images/poke-companion-sm-edge.png";
import pokeCompanionMD from "../../assets/images/poke-companion-md.png";

const Hero = () => {
  return (
    <div className="hero-container">
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${pokeCompanionSMEdge})`,
        }}
      />
      <img
        src={pokeCompanionSM}
        alt="poke-companion-sm"
        className="hero-image"
      />
    </div>
  );
};

// export the Hero component
export default Hero;
