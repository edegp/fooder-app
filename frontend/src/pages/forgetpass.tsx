import { useRouter, useSearchParams } from 'next/navigation'

import { sendPasswordResetEmail } from 'firebase/auth'

import { auth } from '@/lib/firebase'
import { handleError } from '@/lib/modules/handleError'
import { Layout } from '@/ui/atom/Layout'

const host = process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'
const actionCodeSettings = {
  url: `${host}/singin`
}

export default async function Forgetpass() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  if (!email) {
    router.push('/signin')
    throw new Error('メールの取得に失敗しました')
  }
  try {
    await sendPasswordResetEmail(auth, email, actionCodeSettings)
  } catch (err) {
    router.push('/signin')
    handleError(err)
  }
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
