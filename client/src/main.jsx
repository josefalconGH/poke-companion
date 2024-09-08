// Purpose: main.jsx file to start the client
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Homepage from "./pages/Homepage";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";
import FAQ from "./pages/FAQ";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

// create a BrowserRouter instance
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/pokedex",
        element: <Pokedex />,
      },
      {
        path: "/pokedex/pokemon/:name",
        element: <Pokemon />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
    ],
  },
]);

// react-dom render
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
