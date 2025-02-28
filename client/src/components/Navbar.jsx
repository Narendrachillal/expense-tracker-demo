import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>
        {user ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button color="inherit" href="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
