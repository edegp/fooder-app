export const getJpErrorMessage = (message: string) => {
  if (message === 'EMAIL_NOT_FOUND') {
    return 'メールが登録されていません。メールアドレスを確認し，もう一度ログインてください'
  } else if (message === 'auth/email-already-in-use') {
    return 'すでに登録済みです。ログイン画面からログインしてください'
  }
  return ''
}
