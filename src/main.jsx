import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext.js'

import { AuthContextProvider } from "./context/AuthContext";

import Root from "./routes/Root"
import Index from "./routes/Index"
import About from "./routes/About"
import Login from "./routes/Login"
import Signup from "./routes/Signup"

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      { 
        index: true, 
        element: <Index /> 
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      }
    ]
  },
  
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);