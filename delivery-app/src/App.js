// App.js

import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";
import RegistrationPage from "./pages/RegistrationPage";
import UserLoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RestaurantDetails from "./pages/RestaurantDetails";
import RestaurantLoginPage from './pages/RestaurantLoginPage';

const useAuth = () => {
	// Replace this with your actual authentication logic
	const token = localStorage.getItem('token'); // Example: user is logged in
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
    ],
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
