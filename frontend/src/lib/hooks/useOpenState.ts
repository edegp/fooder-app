/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'

export const useOpenState = (initialState: boolean | null = false) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(initialState)
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])
  const handleToggle = useCallback(() => setIsOpen(!!isOpen), [isOpen])
  return { isOpen: isOpen as boolean, nullableIsOpen: isOpen, setIsOpen, handleOpen, handleClose, handleToggle }
}
