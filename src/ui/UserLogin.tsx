'use client'

import { FormEvent, memo, useCallback, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/navigation'

import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import styled from 'styled-components'

import { auth, isFirebaseError } from '@/lib/firebase/firebase'
import { useUser } from '@/lib/hooks/useUser'
import { getJpErrorMessage } from '@/lib/modules/getJpErrorMessage'
import Button from '@/ui/Button'
import { ErrorModal } from '@/ui/ErrorModal'
import { Header } from '@/ui/Header'
import { Input } from '@/ui/Input'

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

export const UserLogin = memo(function UserLogin({ userStatus }: { userStatus: string }) {
  useUser()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleError = useCallback((error: unknown) => {
    if (error instanceof FirebaseError && isFirebaseError(error)) {
      let errorMessage
      if (error.code === 'EMAIL_NOT_FOUND') {
        errorMessage = getJpErrorMessage(error.message)
      }
      setErrorMessage(errorMessage || error.message)
      throw new Error(error.message)
    }
    throw new Error('通信エラーです。')
  }, [])

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      const { email, password }: { email: HTMLInputElement; password: HTMLInputElement } = event.target as userForm
      if (email && password) {
        try {
          const result =
            userStatus === 'signup'
              ? await createUserWithEmailAndPassword(auth, email.value, password.value)
              : userStatus === 'signin' && (await signInWithEmailAndPassword(auth, email.value, password.value))
          if (result) router.push('/')
        } catch (error) {
          handleError(error)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, userStatus]
  )

  return (
    <>
      <Head>
        <title>Fooder Login</title>
      </Head>
      <Header />
      <ErrorModal message={errorMessage} />
      <Form onSubmit={handleSubmit}>
        <Input name="email" id="email" defaultValue="" placeholder="メールアドレス" />
        <Input
          name="password"
          id="password"
          defaultValue=""
          placeholder="8文字以上のパスワード"
          minLength={8}
          required
        />
        <Button type="submit">{userStatus === 'signup' ? '登録' : 'ログイン'}</Button>
      </Form>
    </>
  )
})
