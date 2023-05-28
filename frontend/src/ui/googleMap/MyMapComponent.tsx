'use client'

import { memo, useCallback, useEffect, useMemo, useRef } from 'react'

import { Loader } from '@googlemaps/js-api-loader'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import useSWR from 'swr'

import {
  geoLocation,
  isLoadingState,
  makersLocationState,
  mapOptionsState,
  mapState,
  queryState,
  requestState
} from '@/lib/recoil/state'
import { LoadingRing } from '@/ui/atom/Loading'
import { PlaceDetail } from '@/ui/googleMap/PlaceDetail'
import { UserMapInfo } from '@/ui/googleMap/components/UserMapInfo'

const mapContainerClassName = 'z-10 relative w-full h-full overflow-hidden touch-none'

type Library = 'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization'
const loaderOptions = {
  id: 'google-map-script',
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  version: 'weekly',
  libraries: ['places'] as Library[]
}
/** mapロードfetcher */
const fetcher = ([loader]: [Loader]) => loader.load()

export const MyMapComponent = memo(function MyMapComponent() {
  const ref = useRef<HTMLDivElement>(null)
  const loader = useMemo(() => new Loader(loaderOptions), [])
  const center = useRecoilValue(geoLocation)
  const [map, setMap] = useRecoilState(mapState)
  const mapOptions = useRecoilValue(mapOptionsState)
  const isLoading = useRecoilValue(isLoadingState)
  const setMakersLocation = useSetRecoilState(makersLocationState)
  const request = useRecoilValue(requestState)
  const query = useRecoilValue(queryState)
  // swrでフェッチすることでキャッシュ化・suspenseに対応
  const { data: googleScript } = useSWR([loader, ref.current, mapOptions], fetcher, {
    focusThrottleInterval: 2000,
    loadingTimeout: 2510
  })
  /** 検索関数 */
  const textSearch: () => void = useCallback(() => {
    setMakersLocation(null)
    if (map && request) {
      const service = new window.google.maps.places.PlacesService(map)
      service.textSearch(request, callback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, request])

  /** 検索結果のcallback */
  const callback: (
    a: google.maps.places.PlaceResult[] | null,
    b: google.maps.places.PlacesServiceStatus,
    c: google.maps.places.PlaceSearchPagination | null
  ) => void = (
    results: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      setMakersLocation(results)
    } else {
      // 失敗した場合再帰的に検索
      textSearch()
    }
  }
  useEffect(() => {
    if (ref.current && googleScript) {
      const map = new googleScript.maps.Map(ref.current, mapOptions)
      setMap(map)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleScript])

  useEffect(() => {
    textSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, textSearch, query])
  console.log(query)

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
