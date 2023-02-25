import { useCallback, useState } from 'react'

import { FirebaseError } from 'firebase/app'

import { isFirebaseError } from '../firebase/firebase'
import { getJpErrorMessage } from '../modules/getJpErrorMessage'

export const useError = () => {
  const [error, setError] = useState<string | null>(null)
  const handleError = useCallback((error: unknown) => {
    let errorMessage = '通信エラーです。お手数ですが，サポートまでお問い合わせください。'
    if (error instanceof FirebaseError && isFirebaseError(error)) {
      if (error.code === 'EMAIL_NOT_FOUND' || error.code === 'auth/email-already-in-use') {
        errorMessage = getJpErrorMessage(error.code)
      }
      setError(errorMessage)
      throw new Error(error.message)
    }
    setError(errorMessage)
    throw new Error('通信エラーです。お手数ですが，サポートまでお問い合わせください。')
  }, [])
  return { error, setError, handleError }
}
