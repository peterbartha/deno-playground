import Editor from '@monaco-editor/react';
import lzstring from 'lz-string';
import Head from 'next/head';
import React, { useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Toolbar from '../components/Toolbar';
import fmt from '../services/fmt';
import format from '../services/formatter';
import run from '../services/run';
import styles from '../styles/Home.module.scss';

export default function Home(): JSX.Element {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [console, setConsole] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const sanitizeHelper = useRef<HTMLParagraphElement | null>(null);

  function handleEditorDidMount() {
    const [_, hash] = window.location.hash.split('#');
    const params = new URLSearchParams(hash);
    const compressedCode = params.get('code');
    if (compressedCode) {
      const code = lzstring.decompressFromEncodedURIComponent(compressedCode);
      if (code) {
        setSourceCode(code);
      }
    }
  }

  function handleEditorChange(value: string | undefined) {
    const newSourceCode = value || '';
    setSourceCode(newSourceCode);

    // update URL fragment with the compressed source code
    if (newSourceCode) {
      const hash = newSourceCode
        ? `#code=${lzstring.compressToEncodedURIComponent(newSourceCode)}`
        : '';
      window.history.replaceState({}, '', hash);
      return;
    }
    window.history.replaceState({}, '', '#');
  }

  async function handleRun() {
    setProcessing(true);
    const response = await run(sourceCode);
    setConsole(response);
    setProcessing(false);
  }

  async function handleFormat() {
    setProcessing(true);
    const formattedSource = await fmt(sourceCode);
    setSourceCode(formattedSource);
    setProcessing(false);
  }

  function createSafeMarkup(): { __html: string } {
    const sanitizer = sanitizeHelper.current;
    if (!sanitizer) {
      return { __html: '' };
    }
    sanitizer.innerText = console;
    return { __html: format(sanitizer.innerHTML) };
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <Toolbar onRun={handleRun} onFormat={handleFormat} />
        <div className={styles.playground}>
          <section className={styles.code}>
            <Editor
              height="100%"
              defaultLanguage="typescript"
              defaultValue=""
              value={sourceCode}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
            />
          </section>
          <section className={styles.console}>
            <h2>Console output:</h2>
            <p ref={sanitizeHelper} className={styles.sanitizer} />
            {/* eslint-disable-next-line react/no-danger */}
            <samp dangerouslySetInnerHTML={createSafeMarkup()} />
            {processing ? <Loading className={styles.loading} /> : null}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
