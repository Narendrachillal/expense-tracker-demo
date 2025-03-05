import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../context/ThemeContex";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
          }}
          component={Link}
          to="/"
          onClick={() => window.location.reload()} // Refresh the page when clicked
        >
          Expense Tracker
        </Typography>
        <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {user ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <>
            <Button component={Link} to="login" color="inherit">
              Login
            </Button>
            <Button component={Link} color="inherit" to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
