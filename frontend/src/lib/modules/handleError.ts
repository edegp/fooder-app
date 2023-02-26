import { FirebaseError } from 'firebase/app'

import { isFirebaseError } from '../firebase'

import { getJpErrorMessage } from '@/lib/modules/getJpErrorMessage'

export const handleError = (error: Error | unknown) => {
  let errorMessage = '通信エラーです。お手数ですが，サポートまでお問い合わせください。'
  if (error instanceof FirebaseError && isFirebaseError(error)) {
    if (error.code === 'EMAIL_NOT_FOUND' || error.code === 'auth/email-already-in-use') {
      errorMessage = getJpErrorMessage(error.code)
    }
    throw new Error(errorMessage)
  }
  throw new Error('通信エラーです。お手数ですが，サポートまでお問い合わせください。')
}
