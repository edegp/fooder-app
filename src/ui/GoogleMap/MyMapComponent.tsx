import { useCallback, memo, useState, useEffect, useMemo } from 'react'

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { RingLoader } from 'react-spinners'

import { useGeoLocation } from '@/lib/useGeoLocation'
import { InfoWindows } from '@/ui/GoogleMap/InfoWindow'
import { PlaceDetail } from '@/ui/GoogleMap/PlaceDetail'

const mapContainerClassName = 'z-10 relative w-full h-screen md:h-screen md:w-full'

type Library = 'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization'

export const MyMapComponent = memo(() => {
  const center = useGeoLocation()
  const loaderOptions = useMemo(
    () => ({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_APIKEY || '',
      version: 'weekly',
      libraries: ['places'] as Library[]
    }),
    []
  )
  const { isLoaded } = useJsApiLoader(loaderOptions)
  const [service, setService] = useState<google.maps.places.PlacesService | null>(null)
  const [makersLocation, setMakersLocation] = useState<google.maps.places.PlaceResult[] | null>(null)

  const [detail, setDetail] = useState<google.maps.places.PlaceResult | null>(null)
  const [loading, setLoading] = useState(true)

  /** 検索結果のcallback */
  const callback = (
    results: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      setMakersLocation(results)
    }
    setLoading(false)
  }

  /** 検索関数 */
  const textSearch = useCallback(() => {
    const request = {
      location: center,
      radius: 500,
      type: 'restaurant'
    }
    service?.textSearch(request, callback)
  }, [center, service])

  /** 現在位置が更新された時に，再度検索 */
  useEffect(() => {
    textSearch()
  }, [center])

  /** mapロード後のコールバック */
  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const service = new window.google.maps.places.PlacesService(map)
      setService(service)
    },
    [center]
  )

  const onUnmount = useCallback(() => {
    setLoading(true)
    setService(null)
  }, [])
  const handleClose = () => setDetail(null)
  return isLoaded ? (
    <>
      {loading && (
        <RingLoader
          color="#222"
          cssOverride={{
            margin: 'auto',
            textAlign: 'center',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 100
          }}
        />
      )}
      <div className="z-40 flex">
        <GoogleMap
          mapContainerClassName={mapContainerClassName}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <InfoWindows makersLocation={makersLocation} service={service} setDetail={setDetail} />
          <PlaceDetail detail={detail} handleClose={handleClose} />
        </GoogleMap>
      </div>
    </>
  ) : (
    <RingLoader
      color="#222"
      cssOverride={{
        margin: 'auto',
        textAlign: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100
      }}
    />
  )
})
