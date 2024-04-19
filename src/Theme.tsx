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
          backgroundColor: '#2F3136', // Use color from your theme
          '& label.Mui-focused': {
            color: 'white', // This is for the label color when it is focused
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', // This is for the border color
            },
            '&:hover fieldset': {
              borderColor: 'white', // This is for the border color when hovered
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // This is for the border color when the input is focused
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
