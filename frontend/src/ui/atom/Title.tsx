import { PropsWithChildren } from 'react'

import styled from 'styled-components'

type Props = PropsWithChildren & {
  level: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const TitleBase = styled.h1`
  font-size: normal;
  letter-spacing: 0.03em;
  font-size: 16px;
`

export const Title = ({ children, level, size = 'md' }: Props) => {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <TitleBase className={`text-${size}`} as={`h${level}`}>
      {children}
    </TitleBase>
  )
}
