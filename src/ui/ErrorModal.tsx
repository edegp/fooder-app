import React, { useEffect, useState } from 'react'

import Button from '@/ui/Button'
import Modal from '@/ui/Modal'

export const ErrorModal = ({ error, ...props }: { error: { message: string; code: string } }) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(!!error.message || !!error.code)
  }, [error])
  return (
    <Modal close={() => setOpen(false)} open={open} {...props}>
      <p>{error.message || error.code}</p>
      <Button>OK</Button>
    </Modal>
  )
}
