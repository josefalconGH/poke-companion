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

function App() {
  return (
    <div className="App">
      <Hero />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// export the App component
export default App;
