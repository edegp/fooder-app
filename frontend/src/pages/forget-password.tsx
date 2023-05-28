import { useRecoilValue } from 'recoil'

import { emailState } from '@/lib/recoil/state'
import { Layout } from '@/ui/atom/Layout'

export default function Forgetpass() {
  const email = useRecoilValue(emailState)
  return (
    <Layout title="Fooder パスワード再設定">
      <p className="!mt-48 flex h-[calc(100%-100px)] flex-col items-center justify-center text-center">
        {email}宛に
        <br />
        メールを送信しました。
      </p>
    </Layout>
  )
}
