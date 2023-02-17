'use client'

import { AppProps } from 'next/app'

import { RecoilRoot } from 'recoil'

import { RecoilURLSyncNext } from '@/lib/recoil/RecilURLSyyncNext'

import '@/styles/globals.css'

export default function Myapp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <RecoilURLSyncNext
        location={{ part: 'href' }}
        serialize={x => JSON.stringify(x)}
        deserialize={x => ({ pathname: x })}
        storeKey="url"
      >
        <Component {...pageProps} />
      </RecoilURLSyncNext>
    </RecoilRoot>
  )
}
