// App.js

import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RestaurantDetails from "./pages/RestaurantDetails";

const useAuth = () => {
	// Replace this with your actual authentication logic
	const token = localStorage.getItem('token'); // Example: user is logged in
	return !!token;
  };
  
const PrivateRoute = () => {
	const auth = useAuth();
	return auth ? <Outlet /> : <Navigate to="/login" />;
};

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
    element: <PrivateRoute />, // This will act as a guard
    children: [
		{
			path: "/",
			element: <Dashboard />,
		},
		{
			path: "/restaurant/:id",
			element: <RestaurantDetails />,
		},
    ],
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
