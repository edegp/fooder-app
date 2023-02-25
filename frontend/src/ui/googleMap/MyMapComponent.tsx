'use client'

import { memo, useEffect, useMemo, useRef } from 'react'

import { Loader } from '@googlemaps/js-api-loader'
import { useRecoilState, useRecoilValue } from 'recoil'
import useSWR from 'swr'

import { geoLocation, makersLocationState, mapOptionsState, mapState, placeDetailState } from '@/lib/recoil/state'
import { LoadingRing } from '@/ui/atom/Loading'
import { PlaceDetail } from '@/ui/googleMap/PlaceDetail'
import { UserMapInfo } from '@/ui/googleMap/components/UserMapInfo'

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
  const center = useRecoilValue(geoLocation)
  const [map, setMap] = useRecoilState(mapState)
  const mapOptions = useRecoilValue(mapOptionsState)
  // swrでフェッチすることでキャッシュ化・suspenseに対応
  const { data: _, isLoading: isMapLoading } = useSWR(ref.current ? [loader, ref.current, mapOptions] : null, fetcher, {
    focusThrottleInterval: 2000,
    keepPreviousData: true,
    loadingTimeout: 2510,
    onSuccess: data => setMap(data)
  })
  const [makersLocation, setMakersLocation] = useRecoilState<google.maps.places.PlaceResult[] | null>(
    makersLocationState
  )
  const detail = useRecoilValue(placeDetailState)
  const clickable = useMemo(() => !!detail, [detail])
  const isLoading: boolean = useMemo(
    () => isMapLoading || !center || !makersLocation,
    [center, isMapLoading, makersLocation]
  )
  /** 検索結果のcallback */
  const callback: (
    a: google.maps.places.PlaceResult[] | null,
    b: google.maps.places.PlacesServiceStatus,
    c: google.maps.places.PlaceSearchPagination | null
  ) => void = (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      setMakersLocation(results)
    } else {
      // 失敗した場合再帰的に検索
      textSearch()
    }
  }
  /** 検索関数 */
  const textSearch: () => void = () => {
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
  }

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
          {center && map && <UserMapInfo />}
        </div>
        {center && map && <PlaceDetail />}
      </div>
    </>
  )
})
