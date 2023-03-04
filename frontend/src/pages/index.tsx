import { Layout } from '@/ui/atom/Layout'
import { LoginModal } from '@/ui/components/LoginModal'
import { MyMapComponent } from '@/ui/googleMap/MyMapComponent'

export default function Page() {
  return (
    <Layout title="Fooder">
      <MyMapComponent />
      <LoginModal />
    </Layout>
  )
}
