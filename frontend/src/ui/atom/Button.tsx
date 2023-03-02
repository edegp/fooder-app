/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HTMLAttributes } from 'react'

import styled from 'styled-components'

import { Colors, colors } from '@/lib/modules/colors'

type ButtonProps = {
  backgroundColor?: keyof Colors
  width?: string | number
  padding?: string
}

const ButtonComponent = ({
  padding: _padding,
  width: _width,
  backgroundColor: _backgroundColor,
  ...props
}: HTMLAttributes<HTMLButtonElement> & ButtonProps) => <button {...props} />

export const Button = styled(ButtonComponent)`
  border-radius: 12px;
  height: ${({ width }) => (typeof width === 'number' ? `${width}px` : width ? width : '2em')};
  max-width: 420px;
  padding: ${({ padding }) => (padding ? padding : '0.4em 1em')};
  background-color: ${({ backgroundColor }) =>
    // @ts-ignore
    backgroundColor ? colors[backgroundColor]?.['800'] : colors['neutral']?.['900']};
  color: ${({ backgroundColor }) =>
    // @ts-ignore
    backgroundColor ? colors[backgroundColor]?.['200'] : colors['neutral']?.['200']};
  font-size: 18px;
  text-align: center;
  justify-self: center;
  line-height: 22px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`
