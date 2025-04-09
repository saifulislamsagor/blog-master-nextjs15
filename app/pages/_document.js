// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add the viewport meta tag for mobile responsiveness */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* You can add other global meta tags or styles here */}
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
