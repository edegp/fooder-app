import { ReactNode } from 'react'

import { useGeoLocation } from '@/lib/hooks/useGeoLocation'
import { useWindowSize } from '@/lib/hooks/useWindowSize'

export const InitialState = ({ children }: { children: ReactNode }) => {
  // windowSizeを取得
  useWindowSize()
  // 位置情報を取得
  useGeoLocation()
  return <>{children}</>
}
