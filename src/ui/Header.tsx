'use client'

import { memo, useCallback, useState } from 'react'

import Link from 'next/link'

import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import styled from 'styled-components'

import { Drawer } from '@/ui/Drawer'

const HeadContainer = styled.header`
  height: 64px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
`

const Title = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin: 0 10px;
`

export const Header = memo(function Header() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = useCallback(() => setOpen(true), [])
  const [open, setOpen] = useState<boolean | null>(null)
  const menuList = [
    { wording: 'ログイン', path: '/signin' },
    { wording: '新規登録', path: '/signup' },
    { wording: 'FAQ', path: '/faq' },
    { wording: 'Support', path: '/help' }
  ]
  return (
    <>
      <HeadContainer>
        <Title>Fooder</Title>
        <HiOutlineMenuAlt4 onClick={handleClick} className="mr-6 h-9 w-9 text-lg" />
      </HeadContainer>
      <Drawer handleClose={() => setOpen(false)} isOpen={open} className="p-10">
        <ul className="space-y-6">
          {menuList.map((menu, i) => (
            <li key={i}>
              <Link href={menu.path}>{menu.wording}</Link>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  )
})
