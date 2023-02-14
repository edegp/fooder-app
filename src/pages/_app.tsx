'use client'

import { AppProps } from 'next/app'

import { RecoilRoot } from 'recoil'
import '@/styles/globals.css'

export default function Myapp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      {/* <RecoilURLSyncJSONNext location={{ part: 'queryParams' }} storeKey="url"> */}
      <Component {...pageProps} />
      {/* </RecoilURLSyncJSONNext> */}
    </RecoilRoot>
  )
}
