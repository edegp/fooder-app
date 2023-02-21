import React from 'react'

import { useOpenState } from '@/lib/hooks/useOpenState'
import Modal from '@/ui/atom/Modal'

export const LoginModal = () => {
  const { isOpen, handleClose } = useOpenState()
  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <h2>ログインに成功しました</h2>
      <p onClick={handleClose}></p>
    </Modal>
  )
}
