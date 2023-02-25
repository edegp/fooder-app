import { useCallback, useEffect, useState } from 'react'

import { useRecoilState } from 'recoil'

import { geoLocation } from '@/lib/recoil/state'

export const useGeoLocation = () => {
  const [id, setId] = useState(0)
  const [location, setLocation] = useRecoilState(geoLocation)
  const successCallback = useCallback(
    (position: GeolocationPosition) => {
      const { latitude: lat, longitude: lng } = position.coords
      // 差異があった場合のみ更新
      if (!location || location.lat !== lat || location.lng !== lng) setLocation({ lat, lng })
      navigator.geolocation.clearWatch(id)
    },
    [id]
  )
  const errorCallback = useCallback(() => {
    alert('位置情報の読み込みに失敗しました')
    navigator.geolocation.clearWatch(id)
  }, [id])
  useEffect(
    () =>
      // 位置情報の更新をsubscribe 返り値がidなので保存してcallbackを読んだ時にsubscribeを解除
      setId(navigator.geolocation.watchPosition(successCallback, errorCallback)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return location
}
