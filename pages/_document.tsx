import Document, { Head, Html, Main, NextScript } from 'next/document';
import { resetCss } from './resetcss';

class MyDocument extends Document {
  public static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  public render() {
    return (
      <Html>
        <Head>
          <style>{resetCss}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
