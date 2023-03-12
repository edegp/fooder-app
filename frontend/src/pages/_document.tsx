// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'

import { GtagScript } from '@/lib/modules/gtag'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <link href="http://fonts.googleapis.com/earlyaccess/notosansjp.css" as="style" type="text/css" />
          <GtagScript />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
