import {
  Button,
  createMuiTheme,
  FormControlLabel,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
} from '@material-ui/core';
import { ExpandMore, PlayArrow } from '@material-ui/icons';
import React from 'react';
import styles from '../styles/Toolbar.module.scss';

const Toolbar = (): JSX.Element => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [shareAnchor, setShareAnchor] = React.useState<null | HTMLElement>(
    null
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenShareMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShareAnchor(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchor(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#05A985',
        contrastText: '#fff',
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
        fontSize: '1.4rem',
        textTransform: 'none',
      },
    },
  });

  return (
    <menu className={styles.toolbar}>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" startIcon={<PlayArrow />}>
          Run
        </Button>
      </ThemeProvider>

      <Button variant="contained" color="primary">
        Format
      </Button>

      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpenShareMenu}
        variant="contained"
        color="primary"
        endIcon={<ExpandMore />}
      >
        Export
      </Button>

      <Menu
        anchorEl={shareAnchor}
        keepMounted
        open={Boolean(shareAnchor)}
        onClose={handleShareClose}
      >
        <MenuItem onClick={handleShareClose}>
          Tweet link to Deno Playground
        </MenuItem>
        <hr />
        <MenuItem onClick={handleShareClose}>Copy as Markdown Issue</MenuItem>
        <MenuItem onClick={handleShareClose}>Copy as Markdown Link</MenuItem>
        <MenuItem onClick={handleShareClose}>
          Copy as Markdown Link with preview
        </MenuItem>
        <hr />
        <MenuItem onClick={handleShareClose}>
          Open in TypeScript AST viewer
        </MenuItem>
        <MenuItem onClick={handleShareClose}>Open in StackBlitz</MenuItem>
      </Menu>

      <Button variant="contained" color="primary">
        Share
      </Button>

      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
        color="primary"
        endIcon={<ExpandMore />}
      >
        Examples
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Hello Land</MenuItem>
        <MenuItem onClick={handleClose}>Import and export modules</MenuItem>
        <MenuItem onClick={handleClose}>WebAssembly</MenuItem>
      </Menu>

      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Use unstable APIs"
      />

      <div className={styles.placeholder} />

      <a
        href="https://github.com/denoland/deno/releases/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Deno v1.8.3
      </a>
    </menu>
  );
};

export default Toolbar;
