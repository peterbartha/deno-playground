import { createMuiTheme } from '@material-ui/core/styles';

// Custom Material Theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#3f51b5',
    },
    error: {
      main: '#eb5d63',
    },
    warning: {
      main: '#ffc05c',
    },
    info: {
      main: '#0080c5',
    },
    success: {
      main: '#05a985',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
