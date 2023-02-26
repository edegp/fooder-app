import { ReactNode, RefAttributes } from 'react'

import Link, { LinkProps } from 'next/dist/client/link'

import styled from 'styled-components'

import { Button } from '@/ui/atom/Button'

const ButtonLinkComponent = styled(Button.withComponent('span'))`
  > a {
    display: inline-block;
  }
`

export const ButtonLink = ({
  href,
  children,
  ...props
}: LinkProps & {
  children?: ReactNode
} & RefAttributes<HTMLButtonElement>) => (
  <ButtonLinkComponent {...props}>
    <Link href={href}>{children}</Link>
  </ButtonLinkComponent>
)
