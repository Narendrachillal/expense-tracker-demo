import { createContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#0721b5" },
      background: {
        default: darkMode ? "#121212" : "#ede8e8",
        paper: darkMode ? "#1e1e1e" : "#f5f5f5",
      },
      text: { primary: darkMode ? "#ffffff" : "#000000" },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
