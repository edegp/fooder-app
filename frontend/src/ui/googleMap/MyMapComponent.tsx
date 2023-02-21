'use client'

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Loader } from '@googlemaps/js-api-loader'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import useSWR from 'swr'

import { useGeoLocation } from '@/lib/hooks/useGeoLocation'
import { mapState, placeDetailState } from '@/lib/recoil/state'
import { LoadingRing } from '@/ui/atom/Loading'
import { Marker } from '@/ui/googleMap/components/Marker'
import { InfoWindows } from '@/ui/googleMap/MarkerAndInfoWindows'
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
    revalidateOnMount: false,
    onSuccess: data => setMap(data)
  })
  const [makersLocation, setMakersLocation] = useState<google.maps.places.PlaceResult[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const setMap = useSetRecoilState(mapState)
  const detail = useRecoilValue(placeDetailState)
  const clickable = useMemo(() => !!detail, [detail])

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

  useEffect(() => {
    if (map && clickable) {
      map.setClickableIcons(clickable)
    }
  }, [map, clickable])

  return (
    <>
      {isLoading && <LoadingRing />}
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <div className={mapContainerClassName} ref={ref}>
          {center && map && (
            <>
              <Marker
                position={center}
                icon={{ scaledSize: new google.maps.Size(24, 24), url: '/navigate-circle-outline.svg' }}
                clickable={clickable}
              />
              <InfoWindows makersLocation={makersLocation} />
            </>
          )}
        </div>
        {center && map && <PlaceDetail />}
      </div>
    </>
  )
})
