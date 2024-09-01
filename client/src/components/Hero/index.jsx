// Purpose: Hero component to render the hero section
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom
import pokeCompanionSM from "../../assets/images/poke-companion-sm.png";
import pokeCompanionSMEdge from "../../assets/images/poke-companion-sm-edge.png";

const Hero = () => {
  const navigate = useNavigate(); // useNavigate hook

  const handleImageClick = () => {
    navigate("/"); // navigate to the homepage
  };

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
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

// Export the Hero component
export default Hero;
