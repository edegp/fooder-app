import { User, onAuthStateChanged } from 'firebase/auth'
import { atom, useRecoilValue } from 'recoil'

import { auth } from '@/lib/firebase/firebase'
import { localStorageEffect } from '@/lib/recoil/localstrageEffect'

export const currentUserState = atom<User>({
  key: 'currentUserState',
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

export const useUser = () => useRecoilValue(currentUserState)
