import { memo, useCallback, useEffect } from 'react'

import { ButtonLink } from '../atom/ButtonLink'

import { useOpenState } from '@/lib/hooks/useOpenState'
import { Button } from '@/ui/atom/Button'
import { Modal } from '@/ui/atom/Modal'

export const ErrorModal = memo(function ErrorModal({
  error,
  resetError,
  ...props
}: {
  error: string | null
  resetError: () => void
}) {
  const { isOpen, setIsOpen, handleClose } = useOpenState()

  useEffect(() => {
    setIsOpen(!!error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const handleClick = useCallback(() => {
    handleClose()
    resetError()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetError])
  const Buttons = () =>
    error ===
    'メールアドレスが未登録です。メールアドレスをもう一度確認してください。未登録の方は，新規登録からメールアドレスを登録してください。' ? (
      <div className="space-x-4">
        <ButtonLink href="/signup">新規登録</ButtonLink>
        <Button onClick={handleClick}>ログイン</Button>
      </div>
    ) : (
      <Button onClick={handleClick}>OK</Button>
    )

  return <Modal handleClose={handleClick} isOpen={isOpen} title={error || ''} button={<Buttons />} {...props} />
})
