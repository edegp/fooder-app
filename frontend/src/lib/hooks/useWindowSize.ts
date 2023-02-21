'use client'

import { useEffect } from 'react'

import { useRecoilState } from 'recoil'

import { clientSize } from '@/lib/recoil/state'

export const useWindowSize = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_size, setSize] = useRecoilState(clientSize)
  useEffect(() => {
    const updateSize = () => setSize([window.innerWidth, window.innerHeight])
    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])
}
