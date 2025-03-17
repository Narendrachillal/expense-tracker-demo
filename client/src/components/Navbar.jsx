import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContex";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  // const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo / Title */}
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
        >
          Expense Tracker
        </Typography>

        {/* Dark Mode Toggle */}
        <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {/* Auth Buttons - Responsive */}
        {user ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <>
            {location.pathname === "/login" ? (
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            ) : location.pathname === "/register" ? (
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  color="inherit"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Register
                </Button>
              </>
            )}
          </>
        )}

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          sx={{ display: { sm: "none" } }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Menu */}
      {menuOpen && (
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
            backgroundColor: "primary.dark",
            paddingBottom: 1,
          }}
        >
          {!user && (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Navbar;
