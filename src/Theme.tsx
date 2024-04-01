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
});

export default theme;
