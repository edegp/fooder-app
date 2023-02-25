import { memo, useCallback, useEffect } from 'react'

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

  return (
    <Modal
      handleClose={handleClick}
      isOpen={isOpen}
      title={error || ''}
      button={<Button onClick={handleClick}>OK</Button>}
      {...props}
    />
  )
})
