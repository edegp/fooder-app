import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/lib/firebase/firebase'

export const signUp = async (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)
export const login = async (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)

export const logout = () => {
  signOut(auth)
}
