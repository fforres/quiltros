import Document, { Head, Html, Main, NextScript } from 'next/document';
import { resetCss } from './resetcss';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-139082777-1', { debug: true, gaOptions: {
  siteSpeedSampleRate: true,
  alwaysSendReferrer: true,
  cookieName: '_quiltros_ga'
}})
ReactGA.pageview(window.location.pathname + window.location.search)

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
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
