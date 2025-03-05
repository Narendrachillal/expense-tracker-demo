import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  return user || token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
