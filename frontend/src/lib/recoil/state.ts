import { onAuthStateChanged } from '@firebase/auth'
import { nullable, custom } from '@recoiljs/refine'
import { User, UserInfo, UserMetadata } from 'firebase/auth'
import { DefaultValue, RecoilValue, atom, selector } from 'recoil'
import { urlSyncEffect } from 'recoil-sync'

import { auth } from '@/lib/firebase'
import { localStorageEffect } from '@/lib/recoil/localstrageEffect'

type UserMapInfo = {
  location?: google.maps.LatLngLiteral | null
  zoom: number
  query: string
  radius: number
  type: string
  disableDefaultUI: boolean
}

type Request = {
  query: string
  location: google.maps.LatLngLiteral
  radius: number
  type: string
} | null

class UserObject {
  emailVerified: boolean
  isAnonymous: boolean
  metadata: UserMetadata
  providerData: UserInfo[]
  refreshToken: string
  tenantId: string | null
  email: string | null
  loginStatus?: boolean

  constructor(user: User & { loginStatus?: boolean }) {
    this.emailVerified = user.emailVerified
    this.isAnonymous = user.isAnonymous
    this.metadata = user.metadata
    this.providerData = user.providerData
    this.refreshToken = user.refreshToken
    this.tenantId = user.tenantId
    this.email = user.email
    this.loginStatus = user.loginStatus
  }
}

const clientSize = atom({
  key: 'clientSize',
  default: [0, 0]
})

const isPcBrowser = selector({
  key: 'isPcBrowser',
  get: ({ get }) => {
    const [clientWidth] = get(clientSize) as number[]
    return clientWidth > 768
  }
})

const userMapInfoState = atom<UserMapInfo>({
  key: 'mapUserInfoState',
  default: {
    zoom: 15,
    disableDefaultUI: true,
    radius: 500,
    query: '',
    type: 'restaurant'
  }
})

const geoLocation = selector<google.maps.LatLngLiteral | null>({
  key: 'geoLocation',
  get: ({ get }) => {
    const { location } = get(userMapInfoState)
    return location === undefined ? null : location
  },
  set: ({ set, get }, newValue) => {
    const userMapInfo = get(userMapInfoState)
    if (newValue instanceof DefaultValue) return
    set(userMapInfoState, { ...userMapInfo, location: newValue })
  }
})

const mapOptionsState = selector({
  key: 'mapOptionsState',
  get: ({ get }) => {
    const { zoom, location, disableDefaultUI } = get(userMapInfoState)
    return {
      zoom,
      center: location,
      disableDefaultUI
    }
  },
  dangerouslyAllowMutability: true
})

const queryState = selector<string>({
  key: 'queryState',
  get: ({ get }) => {
    const { query } = get(userMapInfoState)
    return query ?? ''
  },
  set: ({ set, get }, newValue) => {
    const userMapInfo = get(userMapInfoState)
    if (newValue instanceof DefaultValue) return
    set(userMapInfoState, { ...userMapInfo, query: newValue })
  }
})

const requestState = selector<Request>({
  key: 'requestState',
  get: ({ get }) => {
    const { query, location, radius, type } = get(userMapInfoState)
    if (!location) return null
    return {
      query,
      location,
      radius,
      type
    }
  },
  dangerouslyAllowMutability: true
})

const mapState = atom<google.maps.Map | null>({
  key: 'mapState',
  default: null,
  effects: [
    ({ onSet, getPromise, setSelf }) => {
      onSet(async map => {
        if (map instanceof DefaultValue) return
        const center = await getPromise(geoLocation)
        const detail = await getPromise(placeDetailState)
        if (map && center) {
          map.setCenter(center)
          setSelf(map)
        }
        if (map && detail) {
          map.setClickableIcons(!!detail)
          setSelf(map)
        }
      })
    }
  ],
  dangerouslyAllowMutability: true
})

const placeDetailState = atom<google.maps.places.PlaceResult | null>({
  key: 'placeDetailState',
  default: null,
  dangerouslyAllowMutability: true
})

const makersLocationState = atom<google.maps.places.PlaceResult[] | null>({
  key: 'makersLocationState',
  default: null,
  dangerouslyAllowMutability: true
})

const loginStatus = selector<boolean>({
  key: 'loginStatus',
  get: ({ get }) => {
    const user = get(currentUserInfo)
    return user?.loginStatus ?? false
  },
  set: ({ set, get }, newValue) => {
    const user = get(currentUserInfo)
    if (newValue instanceof DefaultValue) return
    if (user) {
      set(currentUserInfo, { ...user, loginStatus: newValue })
    }
  }
})

const emailState = selector<string>({
  key: 'emailState',
  get: ({ get }) => {
    return get(currentUserInfo)?.email ?? ''
  },
  set: ({ set, get }, newValue) => {
    const user = get(currentUserInfo)
    if (newValue instanceof DefaultValue) return
    set(currentUserInfo, { ...user, email: newValue } as UserObject)
  }
})

const currentUserInfo = atom<UserObject | null | undefined>({
  key: 'currentUserInfo',
  default: null,
  effects: [
    ({ setSelf }) => {
      const unsubscribe = onAuthStateChanged(auth, async user => {
        if (user) {
          setSelf({ ...user, loginStatus: true })
        }
      })
      return () => unsubscribe()
    },
    localStorageEffect('currentUserState'),
    urlSyncEffect({
      storeKey: 'url',
      refine: nullable(custom(x => (x instanceof UserObject && x !== undefined ? x : null))),
      read: ({ read }) => read('url'),
      write: ({ write }, newValue) => {
        if (newValue instanceof DefaultValue) return
        if (!newValue) return write('url', 'signup')
        write('url', newValue.loginStatus ? '/' : 'signin')
      }
    })
  ],
  dangerouslyAllowMutability: true
})

const isLoadingState = selector<boolean>({
  key: 'isLoading',
  get: ({ get }) => {
    const [location, map] = [geoLocation, mapState].map(
      (
        state: RecoilValue<
          google.maps.places.PlaceResult | google.maps.LatLngLiteral | google.maps.Map | null
        >
      ) => get(state)
    )
    return location === null || map === null
  }
})

const errorMessageState = atom<string>({
  key: 'errorMessageState',
  default: ''
})

export {
  clientSize,
  isPcBrowser,
  queryState,
  requestState,
  mapState,
  placeDetailState,
  makersLocationState,
  geoLocation,
  mapOptionsState,
  emailState,
  loginStatus,
  currentUserInfo,
  isLoadingState,
  errorMessageState
}
