import { memo, ReactNode } from 'react'

import { useOpenState } from '@/lib/hooks/useOpenState'

type Props = {
  children: ReactNode | string
  className: string
  isEllipsis?: boolean
}

export const Text = memo(function Text({ children, className, isEllipsis }: Props) {
  const { isOpen, handleOpen } = useOpenState()

  if (!isOpen && isEllipsis && typeof children === 'string' && children.length > 60) {
    return (
      <div className={className}>
        {children.slice(0, 50)}
        <span className="cursor-pointer underline hover:opacity-30" onClick={handleOpen}>
          …続きを読む
        </span>
      </div>
    )
  }

  return <div className={className}>{children}</div>
})
