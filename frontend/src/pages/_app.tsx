'use client'

import { AppProps } from 'next/app'
import Head from 'next/head'

import { withUrqlClient } from 'next-urql'
import { RecoilRoot } from 'recoil'
import { RecoilDevTools } from 'recoil-toolkit'

import { RecoilURLSyncNext } from '@/lib/recoil/RecilURLSyncNext'
import '@/styles/globals.css'
import { ErrorBoundary } from '@/ui/atom/ErrorBoundary'
import { InitialStateProvider } from '@/ui/components/initialStateProvider'

// json 循環参照回避のため
const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (_: string, value: string) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return

      seen.add(value)
    }
    return value
  }
}

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
        <RecoilDevTools
          forceSerialize={true}
          serializer={obj => JSON.stringify(obj, getCircularReplacer())}
        />
        <ErrorBoundary>
          <RecoilURLSyncNext
            location={{ part: 'href' }}
            serialize={x => (typeof x === 'string' ? x : JSON.parse(JSON.stringify(x)))}
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
