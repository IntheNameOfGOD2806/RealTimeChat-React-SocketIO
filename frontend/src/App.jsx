// import { useState } from 'react'

import "./App.css";
import { Toaster } from "react-hot-toast";
import Home from "./components/home/Home";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import { useAuthContext } from "../context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element:  authUser ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      element: authUser ? <Navigate to="/" /> : <Signup />,
    },
  ]);
  return (
    <>
      <div className="p-6 h-screen flex flex-col items-center justify-center">
        <RouterProvider router={router} />
        <Toaster />.
      </div>
    </>
  );
}

export default App;
