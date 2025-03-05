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

      toast.success(" Registration successful! Redirecting..."); //  Success notification

      localStorage.setItem("token", data.token);
      setUser(true); // Set user as logged in

      setTimeout(() => navigate("/dashboard"), 2000); // Delay navigation slightly for better UX
    } catch (error) {
      toast.error(error.response?.data?.message || " Registration failed"); //  Error notification
    }
  };

  return (
    <Container
      sx={{
        width: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Register</Typography>
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

      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
};

export default Register;
