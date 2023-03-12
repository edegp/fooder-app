import { atom, selector } from 'recoil'

export type Request = {
  query: string
  location: google.maps.LatLngLiteral | undefined
  radius: number
  openNow: boolean
  type: string
}

const geoLocation = atom<google.maps.LatLngLiteral | undefined>({
  key: 'geoLocation',
  default: undefined
})

const mapOptionsState = selector({
  key: 'mapOptionsState',
  get: ({ get }) => ({
    mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    zoom: 15,
    center: get(geoLocation),
    mapTypeControl: false,
    fullscreenControl: false
  }),
  dangerouslyAllowMutability: true
})

const requestState = selector<Request>({
  key: 'request',
  get: ({ get }) => ({
    query: get(searchQueryState),
    location: get(geoLocation),
    radius: 500,
    openNow: true,
    type: 'restaurant'
  })
})

const mapState = atom<google.maps.Map | null>({
  key: 'mapState',
  default: null,
  dangerouslyAllowMutability: true
})

const placeDetailState = atom<google.maps.places.PlaceResult | null>({
  key: 'placeDetailState',
  default: null,
  dangerouslyAllowMutability: true
})

selector({
  key: 'clickable',
  get: ({ get, getCallback }) => {
    const clickable = !!get(placeDetailState)
    const map = get(mapState)
    if (map && clickable) {
      getCallback(({ set }) => () => {
        map.setClickableIcons(clickable)
        set(mapState, map)
      })
    }
  }
})

const markersLocationState = atom<google.maps.places.PlaceResult[] | null>({
  key: 'markersLocationState',
  default: null,
  dangerouslyAllowMutability: true
})

const isLoadingState = selector<boolean>({
  key: 'isLoading',
  get: ({ get }) => !get(geoLocation) || !get(mapState) || !get(markersLocationState)
})

const searchQueryState = atom<string>({
  key: 'searchQuery',
  default: ''
})

export {
  mapState,
  requestState,
  placeDetailState,
  markersLocationState,
  geoLocation,
  mapOptionsState,
  isLoadingState,
  searchQueryState
}
