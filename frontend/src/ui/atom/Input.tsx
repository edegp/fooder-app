import { memo, ReactNode, useMemo } from 'react'

import styled from 'styled-components'

import { colors } from '@/lib/modules/colors'

const InputBase = styled.input<{ radius: number }>`
  width: 100%;
  font-size: 16px;
  padding: 0 20px;
  border-radius: ${({ radius }) => radius}px;
  border: 1px solid ${colors.gray[600]};
`

const InputWrapper = styled.div<{ height: number; width: number }>`
  height: ${({ height }) => height}px;
  border-radius: 8px;
  width: ${({ width }) => width}vw;
  max-width: 420px;
  display: flex;
  position: relative;
  > svg,
  button {
    position: absolute;
    right: 2vw;
    align-self: center;
  }
`

export const Input = memo(function Input({
  isShowPassword,
  endAdornment,
  type,
  className,
  radius = 8,
  height = 48,
  width = 75,
  ...props
}: React.ComponentProps<'input'> & {
  isShowPassword?: boolean
  endAdornment?: ReactNode
  radius?: number
  height?: number
  maxWidth?: number
}) {
  const inputType = useMemo(() => {
    if (type === 'password') {
      return isShowPassword ? 'password' : 'text'
    }
    return type
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowPassword])

  return (
    <InputWrapper className={className} height={height} width={width}>
      <InputBase type={inputType} radius={radius} {...props} />
      {endAdornment}
    </InputWrapper>
  )
})
