import Editor from '@monaco-editor/react';
import lzstring from 'lz-string';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import useMatchMedia from 'use-match-media-hook';
import Split from 'react-split';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Toolbar from '../components/Toolbar';
import fmt from '../services/fmt';
import format from '../services/formatter';
import { getExampleSourceCode } from '../services/request';
import run from '../services/run';
import styles from '../styles/Home.module.scss';
import { makeMarkdownFrom } from '../services/markdown';

export default function Home(): JSX.Element {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [console, setConsole] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const sanitizeHelper = useRef<HTMLParagraphElement | null>(null);
  const [isLargeScreen] = useMatchMedia(['(min-width: 1024px)']);
  const isInitial = useRef<boolean>(true);

  useEffect(() => {
    if (!isInitial.current) {
      window.location.reload();
    }
    isInitial.current = false;
  }, [isLargeScreen]);

  async function handleEditorDidMount() {
    const [_, hash] = window.location.hash.split('#');
    const params = new URLSearchParams(hash);
    const compressedCode = params.get('code');
    let code = '';
    if (compressedCode) {
      code = lzstring.decompressFromEncodedURIComponent(compressedCode) || '';
    } else {
      code = await getExampleSourceCode('default');
    }
    setSourceCode(code);
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
    let response = '';
    try {
      response = await run(sourceCode);
    } catch (err) {
      response = err;
    }
    setConsole(response);
    setProcessing(false);
  }

  async function handleFormat() {
    setProcessing(true);
    try {
      const response = await fmt(sourceCode);
      setSourceCode(response);
    } catch (err) {
      setConsole(err);
    } finally {
      setProcessing(false);
    }
  }

  async function generateMarkdown(): Promise<string> {
    const output = await run(sourceCode);
    return makeMarkdownFrom(sourceCode, output);
  }

  function accessSource(): string {
    return sourceCode;
  }

  function loadExample(exampleSourceCode: string) {
    setSourceCode(exampleSourceCode);
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
        <title>
          Deno Playground - An online playground for expolring Deno and
          TypeScript
        </title>
        <link
          rel="icon"
          href="https://deno-playground.peterbartha.com/deno-playground/favicon.svg"
          type="image/svg+xml"
        />
        <link
          rel="icon"
          href="https://deno-playground.peterbartha.com/deno-playground/favicon.ico"
        />

        <meta name="author" content="Peter Bartha" />
        <meta
          name="description"
          content="The Playground lets you write TypeScript online in a safe and sharable way on Deno runtime."
        />
        <meta
          property="og:title"
          content="Deno Playground - An online playground for expolring Deno and TypeScript"
        />
        <meta
          property="og:description"
          content="The Playground lets you write TypeScript online in a safe and sharable way on Deno runtime."
        />
        <meta
          property="og:image"
          content="https://deno-playground-peterbartha.vercel.app/deno-og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <Header />

      <main className={styles.main}>
        <Toolbar
          onRun={handleRun}
          onFormat={handleFormat}
          onGenerateMarkdown={generateMarkdown}
          onAccessSource={accessSource}
          onLoadExample={loadExample}
        />
        <Split
          className={styles.playground}
          direction={isLargeScreen === true ? 'horizontal' : 'vertical'}
        >
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

            {/* eslint-disable react/no-danger */}
            <samp
              dangerouslySetInnerHTML={createSafeMarkup()}
              className={processing ? styles.blur : ''}
            />
            {/* eslint-enable react/no-danger */}

            {processing ? <Loading className={styles.loading} /> : null}
          </section>
        </Split>
      </main>

      {isLargeScreen ? <Footer /> : null}
    </div>
  );
}
