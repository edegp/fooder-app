'use client'

import { memo, useEffect, useMemo } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { signOut } from 'firebase/auth'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { auth } from '@/lib/firebase/firebase'
import { useOpenState } from '@/lib/hooks/useOpenState'
import { loginStatus } from '@/lib/recoil/state'
import { Drawer } from '@/ui/atom/Drawer'

type Menu = {
  wording: string
  path?: string
  onClick?: () => Promise<void>
}

const HeadContainer = styled.header`
  height: 64px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 0 10px;
`

export const Header = memo(function Header() {
  const { nullableIsOpen, setIsOpen, handleClose, handleOpen } = useOpenState(null)
  const [isLogin, setIsLogin] = useRecoilState(loginStatus)
  const router = useRouter()
  const pathname = usePathname()

  const loginList = useMemo(
    () =>
      isLogin
        ? [
            {
              wording: 'ログアウト',
              onClick: async () => {
                await signOut(auth)
                setIsLogin(false)
                router.push('/signin')
              }
            }
          ]
        : [
            { wording: 'ログイン', path: '/signin' },
            { wording: '新規登録', path: '/signup' }
          ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLogin]
  )

  const menuList: Menu[] = useMemo(
    () => [...loginList, { wording: 'FAQ', path: '/faq' }, { wording: 'Support', path: '/help' }],
    [loginList]
  )

  //　画面遷移後にヘッダーのDrawerを閉める
  useEffect(() => {
    // first renderingは発火しない nullでアニメーションを無効にして閉じる
    typeof nullableIsOpen === 'boolean' && setIsOpen(null)
    //pathnameが変更された時のみ発火
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      <HeadContainer>
        <Link href="/">
          <Title className="no-underline">Fooder</Title>
        </Link>
        <HiOutlineMenuAlt4 onClick={handleOpen} className="mr-6 h-9 w-9 text-lg" />
      </HeadContainer>
      <Drawer handleClose={handleClose} isOpen={nullableIsOpen} className="p-10">
        <ul className="space-y-6">
          {menuList.map((menu, i) => (
            <li key={i}>
              {menu.path ? <Link href={menu.path}>{menu.wording}</Link> : <a onClick={menu?.onClick}>{menu.wording}</a>}
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  )
})