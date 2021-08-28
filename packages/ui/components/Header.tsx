import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { GitHub, Help } from '@material-ui/icons';
import React from 'react';
import { Alert } from '@material-ui/lab';
import styles from '../styles/Header.module.scss';
import DenoLogo from '../assets/deno-logo.svg';

const Header = (): JSX.Element => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <a
          href="https://peterbartha.com/deno-playground"
          className={styles.deno}
        >
          <DenoLogo />
          <div className={styles.title}>
            <h1>Deno Playground</h1>
            <h2>An unofficial land for exploring</h2>
          </div>
        </a>
        <div className={styles.placeholder} />

        {/* 
      <IconButton
        className={styles.iconButton}
        aria-label="show GitHub repository"
      >
        <WbSunny fontSize="large" />
      </IconButton>
      */}
        <IconButton
          className={styles.iconButton}
          aria-label="show GitHub repository"
          href="https://github.com/peterbartha/deno-playground"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub fontSize="large" />
        </IconButton>

        <IconButton
          className={styles.iconButton}
          onClick={openDialog}
          aria-label="show about"
        >
          <Help fontSize="large" />
        </IconButton>
      </nav>

      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        scroll="paper"
        aria-labelledby="about-title"
        aria-describedby="about-content"
      >
        <DialogTitle id="about-title">About the Playground</DialogTitle>
        <DialogContent dividers>
          <DialogContent id="about-content" tabIndex={-1}>
            <Alert severity="info">
              <em>
                This is an unofficial playground for Deno runtime. It was
                created to be the official playground one day, hopefully. 🤞
              </em>
            </Alert>
            <p>
              <strong>
                The playground is an{' '}
                <a
                  href="https://github.com/peterbartha/deno-playground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open source project
                </a>
                . If you have any suggestions for features, issues with the
                implementation, or just want to read the code yourself, you are
                invited to participate!
              </strong>
            </p>
            <p>
              The Deno Playground is a web service that runs on Vercel. The
              service receives a TypeScript source code, compiles, runs the
              program with Deno inside a sandbox, and returns the output.
            </p>
            <p>
              This playground is modeled after the{' '}
              <a
                href="https://www.typescriptlang.org/play"
                target="_blank"
                rel="noopener noreferrer"
              >
                TypeScript
              </a>
              ,{' '}
              <a
                href="https://play.golang.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go
              </a>{' '}
              and{' '}
              <a
                href="https://play.rust-lang.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rust
              </a>{' '}
              playgrounds, and we owe an outstanding debt to every contributor
              to that project.
            </p>
            <h4>Abuse handling</h4>
            <p>
              Any requests for content removal should be directed to the{' '}
              <a
                href="https://github.com/peterbartha/deno-playground/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                project's issues
              </a>{' '}
              Please include the URL and the reason for the request.
            </p>
            <h4>Limitations</h4>
            <p>
              Benchmarks will likely not be recommended since the program runs
              in a sandboxed environment with limited resources.
            </p>
            <p>
              Some limitations are enforced to prevent the playground from being
              used to attack other computers and ensure it is available for
              everyone to use:
            </p>
            <ul>
              <li>
                The playground can use most of the standard library, with some
                exceptions. A playground program's only communication to the
                outside world is by writing to standard output and standard
                error.
              </li>
              <li>
                There are also limits on execution time, CPU, and memory usage.
              </li>
            </ul>
            <h4>License</h4>
            <p>
              This project was created by Peter Bartha, and released under{' '}
              <a
                href="https://github.com/peterbartha/deno-playground/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIT license
              </a>
              .
            </p>
            <h4>Credits</h4>
            <ul>
              <li>
                <strong>The Deno Playground's logo:</strong> "Dino in the Rain",
                the current logo of Deno is released under{' '}
                <a
                  href="https://github.com/denoland/deno_website2/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MIT license
                </a>
                . Designed by Kevin Qian based on Ryan Dahl's sketch. The
                original logo can be found{' '}
                <a
                  href="https://github.com/denoland/deno_website2/blob/main/public/logo.svg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </li>
              <li>
                <strong>Loading animation:</strong> "Walking dinosaurs"
                animation of Deno's public website is released under{' '}
                <a
                  href="https://github.com/denoland/deno_website2/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MIT license
                </a>
                . It is attributed to Deno authors, and the original version can
                be found{' '}
                <a
                  href="https://github.com/denoland/doc_website/blob/main/components/Loading.tsx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </li>
            </ul>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;
