import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0066F5",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            border: 'none', // Remove the border
          },
        },
      },
    },
  },
});

export default theme;