import React from "react";
import Lottie from "react-lottie-player";
import pokeballAnimation from "../../assets/json/PokeballLoading.json";

import "./style.css";

export default function LoadingAnimation() {
  return (
    <div className="loading-screen">
      <h1 className="loading-text">Welcome to PokéCompanion</h1>
      <Lottie
        loop
        animationData={pokeballAnimation}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
}
