'use client'

import { AppProps } from 'next/app'

import { RecoilRoot } from 'recoil'

import { RecoilURLSyncNext } from '@/lib/recoil/RecilURLSyncNext'

import '@/styles/globals.css'

export default function Myapp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <RecoilURLSyncNext
        location={{ part: 'href' }}
        serialize={x => {
          console.log(x)
          return JSON.stringify(x)
        }}
        deserialize={x => ({ pathname: x })}
        storeKey="url"
      >
        <Component {...pageProps} />
      </RecoilURLSyncNext>
    </RecoilRoot>
  )
}
