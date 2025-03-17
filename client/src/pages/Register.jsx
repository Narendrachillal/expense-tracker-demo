import { useContext, useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify"; // Import Toast
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const { data } = await API.post("/auth/register", userData);

      toast.success("Registration successful! Redirecting..."); // Success notification

      localStorage.setItem("token", data.token);
      setUser(true); // Set user as logged in

      setTimeout(() => navigate("/dashboard"), 2000); // Delay navigation slightly for better UX
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed"); // Error notification
    }
  };

  return (
    <Container
      sx={{
        maxWidth: { xs: "90%", sm: "500px" }, // Adjust width based on screen size
        display: "flex",
        flexDirection: "column",
        gap: 2, // Adjusted gap for better spacing
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h4" textAlign="center">
        Register
      </Typography>

      <TextField
        label="Name"
        fullWidth
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      <TextField
        label="Email"
        fullWidth
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />

      <Button
        variant="contained"
        sx={{ width: { xs: "100%", sm: "200px" } }} // Full-width button on mobile
        onClick={handleRegister}
      >
        Register
      </Button>
    </Container>
  );
};

export default Register;
