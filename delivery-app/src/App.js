// App.js

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RestaurantDetails from "./pages/RestaurantDetails";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/res",
    element: < RestaurantDetails />,
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
