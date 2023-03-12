import { useEffect } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import { GA_ID, pageview } from '@/lib/modules/gtag'

export const usePageView = () => {
  const pathName = usePathname()
  const params = useSearchParams()

  useEffect(() => {
    if (!GA_ID) return

    const path = pathName || '' + params
    pageview(path)
  }, [pathName, params])
}
