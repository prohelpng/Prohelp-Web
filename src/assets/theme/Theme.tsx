import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0066F5",
      light: '#0066f51d'
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
    MuiContainer: {
      styleOverrides: {
        root: {
          width: '90%'
        }
      }
    }
  },
});

export default theme;