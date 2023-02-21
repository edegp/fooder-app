import { useCallback, useEffect, useRef } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { BrowserInterface, RecoilURLSyncOptions } from 'recoil-sync'

export function useSyncURLNext(): Partial<Omit<RecoilURLSyncOptions, 'children'>> {
  const { replace, push } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const asPath = pathname + searchParams.toString()

  const urlRef = useRef<{
    path: string
    needNotify: boolean
    handler?: () => void
  }>({
    path: asPath || '/',
    needNotify: !asPath,
    handler: undefined
  })

  const { needNotify, handler } = urlRef.current
  useEffect(() => {
    if (needNotify && handler) {
      urlRef.current.path = asPath
      urlRef.current.needNotify = false
      handler()
    }
  }, [needNotify, handler, asPath])

  const browserInterface: BrowserInterface = {
    replaceURL: useCallback((url: string) => replace(url, undefined), [replace]),

    pushURL: useCallback((url: string) => push(url, undefined), [push]),

    getURL: useCallback(() => {
      const url = new URL(urlRef.current.path, globalThis?.document?.location?.href ?? 'http://localhost:3000')
      return url.toString()
    }, [])
  }

  return {
    browserInterface
  }
}
