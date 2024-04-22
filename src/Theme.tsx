import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#36393F',
      paper: '#2F3136',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B9BBBE',
    },
    primary: {
      main: '#7289DA',
    },
    secondary: {
      main: '#5865F2',
    },
    divider: '#202225',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#2F3136', 
          '& label.Mui-focused': {
            color: 'white', 
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', 
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', 
            },
          },
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          backgroundColor: '#2F3136'
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#2F3136'
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#FFFFFF'
        },
      },
    },
  },
});

export default theme;
