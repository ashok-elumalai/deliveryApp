// App.js

import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";
import RegistrationPage from "./pages/RegistrationPage";
import UserLoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RestaurantDetails from "./pages/RestaurantDetails";
import RestaurantLoginPage from "./pages/RestaurantLoginPage";
import CheckoutPage from "./pages/Checkout";

const useAuth = () => {
  // Replace this with your actual authentication logic
  const token = localStorage.getItem("token"); // Example: user is logged in
  return !!token;
};

const CommonRoute = () => {
  return <Outlet />;
};

const PrivateRoute = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login/user" />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <CommonRoute />,
    children: [
      {
        path: "/login/user",
        element: <UserLoginPage />,
      },
      {
        path: "/login/restaurant",
        exact: true,
        element: <RestaurantLoginPage />,
      },
      {
        path: "/login/delivery-partner",
        exact: true,
        element: <UserLoginPage />,
      },
      {
        path: "/login",
        element: <UserLoginPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/user",
    element: <PrivateRoute />, // This will act as a guard
    children: [
      {
        path: "/user/home",
        element: <Dashboard />,
      },
      {
        path: "/user/restaurant/:id",
        element: <RestaurantDetails />,
      },
      {
        path: "/user/checkout",
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "/restaurant",
    element: <PrivateRoute />, // This will act as a guard
    children: [
      {
        path: "/restaurant/home",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/delivery-partner",
    element: <PrivateRoute />, // This will act as a guard
    children: [
      {
        path: "/delivery-partner/home",
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
