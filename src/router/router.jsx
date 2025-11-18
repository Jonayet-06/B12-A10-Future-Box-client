import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Components/Home/Home";
import RootLayouts from "../Layouts/RootLayouts";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import PublicHabits from "../Components/PublicHabits/PublicHabits";
import MyHabits from "../Components/MyHabits/MyHabits";
import AddHabits from "../Components/AddHabits/AddHabits";
import PrivateRoute from "../Routes/PrivateRoute";

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
      {
        path: "/publichabits",
        element: <PublicHabits></PublicHabits>,
      },
      {
        path: "/myhabits",
        element: <MyHabits></MyHabits>,
      },
      {
        path: "/addhabits",
        element: (
          <PrivateRoute>
            <AddHabits></AddHabits>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
