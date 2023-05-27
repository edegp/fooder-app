'use client'

import { memo, useCallback, useEffect, useMemo } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { signOut } from 'firebase/auth'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { auth } from '@/lib/firebase'
import { useOpenState } from '@/lib/hooks/useOpenState'
import { loginStatus } from '@/lib/recoil/state'
import { Drawer } from '@/ui/atom/Drawer'
import { SearchInput } from '@/ui/components/SearchInput'

type Menu = {
  wording: string
  path?: string
  onClick?: () => void
}

const HeadContainer = styled.header`
  height: 64px;
  background-color: white;
  position: relative;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
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
  margin: 0 16px;
`

export const Header = memo(function Header() {
  const { nullableIsOpen, setIsOpen, handleClose, handleOpen } = useOpenState(null)
  const [isLogin, setIsLogin] = useRecoilState(loginStatus)
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = useCallback(() => {
    signOut(auth).then(() => {
      setIsLogin(false)
      router.push('/signin')
    })
    handleClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const loginList = useMemo(
    () =>
      isLogin
        ? [{ wording: 'ログアウト', onClick: handleSignOut }]
        : [
            { wording: 'ログイン', path: '/signin' },
            { wording: '新規登録', path: '/signup' }
          ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLogin, handleSignOut]
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
        {pathname === '/' && <SearchInput />}
        <HiOutlineMenuAlt4 onClick={handleOpen} className="mx-6 h-9 w-9 text-lg" />
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
