import styles from '../styles/Header.module.scss';

const Header = (): JSX.Element => (
  <header className={styles.header}>
    <nav className={styles.navbar}>
      <a href="http://localhost:3000" className={styles.deno}>
        <img src="./deno-logo.svg" alt="Deno Playground" />
        <div className={styles.title}>
          <h1>Deno Playground</h1>
          <h2>Unofficial land for exploring</h2>
        </div>
      </a>
    </nav>
  </header>
);

export default Header;
