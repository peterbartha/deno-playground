import Editor from '@monaco-editor/react';
import Head from 'next/head';
import React, { useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Toolbar from '../components/Toolbar';
import format from '../services/formatter';
import run from '../services/run';
import styles from '../styles/Home.module.scss';

export default function Home(): JSX.Element {
  const [source, setSource] = useState<string>('');
  const [console, setConsole] = useState<string>('');
  const sanitizeHelper = useRef<HTMLParagraphElement | null>(null);

  function handleEditorChange(value: string | undefined) {
    setSource(value || '');
  }

  async function handleRun() {
    const response = await run(source);
    setConsole(response);
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
        <Toolbar onRun={handleRun} />
        <div className={styles.playground}>
          <section className={styles.code}>
            <Editor
              height="100%"
              defaultLanguage="typescript"
              defaultValue=""
              onChange={handleEditorChange}
            />
          </section>
          <section className={styles.console}>
            <h2>Console output:</h2>
            <p ref={sanitizeHelper} className={styles.sanitizer} />
            {/* eslint-disable-next-line react/no-danger */}
            <samp dangerouslySetInnerHTML={createSafeMarkup()} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
