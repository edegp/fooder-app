'use client'

import { useCallback, memo, useState, useMemo, useRef, useEffect } from 'react'

import { Loader } from '@googlemaps/js-api-loader'
import { useSetRecoilState } from 'recoil'
import useSWR from 'swr'

import { useGeoLocation } from '@/lib/hooks/useGeoLocation'
import { mapState } from '@/lib/recoil/state'
import { InfoWindows } from '@/ui/googleMap/InfoWindows'
import { Marker } from '@/ui/googleMap/Marker'
import { PlaceDetail } from '@/ui/googleMap/PlaceDetail'

const mapContainerClassName = 'z-10 relative w-full h-full overflow-hidden'

type Library = 'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization'

export const MyMapComponent = memo(function MyMapComponent() {
  const center = useGeoLocation()
  const mapOptions = useMemo(
    () => ({
      zoom: 15,
      center: center
    }),
    [center]
  )
  const ref = useRef<HTMLDivElement>(null)
  const [makersLocation, setMakersLocation] = useState<google.maps.places.PlaceResult[] | null>(null)
  const [detail, setDetail] = useState<google.maps.places.PlaceResult | null>(null)
  const loader = useMemo(() => new Loader(loaderOptions), [])
  const setMap = useSetRecoilState(mapState)
  // swrでフェッチすることでキャッシュ化・suspenseに対応
  // const map = ref.current ? use(fetcher([loader, ref.current, mapOptions])) : undefined
  const { data: map } = useSWR(ref.current ? [loader, ref.current, mapOptions] : null, fetcher, {
    suspense: true
  })
  // mapをglobalに定義
  useEffect(() => {
    map && setMap(map)
  }, [map, setMap])

  /** 検索結果のcallback */
  const callback = useCallback(
    (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setMakersLocation(results)
      }
    },
    []
  )

  /** 検索関数 */
  const textSearch = useCallback(() => {
    const request = {
      location: center,
      radius: 500,
      type: 'restaurant'
    }
    if (map) {
      const service = new window.google.maps.places.PlacesService(map)
      service.textSearch(request, callback)
    }
  }, [callback, center, map])

  useEffect(() => {
    if (map) {
      map.setCenter(center)
    }
    textSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center])

  const handleClose = () => setDetail(null)
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <div className={mapContainerClassName} ref={ref}>
        {map && (
          <>
            <Marker
              position={center}
              icon={{ scaledSize: new google.maps.Size(24, 24), url: '/navigate-circle-outline.svg' }}
            />
            <InfoWindows makersLocation={makersLocation} map={map} setDetail={setDetail} />
            <PlaceDetail detail={detail} handleClose={handleClose} />
          </>
        )}
      </div>
    </div>
  )
})
