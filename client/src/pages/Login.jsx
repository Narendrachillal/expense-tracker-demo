import { useState, useContext } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axiosInstance";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", userData);
      login(data.token);
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container
      sx={{
        maxWidth: "90%",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        padding: "20px",
        boxShadow: 3,
        borderRadius: "8px",
        bgcolor: "background.paper",
        mt: "50px",
      }}
    >
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Email"
        fullWidth
        variant="outlined"
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        variant="outlined"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <Button
        variant="contained"
        sx={{ width: "100%", py: 1.2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
