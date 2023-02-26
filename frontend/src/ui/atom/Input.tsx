import { memo, ReactNode, useMemo } from 'react'

import styled from 'styled-components'

import { colors } from '@/lib/modules/colors'

const InputBase = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 0 20px;
  border-radius: 8px;
  border: 1px solid ${colors.gray[600]};
`

const InputWrapper = styled.div`
  height: 48px;
  border-radius: 8px;
  width: 75vw;
  max-width: 420px;
  display: flex;
  position: relative;
  > svg {
    position: absolute;
    right: 2vw;
    align-self: center;
  }
`

export const Input = memo(function Input({
  isShowPassword,
  endAdornment,
  type,
  ...props
}: React.ComponentProps<'input'> & {
  isShowPassword?: boolean
  endAdornment?: ReactNode
}) {
  const inputType = useMemo(() => {
    if (type === 'password') {
      return isShowPassword ? 'password' : 'text'
    }
    return type
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowPassword])

  return (
    <InputWrapper>
      <InputBase type={inputType} {...props} />
      {endAdornment}
    </InputWrapper>
  )
})
