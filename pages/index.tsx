import { Button } from '@material-ui/core';
import Editor from '@monaco-editor/react';
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.settings}>
          <Button>asd</Button>
        </div>
        <div className={styles.playground}>
          <section className={styles.code}>
            <Editor
              height="100%"
              defaultLanguage="typescript"
              defaultValue="// some comment"
            />
          </section>
          <section className={styles.console}>
            <h2>Console output:</h2>
            <samp>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
              ad repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quisquam ad
              repellendus ex. Minima accusantium facere, qui incidunt fugit
              natus atque possimus. Explicabo accusantium porro quas vero cum
              odit eius similique! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quisquam ad repellendus ex. Minima accusantium
              facere, qui incidunt fugit natus atque possimus. Explicabo
              accusantium porro quas vero cum odit eius similique!
            </samp>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
