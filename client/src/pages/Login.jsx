import { useState, useContext } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axiosInstance";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", userData);
      login(data.token);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
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
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Email"
        fullWidth
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <Button variant="contained" sx={{ width: "200px" }} onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default Login;
