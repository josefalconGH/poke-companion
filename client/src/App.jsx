// Purpose: App component to render the application
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import "../src/index.css";
import status200 from "./assets/images/status-200.png";
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <NavBar />
      <main className="flex-grow flex justify-center items-center">
        <div className="flex justify-center items-center">
          <img src={status200} alt="status-200" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

// export the App component
export default App;
