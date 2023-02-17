import Head from 'next/head'

import { useWindowSize } from '@/lib/hooks/useWindowSize'
import { Header } from '@/ui/Header'
import { MyMapComponent } from '@/ui/googleMap/MyMapComponent'

export default function Page() {
  // windowSizeを取得
  useWindowSize()
  return (
    <>
      <Head>
        <title>Fooder</title>
      </Head>
      <Header />
      <MyMapComponent />
    </>
  )
}
