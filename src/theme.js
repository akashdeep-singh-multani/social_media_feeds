// theme.js - Centralized Theme file for Material-UI
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "12px 20px",
          borderRadius: "8px",
          textTransform: "none", // Prevents all buttons from being uppercase
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px", // Consistent margin for text fields
        },
      },
    },
  },
});

export default theme;
