import { Container, Link, Typography } from "@mui/material";
import React from "react";

const Welcome = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin:"150px 50px"
      }}
    >
      <Typography variant="h2">Welcome to Expense Tracker</Typography>
      <Link href="/register" underline="none">
        Please create a Account
      </Link>
    </Container>
  );
};

export default Welcome;
