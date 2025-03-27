// import { useState } from 'react'

import { Toaster } from "react-hot-toast";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import { useAuthContext } from "./context/AuthContext";
import Profile from "./components/Profile/Profile";

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
      path: "/login/1",
      element:  <Login />,
    },
    {
      path: "/profile",
      element:  authUser ? <Profile /> : <Navigate to="/login" />,
    },
    {
      path: "/signup",
      element: authUser ? <Navigate to="/" /> : <Signup />,
    },
  ]);
  return (
    <>
      <div  className=" h-screen flex flex-col items-center  ">
        <RouterProvider router={router} />
        <Toaster />.
      </div>
    </>
  );
}

export default App;
