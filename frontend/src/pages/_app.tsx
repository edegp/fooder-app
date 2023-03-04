'use client'

import { AppProps } from 'next/app'
import Head from 'next/head'

import { withUrqlClient } from 'next-urql'
import { RecoilRoot } from 'recoil'

import { RecoilURLSyncNext } from '@/lib/recoil/RecilURLSyncNext'
import '@/styles/globals.css'
import { ErrorBoundary } from '@/ui/atom/ErrorBoundary'
import { InitialStateProvider } from '@/ui/components/initialStateProvider'

function Myapp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <RecoilRoot>
        <ErrorBoundary>
          <RecoilURLSyncNext
            location={{ part: 'href' }}
            serialize={x => JSON.stringify(x)}
            deserialize={x => ({ pathname: x })}
            storeKey="url"
          >
            <InitialStateProvider>
              <Component {...pageProps} />
            </InitialStateProvider>
          </RecoilURLSyncNext>
        </ErrorBoundary>
      </RecoilRoot>
    </>
  )
}

const graphql_api_url = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:8080/query'

// urqlの設定
export default withUrqlClient(() => ({ url: graphql_api_url }), {
  ssr: false
})(Myapp)
