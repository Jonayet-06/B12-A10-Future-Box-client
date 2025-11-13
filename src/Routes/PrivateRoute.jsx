import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading/Loading";
import { useNavigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const Navigate = useNavigate();
  if (loading) {
    return <Loading></Loading>;
  }
  if (user.email) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
