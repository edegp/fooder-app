import '@/styles/globals.css'
import React from 'react'

import Head from 'next/head'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Head>
        <title>Fooder Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <body className="overflow-y-scroll bg-zinc-900">{children}</body>
    </html>
  )
}
