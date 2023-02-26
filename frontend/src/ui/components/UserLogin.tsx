'use client'

import { FormEvent, memo, useCallback, useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import { usePathname, useRouter } from 'next/navigation'

import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { useMutation, useQuery } from 'urql'

import { CreateUser, UpdateUser } from '@/graphql/mutaion'
import { getAllUsers } from '@/graphql/query'
import { signIn, signUp } from '@/lib/firebase'
import { handleError } from '@/lib/modules/handleError'
import { emailState } from '@/lib/recoil/state'
import { Button } from '@/ui/atom/Button'
import { Input } from '@/ui/atom/Input'
import { LoadingRing } from '@/ui/atom/Loading'

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
  const [email, setEmail] = useRecoilState(emailState)
  const [isShowPassword, setIsShowPassword] = useState(true)
  const [createUserResult, createUser] = useMutation(CreateUser)
  const [updateUserResult, updateUser] = useMutation(UpdateUser)
  const [users, reexecuteQuery] = useQuery({
    query: getAllUsers
  })
  console.log(users)
  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      const { email, password }: { email: HTMLInputElement; password: HTMLInputElement } = event.target as userForm
      setEmail(email.value)
      if (email && password) {
        try {
          if (pathname === '/signup') {
            const result = await signUp(email.value, password.value)
            if (result) {
              const idToken = await result.user.getIdToken()
              await createUser({ idToken })
              router.push('/')
            }
          } else {
            const result = await signIn(email.value, password.value)
            if (result) {
              const id = result.user.uid
              await updateUser({ id })
              router.push('/')
            }
          }
        } catch (err: unknown) {
          handleError(err)
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
        <Button padding="7px 6px" type="submit">
          {pathname === '/signup' ? '登録' : 'ログイン'}
        </Button>
      </Form>
    </>
  )
})
