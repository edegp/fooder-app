import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'

import { useWindowSize } from '@/lib/hooks/useWindowSize'
import { Header } from '@/ui/Header'
import { LoadingRing } from '@/ui/LoadingRing'
// import { MyMapComponent } from '@/ui/googleMap/MyMapComponent'

const MyMapComponent = dynamic(() => import('@/ui/googleMap/MyMapComponent').then(module => module.MyMapComponent), {
  ssr: false,
  loading: () => <LoadingRing />
})

export default function Page() {
  // windowSizeを取得
  useWindowSize()
  return (
    <>
      <Head>
        <title>Fooder</title>
      </Head>
      <Header />
      {/* react suspense 18.3~ 自動でローディング処理を行う*/}
      <Suspense fallback={<LoadingRing />}>
        <MyMapComponent />
      </Suspense>
    </>
  )
}
