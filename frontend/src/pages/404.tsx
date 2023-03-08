import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => router.push('/'), 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <p>お探しのページは見つかりませんでした。</p>
      <p>5秒後にトップページに戻ります。</p>
    </div>
  )
}
