/* eslint-disable @typescript-eslint/ban-ts-comment */
import styled from 'styled-components'

import { Colors, colors } from '@/lib/modules/colors'

const ButtonComponent = styled.button`
  border-radius: 12px;
  height: 36px;
  padding: 7px 6px;
  font-size: 18px;
  line-height: 1.2;
  text-align: center;
  justify-self: center;
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
`

export default function Button({
  backgroundColor = 'blue',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  backgroundColor?: keyof Colors
}) {
  return (
    <ButtonComponent
      style={{
        // @ts-ignore
        backgroundColor: colors[backgroundColor]?.['500'],
        // @ts-ignore
        color: colors[backgroundColor]?.['50']
      }}
      {...props}
    />
  )
}
