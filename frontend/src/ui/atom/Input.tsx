import { forwardRef, memo, ReactNode, useMemo } from 'react'

import styled from 'styled-components'

import { colors } from '@/lib/modules/colors'

const InputBase = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 0 20px;
  border-radius: 8px;
  border: 1px solid ${colors.gray[600]};
`

const InputWrapper = styled.div<{ width: string }>`
  height: 48px;
  border-radius: 8px;
  width: ;
  max-width: 420px;
  display: flex;
  position: relative;
  width: ${({ width }) => (width ? width : '75vw')};
  > svg {
    position: absolute;
    right: 2vw;
    align-self: center;
  }
`

export const Input = memo(
  forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'> & {
      isShowPassword?: boolean
      endAdornment?: ReactNode
    }
  >(function Input(
    {
      isShowPassword,
      endAdornment,
      type,
      width,
      ...props
    }: React.ComponentProps<'input'> & {
      isShowPassword?: boolean
      endAdornment?: ReactNode
    },
    ref
  ) {
    const inputType = useMemo(() => {
      if (type === 'password') {
        return isShowPassword ? 'password' : 'text'
      }
      return type
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowPassword])

    return (
      <InputWrapper width={width}>
        <InputBase type={inputType} ref={ref} {...props} />
        {endAdornment}
      </InputWrapper>
    )
  })
)
