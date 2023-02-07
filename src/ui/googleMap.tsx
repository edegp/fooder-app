// import { Wrapper, Status } from '@googlemaps/react-wrapper'
// import { Spinner } from '@/ui/Spinner'
import { useCallback, memo, useState } from 'react'
import { useGeoLocation } from '@/lib/useGeoLocation'
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api'
import { Spinner } from './Spinner'

// const ErrorComponent = () => <div>マップの読み込みに失敗しました</div>

export const MyMapComponent = memo(() => {
  const center = useGeoLocation()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_APIKEY || '',
    version: 'weekly',
    libraries: ['places']
  })
  // const [map, setMap] = useState<google.maps.Map | null>(null)
  const [makersLocation, setMakersLocation] = useState<google.maps.places.PlaceResult[] | null>(null)
  /**
   *  検索結果のcallback
   */
  const callback = (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      setMakersLocation(results)
    }
  }
  console.log(makersLocation)
  const Makers = () => {
    return (
      <>
        {makersLocation?.map((place: google.maps.places.PlaceResult, i) => (
          <InfoWindow key={i} position={place?.geometry?.location}>
            <p>{place.name}</p>
          </InfoWindow>
        ))}
      </>
    )
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
      // setMap(map)
    },
    [center]
  )

  const onUnmount = useCallback(() => {
    // setMap(null)
  }, [])
  return isLoaded ? (
    <GoogleMap mapContainerClassName={'w-full h-[500px]'} center={center} zoom={14} onLoad={onLoad} onUnmount={onUnmount}>
      <Makers />
    </GoogleMap>
  ) : (
    <Spinner />
  )
})
