// Purpose: Hero component to render the hero section
import React from "react";
import { useNavigate } from "react-router-dom";
import pokeCompanionWebP from "../../assets/images/poke-companion.webp";
import pokeCompanionTrimWebP from "../../assets/images/poke-companion-trim.webp";
import pokeCompanion from "../../assets/images/poke-companion.png";
import pokeCompanionTrim from "../../assets/images/poke-companion-trim.png";

const Hero = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/");
  };

  return (
    <div className="hero-container">
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${pokeCompanionTrimWebP})`,
        }}
      />
      <picture>
        <source
          srcSet={`${pokeCompanionTrimWebP} 300w, ${pokeCompanionWebP} 600w`}
          sizes="(max-width: 600px) 300px, 600px"
          type="image/webp"
        />
        <img
          src={pokeCompanion}
          srcSet={`${pokeCompanionTrim} 300w, ${pokeCompanion} 600w`}
          sizes="(max-width: 600px) 300px, 600px"
          alt="poke-companion-sm"
          className="hero-image"
          onClick={handleImageClick}
          loading="lazy"
          style={{ cursor: "pointer" }}
        />
      </picture>
    </div>
  );
};

// Export the Hero component
export default React.memo(Hero);
