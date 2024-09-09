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
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoadingAnimation from "./components/Loading/LoadingAnimation";
import heroImage from "./assets/images/poke-companion.png";

import "../src/index.css";

function App() {
  // state to manage loading
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // function to preload image
  const preloadImage = (src, callback) => {
    const img = new Image();
    img.src = src;
    img.onload = callback;
  };

  const hasBeenMoreThanFiveMinutes = (lastVisit) => {
    const time = 5 * 60 * 1000;
    const now = Date.now();
    return now - lastVisit > time;
  };

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit || hasBeenMoreThanFiveMinutes(Number(lastVisit))) {
      // if it's the user's first time or it's been more than 5 minutes, show the loading animation
      preloadImage(heroImage, () => {
        setIsContentReady(true);
      });
    } else {
      // skip loading animation if the user visited within the last 5 minutes
      setIsLoading(false);
      setFadeIn(true);
    }
    // update the last visit time to the current time
    localStorage.setItem("lastVisit", Date.now().toString());
  }, []);

  useEffect(() => {
    if (isContentReady) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
          setFadeIn(true);
        }, 500);
      }, 2000);
    }
  }, [isContentReady]);

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
    <HelmetProvider>
      <div
        className={`min-h-screen flex flex-col ${
          isLoading ? "bg-loading" : ""
        } ${fadeIn ? "fade-in" : ""}`}
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
              <ScrollToTop />
              <Outlet />
            </main>
            <Footer />
          </>
        )}
      </div>
    </HelmetProvider>
  );
}

// export the App component
export default App;
