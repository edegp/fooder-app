'use client'

import { memo, useCallback, useEffect, useMemo } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { signOut } from 'firebase/auth'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { auth } from '@/lib/firebase'
import { useOpenState } from '@/lib/hooks/useOpenState'
import { userStatus } from '@/lib/recoil/state'

import { Drawer } from '@/ui/atom/Drawer'

import { SearchBox } from '@/ui/components/SearchBox'

type Menu = {
  wording: string
  path?: string
  onClick?: () => void
}

const HeadContainer = styled.header`
  width: 98%;
  height: 60px;
  margin: 0 auto;
  background-color: white;
  position: absolute;
  top: 1.5vh;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 15;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  border-radius: 28px;
`

const HeaderShadow = styled.div`
  content: '';
  position: absolute;
  width: 100%;
  bottom: -1.56rem;
  left: 0px;
  background-image: radial-gradient(closest-side, rgba(0, 0, 0, 0.6) 0px, rgba(0, 0, 0, 0.2) 40%, transparent 120%);
  background-position: 0% -0.94rem;
  background-repeat: no-repeat;
  height: 1.36rem;
  overflow: hidden;
  pointer-events: none;
  z-index: 20;
  visibility: visible;
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 0 15px 0 10px;
`

export const Header = memo(function Header() {
  const { nullableIsOpen, setIsOpen, handleClose, handleOpen } = useOpenState(null)
  const router = useRouter()
  const pathname = usePathname()
  const isLogin = useRecoilValue(userStatus)

  const handleSignOut = useCallback(() => {
    signOut(auth).then(() => {
      router.push('/signin')
    })
    handleClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const menuList: Menu[] = useMemo(
    () => [
      ...(isLogin
        ? [{ wording: 'ログアウト', onClick: handleSignOut }]
        : [
            { wording: 'ログイン', path: '/signin' },
            { wording: '新規登録', path: '/signup' }
          ]),
      { wording: 'FAQ', path: '/faq' },
      { wording: 'Support', path: '/help' }
    ],
    [isLogin, handleSignOut]
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
        {pathname === '/' && <SearchBox />}
        <HiOutlineMenuAlt4 onClick={handleOpen} className="m-7 h-9 w-9 text-lg" />
        {pathname !== '/' && <HeaderShadow />}
      </HeadContainer>
      <Drawer handleClose={handleClose} isOpen={nullableIsOpen} className="p-12 md:p-24">
        <ul className="space-y-8">
          {menuList.map((menu, i) => (
            <li key={i}>
              {menu.path ? (
                <span onClick={handleClose}>
                  <Link href={menu.path}>{menu.wording}</Link>
                </span>
              ) : (
                <button onClick={menu?.onClick}>{menu.wording}</button>
              )}
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  )
})
