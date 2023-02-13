import { onAuthStateChanged } from '@firebase/auth'
import { User } from 'firebase/auth'
import { atom, useRecoilValue } from 'recoil'

import { auth } from '@/lib/firebase/firebase'

const userState = atom<User | null>({
  key: 'userState',
  effects: [
    ({ setSelf }) => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          setSelf(user)
        } else {
          setSelf(null)
        }
      })
      return () => unsubscribe()
    }
  ]
})

export const useUser = () => useRecoilValue(userState)
