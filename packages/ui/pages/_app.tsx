import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import '../styles/globals.scss';
import theme from '../styles/theme';

const GlobalCss = withStyles({
  '@global': {
    '.MuiAlert-root': {
      fontSize: '1.4rem',
    },
  },
})(() => null);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalCss />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
