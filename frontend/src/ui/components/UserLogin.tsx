'use client'

import { FormEvent, memo, useCallback, useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import { usePathname, useRouter } from 'next/navigation'

import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { auth, isFirebaseError } from '@/lib/firebase/firebase'
import { getJpErrorMessage } from '@/lib/modules/getJpErrorMessage'
import { emailState } from '@/lib/recoil/state'
import Button from '@/ui/atom/Button'
import { Input } from '@/ui/atom/Input'
import { LoadingRing } from '@/ui/atom/Loading'
import { ErrorModal } from '@/ui/components/ErrorModal'

const Header = dynamic(
  import('@/ui/atom/Header').then(module => module.Header),
  { ssr: false, loading: () => <LoadingRing /> }
)

type userForm = EventTarget & {
  email: HTMLInputElement
  password: HTMLInputElement
}

const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 0 48px;
  margin: 20vh auto;
  > *:not(:last-child) {
    margin-bottom: 16px;
  }
`

export const UserLogin = memo(function UserLogin() {
  const router = useRouter()
  const pathname = usePathname()
  const [error, setError] = useState<{ message: string; code: string }>({ message: '', code: '' })
  const [email, setEmail] = useRecoilState(emailState)
  const [isShowPassword, setIsShowPassword] = useState(true)

  const handleError = useCallback((error: unknown) => {
    if (error instanceof FirebaseError && isFirebaseError(error)) {
      let errorMessage = ''
      if (error.code === 'EMAIL_NOT_FOUND' || error.code === 'auth/email-already-in-use') {
        errorMessage = getJpErrorMessage(error.code)
      }
      setError({ message: errorMessage, code: error.code })
      throw new Error(error.message)
    }
    throw new Error('通信エラーです。お手数ですが，サポートまでお問い合わせください。')
  }, [])

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      const { email, password }: { email: HTMLInputElement; password: HTMLInputElement } = event.target as userForm
      setEmail(email.value)
      if (email && password) {
        try {
          const result =
            pathname === '/signup'
              ? await createUserWithEmailAndPassword(auth, email.value, password.value)
              : await signInWithEmailAndPassword(auth, email.value, password.value)
          if (result) {
            router.push('/')
          }
        } catch (error) {
          handleError(error)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, pathname]
  )

  const handleShowPassWord = useCallback(() => setIsShowPassword(prev => !prev), [setIsShowPassword])

  return (
    <>
      <Head>
        <title>Fooder Login</title>
      </Head>
      <Header />
      <ErrorModal error={error} />
      <Form onSubmit={handleSubmit}>
        <Input name="email" id="email" type="email" defaultValue={email} placeholder="メールアドレス" required />
        <Input
          name="password"
          id="password"
          type="password"
          defaultValue=""
          placeholder="8文字以上のパスワード"
          minLength={8}
          isShowPassword={isShowPassword}
          endAdornment={
            isShowPassword ? (
              <MdOutlineVisibility onClick={handleShowPassWord} size={28} />
            ) : (
              <MdOutlineVisibilityOff onClick={handleShowPassWord} size={28} />
            )
          }
          required
        />
        <Button type="submit">{pathname === '/signup' ? '登録' : 'ログイン'}</Button>
      </Form>
    </>
  )
})
