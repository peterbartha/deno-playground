import { IconButton } from '@material-ui/core';
import { GitHub, Help } from '@material-ui/icons';
import styles from '../styles/Header.module.scss';
import DenoLogo from '../assets/deno-logo.svg';

const Header = (): JSX.Element => (
  <header className={styles.header}>
    <nav className={styles.navbar}>
      <a href="https://peterbartha.com/deno-playground" className={styles.deno}>
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
      {/*
      <IconButton
        className={styles.iconButton}
        aria-label="show GitHub repository"
      >
        <Help fontSize="large" />
      </IconButton>
      */}
    </nav>
  </header>
);

export default Header;
