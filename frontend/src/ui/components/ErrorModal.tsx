import { memo, useCallback, useEffect } from 'react'

import { useOpenState } from '@/lib/hooks/useOpenState'
import { Button } from '@/ui/atom/Button'
import { ButtonLink } from '@/ui/atom/ButtonLink'
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
    error === 'メールが未登録です。メールをもう一度確認するか新規登録からメールを登録してください。' ? (
      <div className="flex space-x-3">
        <ButtonLink href="/signup" onClick={handleClick}>
          新規登録
        </ButtonLink>
        <Button onClick={handleClick}>ログイン</Button>
      </div>
    ) : (
      <Button onClick={handleClick}>OK</Button>
    )

  return (
    <Modal handleClose={handleClick} isOpen={isOpen} title={error || ''} button={<Buttons />} size="sm" {...props} />
  )
})
