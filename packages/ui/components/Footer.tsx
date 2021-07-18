import styles from '../styles/Footer.module.scss';
import VercelLogo from '../assets/vercel.svg';
import DenoLogo from '../assets/deno-logo.svg';

const Footer = (): JSX.Element => (
  <footer className={styles.footer}>
    Powered by
    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
      <VercelLogo className={styles.vercelLogo} />
    </a>
    and
    <a href="https://deno.land" target="_blank" rel="noopener noreferrer">
      <DenoLogo className={styles.denoLogo} />
    </a>
  </footer>
);

export default Footer;
