import { Layout } from '@/ui/atom/Layout'

import { MyMapComponent } from '@/ui/components/googleMap/MyMapComponent'
import { LoginModal } from '@/ui/components/LoginModal'

export default function Page() {
  return (
    <Layout title="Fooder">
      <MyMapComponent />
      <LoginModal />
    </Layout>
  )
}
