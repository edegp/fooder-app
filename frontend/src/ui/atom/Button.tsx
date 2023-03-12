/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HTMLAttributes } from 'react'

import styled from 'styled-components'

import { Colors, colors } from '@/lib/modules/colors'

type ButtonProps = {
  backgroundColor?: keyof Colors
  width?: string | number
  padding?: string
  radius?: number
}

const ButtonComponent = ({
  padding: _padding,
  width: _width,
  backgroundColor: _backgroundColor,
  radius: _radous,
  ...props
}: HTMLAttributes<HTMLButtonElement> & ButtonProps) => <button {...props} />

export const Button = styled(ButtonComponent)`
  border-radius: ${({ radius = 12 }) => radius}px;
  height: ${({ width }) => (typeof width === 'number' ? `${width}px` : width ? width : '2em')};
  max-width: 420px;
  padding: ${({ padding }) => (padding ? padding : '0.4em 1em')};
  background-color: ${({ backgroundColor = 'neutral' }) =>
    ['white', 'black', 'transparent'].includes(backgroundColor)
      ? colors[backgroundColor]
      : // @ts-ignore
        colors[backgroundColor]?.['800']};
  color: ${({ backgroundColor = 'neutral' }) =>
    backgroundColor === 'white' || backgroundColor === 'transparent'
      ? colors['black']
      : backgroundColor === 'black'
      ? colors['white']
      : // @ts-ignore
        colors[backgroundColor]?.['200']};
  font-size: 18px;
  text-align: center;
  justify-self: center;
  line-height: 22px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`
