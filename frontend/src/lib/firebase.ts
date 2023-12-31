// import { getAnalytics, isSupported } from 'firebase/analytics'
import { FirebaseError, initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth'

// predicate
export const isFirebaseError = (e: Error): e is FirebaseError => {
  const maybeType: Error | null = 'code' in e && 'message' in e ? e : null
  return !!maybeType
}
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ''
}
const url = process.env.FIREBASE_AUTH_EMULATOR_URL || 'http://localhost:9099'

initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const getMyAuth = () => {
  const auth = getAuth()
  if (process.env.NODE_ENV !== 'production') {
    connectAuthEmulator(auth, url)
  }
  return auth
}

export const auth = getMyAuth()

export const signUp = async (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)
export const signIn = async (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)
