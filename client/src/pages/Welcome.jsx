import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
        margin: { xs: "100px 20px", sm: "150px 50px" }, // Responsive margin
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem" } }}
      >
        Welcome to Expense Tracker
      </Typography>
      <Button
        component={Link}
        to="/register"
        variant="contained"
        color="primary"
        sx={{
          fontSize: { xs: "0.9rem", sm: "1rem" },
          padding: { xs: "8px 16px", sm: "10px 20px" },
        }}
      >
        Create an Account
      </Button>
    </Container>
  );
};

export default Welcome;
