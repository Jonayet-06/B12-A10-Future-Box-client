import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Components/Home/Home";
import RootLayouts from "../Layouts/RootLayouts";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts></RootLayouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
