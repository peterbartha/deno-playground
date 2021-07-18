import styles from '../styles/Footer.module.scss';
import VercelLogo from '../assets/vercel.svg';
import DenoLogo from '../assets/deno-logo.svg';

const Footer = (): JSX.Element => (
  <footer className={styles.footer}>
    Powered by
    <a
      href="https://vercel.com"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.vercelLogo}
    >
      <VercelLogo />
    </a>
    and
    <a
      href="https://deno.land"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.denoLogo}
    >
      <DenoLogo />
    </a>
  </footer>
);

export default Footer;
