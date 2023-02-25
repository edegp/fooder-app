/* eslint-disable @typescript-eslint/ban-ts-comment */
import { memo } from 'react'

import styled from 'styled-components'

import { Colors, colors } from '@/lib/modules/colors'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  backgroundColor?: keyof Colors
  width?: string | number
  padding?: string
}

const ButtonComponent = styled.button<{ width: string; padding: string }>`
  border-radius: 12px;
  height: ${({ width }) => (width ? width : '2em')};
  padding: ${({ padding }) => (padding ? padding : '0.4em 1.2em')};
  font-size: 18px;
  text-align: center;
  justify-self: center;
  line-height: 22px;
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
`

export const Button = memo(function Button({ backgroundColor = 'neutral', width, ...props }: ButtonProps) {
  if (typeof width === 'number') {
    width = `${width}px`
  }
  return (
    <ButtonComponent
      style={{
        // @ts-ignore
        backgroundColor: colors[backgroundColor]?.['900'],
        // @ts-ignore
        color: colors[backgroundColor]?.['50']
      }}
      width={width}
      {...props}
    />
  )
})
