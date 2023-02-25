import { onAuthStateChanged } from '@firebase/auth'
import { string } from '@recoiljs/refine'
import { User } from 'firebase/auth'
import { atom, selector } from 'recoil'
import { urlSyncEffect } from 'recoil-sync'

import { auth } from '@/lib/firebase/firebase'
import { localStorageEffect } from '@/lib/recoil/localstrageEffect'

// // predicate
// const isRecoilState = (
//   recoilState: RecoilState<unknown> | boolean | null = false
// ): recoilState is RecoilState<unknown> => {
//   const maybeType: RecoilState<unknown> | null =
//     recoilState !== null && typeof recoilState !== 'boolean' && 'key' in recoilState ? recoilState : null
//   return !!maybeType
// }

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

const geoLocation = atom<google.maps.LatLngLiteral | null>({
  key: 'geoLocation',
  default: null
})

const mapOptionsState = selector({
  key: 'mapOptionsState',
  get: ({ get }) => ({
    zoom: 15,
    center: get(geoLocation)
  }),
  dangerouslyAllowMutability: true
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

const makersLocationState = atom<google.maps.places.PlaceResult[] | null>({
  key: 'makersLocationState',
  default: null,
  dangerouslyAllowMutability: true
})

const urlState = atom<string>({
  key: 'urlState',
  effects: [
    ({ getPromise, setSelf }) => {
      getPromise(currentUserInfo).then(user => {
        getPromise(loginStatus).then(login => {
          if (user) {
            setSelf(login ? '/' : 'signin')
          } else {
            setSelf('signup')
          }
        })
      })
    },
    urlSyncEffect({ storeKey: 'url', refine: string() })
  ]
})

const loginStatus = atom<boolean>({
  key: 'loginStatus',
  default: false,
  effects: [
    ({ setSelf }) => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          setSelf(true)
        } else {
          setSelf(false)
        }
      })
      return () => unsubscribe()
    }
  ]
})

const emailState = atom<string>({
  key: 'emailState',
  default: '',
  effects: [localStorageEffect('emailState')]
})

const currentUserInfo = atom<User | null>({
  key: 'currentUserInfo',
  default: null,
  effects: [
    ({ setSelf }) => {
      const unsubscribe = onAuthStateChanged(auth, async user => {
        if (user) {
          setSelf(user)
        }
      })
      return () => unsubscribe()
    },
    localStorageEffect('currentUserState')
  ]
})

// const openSelectorFamily = selectorFamily({
//   key: 'open',
//   get:
//     (state: RecoilState<unknown>) =>
//     ({ get }: { get: GetRecoilValue }) =>
//       !!get(state),
//   set: ({ set }: { set: any }, newValue: boolean) => set(newValue)
// })

export {
  clientSize,
  isPcBrowser,
  mapState,
  placeDetailState,
  makersLocationState,
  geoLocation,
  mapOptionsState,
  urlState,
  emailState,
  loginStatus,
  currentUserInfo
}
