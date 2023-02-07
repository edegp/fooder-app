import { useEffect, useState } from 'react'
export const useGeoLocation = () => {
  const [id, setId] = useState(0)
  const [location, setLocation] = useState<google.maps.LatLngLiteral>({ lat: 36, lng: 140 })
  const successCallback = (position: GeolocationPosition) => {
    const { latitude: lat, longitude: lng } = position.coords
    setLocation({ lat, lng })
    navigator.geolocation.clearWatch(id)
  }
  const errorCallback = () => {
    alert('位置情報の読み込みに失敗しました')
    navigator.geolocation.clearWatch(id)
  }
  useEffect(() => setId(navigator.geolocation.watchPosition(successCallback, errorCallback)), [])
  return location
}
