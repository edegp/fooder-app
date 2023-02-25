// import { getAnalytics, isSupported } from 'firebase/analytics'
import { FirebaseError, initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'

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

export const app = initializeApp(firebaseConfig)
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth()

// emulator setting
if (process.env.NODE_ENV !== 'production' && !!process.env.FIREBASE_AUTH_EMULATOR_URL) {
  connectAuthEmulator(auth, process.env.FIREBASE_AUTH_EMULATOR_URL)
}
