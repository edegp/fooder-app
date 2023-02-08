import { useCallback, memo, useState } from 'react'
import { useGeoLocation } from '@/lib/useGeoLocation'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { Spinner } from '@/ui/Spinner'
import { InfoWindows } from '@/ui/InfoWindow'
import PlaceDetail from './PlaceDetail'

const mapContainerClassName = 'w-full h-[calc(100vh-300px)] md:h-[500px]'

export const MyMapComponent = memo(() => {
  const center = useGeoLocation()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_APIKEY || '',
    version: 'weekly',
    libraries: ['places']
  })
  const [service, setService] = useState<google.maps.places.PlacesService | null>(null)
  const [makersLocation, setMakersLocation] = useState<google.maps.places.PlaceResult[] | null>(null)
  const [detail, setDetail] = useState<google.maps.places.PlaceResult | null>(null)
  /**
   *  検索結果のcallback
   */
  const callback = (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      setMakersLocation(results)
    }
  }
  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const request = {
        location: center,
        radius: 500,
        type: 'restaurant'
      }
      const service = new window.google.maps.places.PlacesService(map)
      service.textSearch(request, callback)
      setService(service)
    },
    [center]
  )

  const onUnmount = useCallback(() => {
    setService(null)
  }, [])

  return isLoaded ? (
    <GoogleMap mapContainerClassName={mapContainerClassName} center={center} zoom={15} onLoad={onLoad} onUnmount={onUnmount}>
      <InfoWindows makersLocation={makersLocation} service={service} setDetail={setDetail} />
      <PlaceDetail detail={detail} />
    </GoogleMap>
  ) : (
    <Spinner />
  )
})
