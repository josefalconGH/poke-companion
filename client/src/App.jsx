// Purpose: App component to render the application
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoadingAnimation from "./components/Loading/LoadingAnimation";

import "../src/index.css";

function App() {
  // State to manage loading
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
        setFadeIn(true);
      }, 500);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      document.body.style.transition =
        "background-image 1s ease, background-color 1s ease";
      document.body.style.backgroundImage = `repeating-linear-gradient(
        135deg,
        var(--light-overlay) 0,
        var(--light-overlay) 15px,
        var(--dark-overlay) 15px,
        var(--dark-overlay) 30px
      )`;
      document.body.style.backgroundSize = "cover, 40px 40px";
      document.body.style.backgroundBlendMode = "multiply";
    } else {
      document.body.style.backgroundImage = "none";
    }
  }, [isLoading]);

  return (
    <div
      className={`min-h-screen flex flex-col ${isLoading ? "bg-loading" : ""} ${
        fadeIn ? "fade-in" : ""
      }`}
      style={{
        backgroundColor: isLoading ? "#bebebe" : "transparent",
      }}
    >
      {isLoading ? (
        <div className={`loading-wrapper ${fadeOut ? "fade-out" : ""}`}>
          <LoadingAnimation />
        </div>
      ) : (
        <>
          <header>
            <Hero />
            <NavBar />
          </header>
          <main className="flex-grow flex justify-center">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

// export the App component
export default App;
