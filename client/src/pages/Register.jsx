import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import API from "../api/axiosInstance";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const { data } = await API.post("/auth/register", userData);
      alert("Registration successful! ");
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
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
        defaultValue={""}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      <TextField
        label="Email"
        fullWidth
        defaultValue={""}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        defaultValue={""}
        fullWidth
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
};

export default Register;
