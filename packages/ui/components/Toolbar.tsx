import {
  Button,
  createMuiTheme,
  Menu,
  MenuItem,
  Snackbar,
  ThemeProvider,
} from '@material-ui/core';
import { ExpandMore, PlayArrow } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useCallback } from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { ExampleId, getExampleSourceCode } from '../services/request';
import styles from '../styles/Toolbar.module.scss';

type Props = {
  onRun: () => void;
  onFormat: () => void;
  onLoadExample: (sourceCode: string) => void;
};

const Toolbar = ({ onRun, onFormat, onLoadExample }: Props): JSX.Element => {
  const [alertReason, setAlertReason] = React.useState<string>('');

  const handleSnackClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertReason('');
  };

  const alerts = new Map<string, JSX.Element>([
    [
      'copied',
      <Alert onClose={handleSnackClose} severity="success" key="alert-copied">
        URL copied to clipboard
      </Alert>,
    ],
    [
      'copyFailed',
      <Alert
        onClose={handleSnackClose}
        severity="error"
        key="alert-copy-failed"
      >
        Failed to copy URL
      </Alert>,
    ],
  ]);

  const clipboard = useClipboard({
    onSuccess() {
      setAlertReason('copied');
    },
    onError() {
      setAlertReason('copyFailed');
    },
  });

  function handleRun(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onRun();
  }

  function handleFormat(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onFormat();
  }

  const handleShare = useCallback(() => {
    clipboard.copy(window.location.href);
  }, [clipboard]);

  const [exampleAnchor, setExampleAnchor] = React.useState<null | HTMLElement>(
    null
  );

  const openExamples = (event: React.MouseEvent<HTMLElement>) => {
    setExampleAnchor(event.currentTarget);
  };

  const closeExamples = () => {
    setExampleAnchor(null);
  };

  const loadExample = async (id: ExampleId) => {
    closeExamples();
    const exampleSourceCode = await getExampleSourceCode(id);
    onLoadExample(exampleSourceCode);
  };

  const examples = new Map<ExampleId, string>([
    ['hello-world', 'Hello World'],
    ['remote-import', 'Remote import'],
    ['fetch-data', 'Fetch data'],
    ['subprocesses', 'Subprocesses'],
  ]);

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
        <Button
          onClick={handleRun}
          variant="contained"
          color="primary"
          startIcon={<PlayArrow />}
        >
          Run
        </Button>
      </ThemeProvider>

      <Button onClick={handleFormat} variant="contained" color="primary">
        Format
      </Button>

      <Button onClick={handleShare} variant="contained" color="primary">
        Share
      </Button>

      <Snackbar
        open={!!alertReason}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        {alertReason ? alerts.get(alertReason) : undefined}
      </Snackbar>

      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={openExamples}
        variant="outlined"
        color="primary"
        endIcon={<ExpandMore />}
      >
        Examples
      </Button>

      <Menu
        anchorEl={exampleAnchor}
        keepMounted
        open={Boolean(exampleAnchor)}
        onClose={closeExamples}
      >
        {Array.from(examples.entries()).map(([id, name]) => (
          <MenuItem onClick={() => loadExample(id)} key={id}>
            {name}
          </MenuItem>
        ))}
      </Menu>

      {/*
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
      */}
    </menu>
  );
};

export default Toolbar;
