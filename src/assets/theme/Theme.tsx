import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0066F5",
      light: "#0066f51d",
    },
    secondary: {
      main: "#bbb",
      light: "#f5f5f8",
    },
    info: {
      main: "#07B4B4",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            border: "none", // Remove the border
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: "86%",
          maxWidth: "90%",
        },
        disableGutters: true,
      },
    },
    MuiAvatar: {
      styleOverrides: {
        circular: {
          ":root": {
            border: "2px solid",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          border: "none",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          disableUnderline: true,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "0.4px solid",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textAlign: "left",
          justifyContent: "start",
        },
      },
    },
  },
});

export default theme;
