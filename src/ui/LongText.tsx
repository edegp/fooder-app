import { ReactNode, useState } from 'react'

type Props = {
  children: ReactNode | string
  className: string
  isEllipsis?: boolean
}
export const LongText = ({ children, className, isEllipsis }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClick = () => setOpen(true)
  if (!open && isEllipsis && typeof children === 'string') {
    if (children.length > 50) {
      return (
        <div className={className}>
          {children.slice(0, 50)}…<span onClick={handleClick}>続きを読む</span>
        </div>
      )
    }
  }
  return <div className={className}>{children}</div>
}
