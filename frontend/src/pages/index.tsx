import Head from 'next/head'

import { Header } from '@/ui/atom/Header'
import { LoginModal } from '@/ui/components/LoginModal'
import { MyMapComponent } from '@/ui/googleMap/MyMapComponent'

export default function Page() {
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
