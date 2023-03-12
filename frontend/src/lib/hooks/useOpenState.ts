import { useCallback, useMemo, useState } from 'react'

export const useOpenState = (initialState: boolean | null = false) => {
  const [nullableIsOpen, setIsOpen] = useState<boolean | null>(initialState)
  const isOpen = useMemo(() => !!nullableIsOpen, [nullableIsOpen])
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])
  const handleToggle = useCallback(() => setIsOpen(!!isOpen), [isOpen])
  return { isOpen, nullableIsOpen, setIsOpen, handleOpen, handleClose, handleToggle }
}
