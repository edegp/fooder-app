import { useState, useCallback } from 'react'

export const useOpenState = (initialState: boolean | null = false) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(initialState)
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])
  const handleToggle = useCallback(() => setIsOpen(prev => !prev), [setIsOpen])
  return { isOpen: isOpen as boolean, nullableIsOpen: isOpen, setIsOpen, handleOpen, handleClose, handleToggle }
}
