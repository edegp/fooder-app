import { onAuthStateChanged } from '@firebase/auth'
import { string } from '@recoiljs/refine'
import { User } from 'firebase/auth'
import { atom, selector } from 'recoil'
import { urlSyncEffect } from 'recoil-sync'

import { auth } from '../firebase/firebase'

import { localStorageEffect } from '@/lib/recoil/localstrageEffect'

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
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          setSelf(user)
        }
      })
      return () => unsubscribe()
    },
    localStorageEffect('currentUserState')
  ]
})

export { clientSize, isPcBrowser, mapState, placeDetailState, urlState, emailState, loginStatus, currentUserInfo }
