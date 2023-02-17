'use client'

import { FormEvent, memo, useCallback, useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import { usePathname, useRouter } from 'next/navigation'

import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { auth, isFirebaseError } from '@/lib/firebase/firebase'
import { getJpErrorMessage } from '@/lib/modules/getJpErrorMessage'
import { emailState } from '@/lib/recoil/state'
import Button from '@/ui/Button'
import { ErrorModal } from '@/ui/ErrorModal'
// import { Header } from '@/ui/Header'
import { Input } from '@/ui/Input'
import { LoadingRing } from '@/ui/LoadingRing'

const Header = dynamic(
  import('@/ui/Header').then(module => module.Header),
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
  display: flex;
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

  const handleError = useCallback((error: unknown) => {
    if (error instanceof FirebaseError && isFirebaseError(error)) {
      let errorMessage = ''
      if (error.code === 'EMAIL_NOT_FOUND' || error.code === 'auth/email-already-in-use') {
        errorMessage = getJpErrorMessage(error.code)
      }
      setError({ message: errorMessage, code: error.code })
      throw new Error(error.message)
    }
    console.log(error)
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

  return (
    <>
      <Head>
        <title>Fooder Login</title>
      </Head>
      <Header />
      <ErrorModal error={error} />
      <Form onSubmit={handleSubmit}>
        <Input name="email" id="email" defaultValue={email} placeholder="メールアドレス" />
        <Input
          name="password"
          id="password"
          defaultValue=""
          placeholder="8文字以上のパスワード"
          minLength={8}
          required
        />
        <Button type="submit">{pathname === '/signup' ? '登録' : 'ログイン'}</Button>
      </Form>
    </>
  )
})
