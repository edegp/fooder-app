import { onAuthStateChanged } from '@firebase/auth'
import { string } from '@recoiljs/refine'
import { User } from 'firebase/auth'
import { atom, selector } from 'recoil'
import { urlSyncEffect } from 'recoil-sync'

import { auth } from '@/lib/firebase'
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

const urlState = atom<string>({
  key: 'urlState',
  effects: [
    urlSyncEffect({
      storeKey: 'url',
      refine: string(),
      read: ({ read }) => (read('currentUserInfo') ? '/' : '/signin')
    })
  ]
})

const userStatus = atom<boolean | null>({
  key: 'userStatus',
  default: null,
  effects: [
    ({ setSelf }) => {
      const unsubscribe = onAuthStateChanged(auth, async user => {
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

export { clientSize, isPcBrowser, urlState, emailState, userStatus, currentUserInfo }
