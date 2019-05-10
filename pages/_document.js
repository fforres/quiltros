import Document, { Head, Html, Main, NextScript } from 'next/document';
import { resetCss } from './resetcss';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-139082777-1', { debug: true, gaOptions: {
  alwaysSendReferrer: true,
  cookieName: '_quiltros_ga',
  siteSpeedSampleRate: true,
}})

class MyDocument extends Document {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
    window.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    window.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    window.isEdge = document.documentMode || /Edge/.test(navigator.userAgent);

  }
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
          <div id="portal_container" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
