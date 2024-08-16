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
import Footer from "./components/Footer";
import "../src/index.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <main className="flex-grow"></main>
      <Footer />
    </div>
  );
}

// export the App component
export default App;
