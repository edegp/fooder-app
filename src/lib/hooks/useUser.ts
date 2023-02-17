import { User, onAuthStateChanged } from 'firebase/auth'
import { atom, useRecoilValue } from 'recoil'

import { auth } from '@/lib/firebase/firebase'
import { localStorageEffect } from '@/lib/recoil/localstrageEffect'

export const currentUserInfo = atom<User | null>({
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

export const useUser = () => useRecoilValue(currentUserInfo)
