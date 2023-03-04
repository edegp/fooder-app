import React, { memo } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'

import { LoadingRing } from '@/ui/atom/Loading'

const Header = dynamic(
  import('@/ui/atom/Header').then(module => module.Header),
  { ssr: false, loading: () => <LoadingRing /> }
)

export const Layout = memo(function Layout({ title, children }: { title: string } & React.PropsWithChildren) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
    </>
  )
})
