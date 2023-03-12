import { useEffect } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import type { Request } from '@/lib/recoil/mapState'
import { mapState, markersLocationState, requestState } from '@/lib/recoil/mapState'

export const useSearchPlace = () => {
  const setMarkersLocation = useSetRecoilState(markersLocationState)
  const request = useRecoilValue(requestState)
  const map = useRecoilValue(mapState)
  /** 検索結果のcallback */
  const callback = (
    results: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      setMarkersLocation(results)
    } else {
      textSearch(map, request, callback) // 失敗した場合、再帰的に検索
    }
  }
  /** 検索関数 */
  const textSearch = async (
    map: google.maps.Map | null,
    request: Request,
    callback: (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => void
  ) => {
    if (map) {
      const service = new window.google.maps.places.PlacesService(map)
      service.textSearch(request, callback)
    }
  }

  useEffect(() => {
    textSearch(map, request, callback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, request])
}
