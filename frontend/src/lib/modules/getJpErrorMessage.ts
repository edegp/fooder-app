export const getJpErrorMessage = (message: string) => {
  if (message === 'EMAIL_NOT_FOUND') {
    return 'メールが登録されていません。メールアドレスを確認し，もう一度ログインてください'
  } else if (message === 'auth/email-already-in-use') {
    return 'すでに登録済みです。ログイン画面からログインしてください'
  } else if (message === 'auth/user-not-found') {
    return 'メールアドレスが未登録です。メールアドレスをもう一度確認してください。未登録の方は，新規登録からメールアドレスを登録してください。'
  }
  return '認証エラーです。お手数ですが，サポートまでお問い合わせください。'
}
