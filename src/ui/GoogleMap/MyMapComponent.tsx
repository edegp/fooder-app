'use client'

import { useCallback, memo, useState, useMemo, useRef, useEffect } from 'react'

import { Loader } from '@googlemaps/js-api-loader'
import { useRecoilState, useSetRecoilState } from 'recoil'
import useSWR from 'swr'

import { LoadingRing } from '../LoadingRing'

import { useGeoLocation } from '@/lib/hooks/useGeoLocation'
import { mapState, placeDetailState } from '@/lib/recoil/state'
import { InfoWindows } from '@/ui/googleMap/InfoWindows'
import { Marker } from '@/ui/googleMap/Marker'
import { PlaceDetail } from '@/ui/googleMap/PlaceDetail'

const mapContainerClassName = 'z-10 relative w-full h-full overflow-hidden'

type Library = 'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization'
const loaderOptions = {
  id: 'google-map-script',
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_APIKEY || '',
  version: 'weekly',
  libraries: ['places'] as Library[]
}
/** mapロードfetcher */
const fetcher = ([loader, mapElement, mapOptions]: [Loader, HTMLDivElement, google.maps.MapOptions]) =>
  loader.load().then((google: any) => new google.maps.Map(mapElement, mapOptions)) as Promise<google.maps.Map>

export const MyMapComponent = memo(function MyMapComponent() {
  const ref = useRef<HTMLDivElement>(null)
  const loader = useMemo(() => new Loader(loaderOptions), [])
  const center = useGeoLocation()
  const mapOptions = useMemo(
    () => ({
      zoom: 15,
      center: center
    }),
    [center]
  )
  // swrでフェッチすることでキャッシュ化・suspenseに対応
  // const map = ref.current ? use(fetcher([loader, ref.current, mapOptions])) : undefined
  const { data: map } = useSWR(ref.current ? [loader, ref.current, mapOptions] : null, fetcher, {
    onSuccess: data => setMap(data)
  })
  const [makersLocation, setMakersLocation] = useState<google.maps.places.PlaceResult[] | null>(null)
  const [detail, setDetail] = useRecoilState(placeDetailState)
  const [isLoading, setIsLoading] = useState(true)
  const setMap = useSetRecoilState(mapState)
  /** 検索結果のcallback */
  const callback = useCallback(
    (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setMakersLocation(results)
        setIsLoading(false)
      }
    },
    []
  )

  /** 検索関数 */
  const textSearch = useCallback(() => {
    if (center) {
      const request = {
        location: center,
        radius: 500,
        type: 'restaurant'
      }
      if (map) {
        const service = new window.google.maps.places.PlacesService(map)
        service.textSearch(request, callback)
      }
    }
  }, [callback, center, map])

  useEffect(() => {
    if (map && center) {
      map.setCenter(center)
    }
    textSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, map])

  const handleClose = () => setDetail(null)

  return (
    <>
      {isLoading && <LoadingRing />}
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <div className={mapContainerClassName} ref={ref}>
          {center && map && (
            <div>
              <Marker
                position={center}
                icon={{ scaledSize: new google.maps.Size(24, 24), url: '/navigate-circle-outline.svg' }}
              />
              <InfoWindows makersLocation={makersLocation} />
              <PlaceDetail handleClose={handleClose} />
            </div>
          )}
        </div>
      </div>
    </>
  )
})
