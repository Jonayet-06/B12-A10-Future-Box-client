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
import HabitDetails from "../Components/HabitDetails/HabitDetails";
import ErrorPage from "../Components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts></RootLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "habitdetails/:id",
        loader: () =>
          fetch(`https://b12-a10-future-box-server-omega.vercel.app//habits`),
        element: (
          <PrivateRoute>
            <HabitDetails></HabitDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/myhabits",
        element: (
          <PrivateRoute>
            <MyHabits></MyHabits>
          </PrivateRoute>
        ),
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
