'use client'

import { AppProps } from 'next/app'

import { withUrqlClient } from 'next-urql'
import { RecoilRoot } from 'recoil'

import { RecoilURLSyncNext } from '@/lib/recoil/RecilURLSyncNext'
import { InitialState } from '@/pages/_initialState'
import '@/styles/globals.css'
import { ErrorBoundary } from '@/ui/atom/ErrorBoundary'

function Myapp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <RecoilURLSyncNext
          location={{ part: 'href' }}
          serialize={x => JSON.stringify(x)}
          deserialize={x => ({ pathname: x })}
          storeKey="url"
        >
          <InitialState>
            <Component {...pageProps} />
          </InitialState>
        </RecoilURLSyncNext>
      </ErrorBoundary>
    </RecoilRoot>
  )
}

const graphql_api_url = process.env.NEXT_PUBIC_GRAPHQL_API_URL || 'http://localhost:8080'

// urqlの設定
export default withUrqlClient(() => ({ url: graphql_api_url }), {
  ssr: false
})(Myapp)
