'use client'

import Head from 'next/head'

import { RecoilRoot } from 'recoil'

import '@/styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Head>
        <link rel="preload" href="http://fonts.googleapis.com/earlyaccess/notosansjp.css" as="style" type="text/css" />
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <body>
        <RecoilRoot>
          {/* <RecoilURLSyncJSONNext location={{ part: 'queryParams' }} storeKey="url"> */}
          {children}
          {/* </RecoilURLSyncJSONNext> */}
        </RecoilRoot>
      </body>
    </html>
  )
}
