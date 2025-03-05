import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance"; // <-- Ensure this is your API instances
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const verifyUser = async (token) => {
    try {
      const { data } = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }, // Validate token
      });
      setUser(data.user); // Set user data
    } catch (error) {
      console.error("Session expired, please log in again.");
    }
  };
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true); // Set user as authenticated
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(true);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
