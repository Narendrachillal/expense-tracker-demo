import { Button, Container, Typography } from "@mui/material";
import React from "react";
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
        margin: "150px 50px",
      }}
    >
      <Typography variant="h2">Welcome to Expense Tracker</Typography>
      <Button component={Link} to="/register">
        Please create a Account
      </Button>
    </Container>
  );
};

export default Welcome;
