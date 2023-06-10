import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";

import About from "./routes/About";
import Dashboard from "./routes/Dashboard";
import Index from "./routes/Index";
import Login from "./routes/Login";
import NewRecipe from "./routes/NewRecipe";
import Recipe from "./routes/Recipe";
import Root from "./routes/Root";
import Search from "./routes/Search";
import Signup from "./routes/Signup";

import "./index.css";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        index: true,
        loader: async () => {
          let url = `/api/`;
          const res = await fetch(url);
          const data = await res.json();
          return data;
        },
        element: <Index />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: ":userId",
        element: <Dashboard />,
      },
      {
        path: "/:userId/:recipeId",
        element: <Recipe />,
      },
      {
        path: "/:userId/create",
        loader: null,
        element: <NewRecipe />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
