import { FirebaseError } from 'firebase/app'

import { isFirebaseError } from '@/lib/firebase'

type JpErrorMessageObj = {
  [key: string]: string
}

const jpErrorMessageObj: JpErrorMessageObj = {
  EMAIL_NOT_FOUND: 'メールが登録されていません。メールアドレスを確認し，もう一度ログインてください',
  'auth/email-already-in-use': 'すでに登録済みです。ログイン画面からログインしてください',
  'auth/user-not-found':
    'メールが未登録です。メールをもう一度確認するか、新規登録からメールを登録してください。',
  'auth/wrong-password': 'パスワードが間違っています。もう一度確認してください。'
}

export const handleError = (error: Error | unknown) => {
  let errorMessage = '通信エラーです。お手数ですが，サポートまでお問い合わせください。'
  if (error instanceof FirebaseError && isFirebaseError(error)) {
    errorMessage =
      jpErrorMessageObj[error.code] ??
      '認証エラーです。お手数ですが，サポートまでお問い合わせください。'
    return errorMessage
  }
  throw new Error('通信エラーです。お手数ですが，サポートまでお問い合わせください。')
}
