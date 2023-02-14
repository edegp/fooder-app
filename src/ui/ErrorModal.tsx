import React, { useEffect, useState } from 'react'

import Button from '@/ui/Button'
import Modal from '@/ui/Modal'

export const ErrorModal = ({ message, ...props }: { message: string }) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(!!message)
  }, [message])
  return (
    <Modal close={() => setOpen(false)} open={open} {...props}>
      <p>{message}</p>
      <Button>OK</Button>
    </Modal>
  )
}
