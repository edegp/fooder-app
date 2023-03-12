'use client'

import { memo, useMemo, useRef } from 'react'

import { Loader } from '@googlemaps/js-api-loader'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import useSWR from 'swr'

import { useSearchPlace } from '@/lib/hooks/useSearchPlace'
import { isLoadingState, mapOptionsState, mapState } from '@/lib/recoil/mapState'

import { LoadingRing } from '@/ui/atom/Loading'

import { PlaceDetail } from '@/ui/components/googleMap/PlaceDetail'
import { UserMapInfo } from '@/ui/components/UserMapInfo'

const mapContainerClassName = 'z-10 relative w-full h-full overflow-hidden touch-none'

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
  const mapOptions = useRecoilValue(mapOptionsState)
  const isLoading = useRecoilValue(isLoadingState)
  const setMap = useSetRecoilState(mapState)

  // swrでフェッチすることでキャッシュ化・suspenseに対応
  useSWR(ref.current ? [loader, ref.current, mapOptions] : null, fetcher, {
    focusThrottleInterval: 2000,
    keepPreviousData: true,
    errorRetryInterval: 3500,
    revalidateIfStale: false,
    onSuccess: data => setMap(data),
    onError: error => new Error('mapを読み込めませんでした。再読み込みしてください %s', error.message)
  })

  // 場所の検索
  useSearchPlace()

  return (
    <>
      <LoadingRing visible={isLoading} />
      <div className="flex h-screen overflow-hidden">
        <div className={mapContainerClassName} ref={ref}>
          {!isLoading && <UserMapInfo />}
        </div>
        {!isLoading && <PlaceDetail />}
      </div>
    </>
  )
})
