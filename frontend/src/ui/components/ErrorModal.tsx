import React, { useEffect } from 'react'

import { useOpenState } from '@/lib/hooks/useOpenState'
import Button from '@/ui/atom/Button'
import Modal from '@/ui/atom/Modal'

export const ErrorModal = ({ error, ...props }: { error: { message: string; code: string } }) => {
  const { isOpen, setIsOpen, handleClose } = useOpenState()

  useEffect(() => {
    setIsOpen(!!error.message || !!error.code)
  }, [error])

  return (
    <Modal handleClose={handleClose} isOpen={isOpen} {...props}>
      <p>{error.message || error.code}</p>
      <Button>OK</Button>
    </Modal>
  )
}
