import Head from 'next/head'

import { useWindowSize } from '@/lib/hooks/useWindowSize'
import { Header } from '@/ui/atom/Header'
import { LoginModal } from '@/ui/components/LoginModal'
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
      <LoginModal />
    </>
  )
}
