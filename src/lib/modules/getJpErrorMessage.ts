export const getJpErrorMessage = (message: string) => {
  if (message === 'EMAIL_NOT_FOUND') {
    return 'メールが登録されていません。メールアドレスを確認し，もう一度ログインてください'
  }
}
