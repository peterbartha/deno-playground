import styles from '../styles/Footer.module.scss';

const Footer = (): JSX.Element => (
  <footer className={styles.footer}>
    Powered by
    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
      <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
    </a>
    and
    <a href="https://deno.land" target="_blank" rel="noopener noreferrer">
      <img src="./deno-logo.svg" alt="Deno Logo" className={styles.logo} />
    </a>
  </footer>
);

export default Footer;
