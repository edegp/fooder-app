import { useSearchParams } from 'next/navigation'

import { Layout } from '@/ui/atom/Layout'

export default function Forgetpass() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <Layout title="Fooder パスワード再設定">
      <p className="!mt-48 text-center">
        {email}宛に
        <br />
        メールを送信しました。
      </p>
    </Layout>
  )
}
