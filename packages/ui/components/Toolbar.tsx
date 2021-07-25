import {
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Snackbar,
  ThemeProvider,
} from '@material-ui/core';
import { Transition } from 'react-transition-group';
import { ExpandMore, PlayArrow } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useCallback } from 'react';
import lzstring from 'lz-string';
import { useClipboard } from 'use-clipboard-copy';
import useMatchMedia from 'use-match-media-hook';
import { ExampleId, getExampleSourceCode } from '../services/request';
import styles from '../styles/Toolbar.module.scss';
import {
  makeMarkdownUrl,
  makeMarkdownUrlWithShortExample,
} from '../services/markdown';

type Props = {
  onRun: () => void;
  onFormat: () => void;
  onGenerateMarkdown: () => Promise<string>;
  onAccessSource: () => string;
  onLoadExample: (sourceCode: string) => void;
};

const Toolbar = ({
  onRun,
  onFormat,
  onGenerateMarkdown,
  onAccessSource,
  onLoadExample,
}: Props): JSX.Element => {
  const [exportAnchor, setExportAnchor] = React.useState<null | HTMLElement>(
    null
  );
  const [exampleAnchor, setExampleAnchor] = React.useState<null | HTMLElement>(
    null
  );
  const [alertReason, setAlertReason] = React.useState<string>('');
  const alertType = React.useRef<string>('');

  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<{
    title: string;
    message: string;
  }>({ title: '', message: '' });
  const [_dialogType, setDialogType] = React.useState<'code'>('code');
  const dialogElementRef = React.useRef<HTMLElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [isLargeScreen] = useMatchMedia(['(min-width: 768px)']);

  const dialogRendered = () => {
    const textarea = textareaRef?.current;
    if (textarea) {
      textarea.select();
    }
  };

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
      'markdownCopied',
      <Alert onClose={handleSnackClose} severity="success" key="alert-copied">
        Markdown code copied to clipboard
      </Alert>,
    ],
    [
      'copyFailed',
      <Alert
        onClose={handleSnackClose}
        severity="error"
        key="alert-copy-failed"
      >
        Failed to copy
      </Alert>,
    ],
  ]);

  const clipboard = useClipboard({
    onSuccess() {
      setAlertReason(alertType.current);
    },
    onError() {
      setAlertReason('copyFailed');
    },
  });

  const selectAllText = () => {
    const textarea = textareaRef?.current;
    if (textarea) {
      textarea.select();
    }
  };

  function handleRun(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onRun();
  }

  function handleFormat(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onFormat();
  }

  const handleShare = useCallback(() => {
    alertType.current = 'copied';
    clipboard.copy(window.location.href);
  }, [clipboard]);

  const handleMarkdownCopy = useCallback(() => {
    const textarea = textareaRef?.current;
    if (textarea) {
      alertType.current = 'markdownCopied';
      clipboard.copy(textarea.value);
      selectAllText();
    }
  }, [clipboard]);

  const openExport = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchor(event.currentTarget);
  };

  const closeExport = () => {
    setExportAnchor(null);
  };

  const openDialog = (title: string, message: string, type: 'code') => {
    setDialogContent({
      title,
      message,
    });
    setDialogType(type);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogContent({
      title: '',
      message: '',
    });
  };

  const copyAsMarkdownIssue = async () => {
    closeExport();
    const markdown = await onGenerateMarkdown();
    openDialog(
      'Markdown version of Deno Playground code for GitHub issue',
      markdown,
      'code'
    );
  };

  const copyAsMarkdownLink = () => {
    closeExport();
    const markdown = makeMarkdownUrl();
    openDialog('Deno playground link in markdown format', markdown, 'code');
  };

  const copyAsMarkdownLinkWithPreview = () => {
    closeExport();
    const source = onAccessSource();
    const markdown = makeMarkdownUrlWithShortExample(source);
    openDialog(
      'Deno playground link in markdown format with example',
      markdown,
      'code'
    );
  };

  const openInASTViewer = () => {
    closeExport();
    const source = onAccessSource();
    window.open(
      `https://ts-ast-viewer.com/#code/${lzstring.compressToEncodedURIComponent(
        source
      )}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const openInStackBlitz = () => {
    closeExport();

    const source = onAccessSource();
    const files = {
      'package.json': {
        content: {
          name: 'deno-playground-export',
          version: '0.0.1',
          description: 'Deno Playground exported sandbox',
          scripts: {
            'deno-install':
              'curl -fsSL https://deno.land/x/install/install.sh | sh && export DENO_INSTALL="~/.local" &&  export PATH="$DENO_INSTALL/bin:$PATH"',
            'set-up-types':
              'rm -rf ./deno-types && mkdir ./deno-types && ~/.deno/bin/deno types >> ./deno-types/lib.deno_runtime.d.ts',
            deno: '~/.deno/bin/deno run --allow-net ./index.ts --reload',
            'watch-file-changes':
              'nodemon -w ./src --exec "npm run deno" -e "js ts json mjs"',
            start:
              'npm run deno-install && npm run set-up-types && npm run watch-file-changes',
          },
          dependencies: {},
          devDependencies: {
            nodemon: '^2.0.12',
          },
          keywords: [],
        },
      },
      'index.ts': {
        content: source,
      },
      '.gitignore': {
        content: 'deno-types',
      },
      'tsconfig.json': {
        content: {
          compilerOptions: {
            strict: true,
            noImplicitAny: true,
            strictNullChecks: true,
            strictFunctionTypes: true,
            strictPropertyInitialization: true,
            strictBindCallApply: true,
            noImplicitThis: true,
            noImplicitReturns: true,
            alwaysStrict: true,
            esModuleInterop: true,
            declaration: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            target: 'ESNext',
            jsx: 'react',
            module: 'ESNext',
            lib: ['ESNext', 'DOM'],
            moduleResolution: 'node',
            allowJs: true,
            noEmit: true,
            pretty: true,
            resolveJsonModule: true,
            typeRoots: ['./deno-types'],
          },
          include: ['./**/*.ts'],
        },
      },
    };
    // Using the v1 get API
    const parameters = lzstring
      .compressToBase64(JSON.stringify({ files }))
      .replace(/\+/g, '-') // Convert '+' to '-'
      .replace(/\//g, '_') // Convert '/' to '_'
      .replace(/=+$/, ''); // Remove ending '='
    const url = `https://codesandbox.io/api/v1/sandboxes/define?view=editor&parameters=${parameters}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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

  const theme = createTheme({
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

      {isLargeScreen ? (
        <>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={openExport}
            variant="contained"
            color="primary"
            endIcon={<ExpandMore />}
          >
            Export
          </Button>

          <Menu
            anchorEl={exportAnchor}
            keepMounted
            open={Boolean(exportAnchor)}
            onClose={closeExport}
          >
            <MenuItem onClick={copyAsMarkdownIssue}>
              Copy as Markdown Issue
            </MenuItem>
            <MenuItem onClick={copyAsMarkdownLink}>
              Copy as Markdown Link
            </MenuItem>
            <MenuItem onClick={copyAsMarkdownLinkWithPreview}>
              Copy as Markdown Link with preview
            </MenuItem>
            <hr />
            <MenuItem onClick={openInASTViewer}>
              Open in TypeScript AST viewer
            </MenuItem>
            <MenuItem onClick={openInStackBlitz}>Open in StackBlitz</MenuItem>
          </Menu>
        </>
      ) : null}

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
      <Transition in={isDialogOpen} onEntered={dialogRendered} timeout={300}>
        {(_state) => (
          <Dialog
            open={isDialogOpen}
            onClose={closeDialog}
            scroll="paper"
            aria-labelledby="markdown-version-of-playground-code"
            aria-describedby="markdown-version-of-deno-playground-code"
          >
            <DialogTitle id="markdown-version-of-playground-code">
              {dialogContent?.title}
            </DialogTitle>
            <DialogContent dividers>
              <DialogContent
                id="markdown-version-of-deno-playground-code"
                ref={dialogElementRef}
                tabIndex={-1}
              >
                <textarea
                  ref={textareaRef}
                  className={styles.dialogTextarea}
                  value={dialogContent?.message}
                  readOnly
                />
              </DialogContent>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={selectAllText}>
                Select All
              </Button>
              <Button color="primary" onClick={handleMarkdownCopy}>
                Copy
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Transition>
    </menu>
  );
};

export default Toolbar;
