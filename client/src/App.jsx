import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContextProvider } from "./context/ThemeContex";

const App = () => {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer position="top-right" autoClose={1000} />
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  );
};

export default App;
