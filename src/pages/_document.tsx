import Document, {Html, Head, Main, NextScript} from 'next/document';
import i18nextConfig from '../../next-i18next.config';

class MyDocument extends Document {
  render() {
    let currentLocale =
      this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;
    if (currentLocale instanceof Array) {
      currentLocale = currentLocale[0];
    }
    return (
      <Html lang={currentLocale}>
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <meta name="theme-color" content="#fff" />
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
