'use client'

import { FormEvent, memo, useCallback, useState } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { sendPasswordResetEmail } from 'firebase/auth'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { useMutation } from 'urql'

import { CreateUser, UpdateUser } from '@/graphql/mutaion'
import { auth, signIn, signUp } from '@/lib/firebase'
import { handleError } from '@/lib/modules/handleError'
import { mediaQueryPc } from '@/lib/modules/mediaQuery'
import { emailState } from '@/lib/recoil/state'
import { Button } from '@/ui/atom/Button'
import { Input } from '@/ui/atom/Input'

type userForm = EventTarget & {
  email: HTMLInputElement
  password: HTMLInputElement
}

const Form = styled.form`
  position: relative;
  width: 100%;
  z-index: 0;
  overflow: hidden;
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 0 48px;
  margin-bottom: 16px;
  align-content: center;
  > *:not(:last-child) {
    margin-bottom: 16px;
  }
  ${mediaQueryPc} {
    margin: 0 auto 16px;
    padding-bottom: 128px;
    display: flex;
    justify-content: center;
    align-content: center;
  }
`

const HereList = styled.ul`
  text-align: center;
  letter-spacing: 0.04em;
  > *:not(:last-child) {
    padding-bottom: 4px;
  }
  a {
    text-decoration: underline;
    cursor: pointer;
  }
`

const host = process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'

const actionCodeSettings = {
  url: `${host}/singin`
}

const SignInHere = HereList.withComponent('p')

export const UserLogin = memo(function UserLogin() {
  const router = useRouter()
  const pathname = usePathname()
  const [email, setEmail] = useRecoilState(emailState)
  const [isShowPassword, setIsShowPassword] = useState(true)
  const [_createUserResult, createUser] = useMutation(CreateUser)
  const [_updateUserResult, updateUser] = useMutation(UpdateUser)
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
  const handleFogetPassClick = useCallback(async () => {
    if (!email) {
      router.push('/signin')
      throw new Error('???????????????????????????????????????')
    }
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings)
      router.push('/forgetpass')
    } catch (err) {
      router.push('/signin')
      handleError(err)
      return <></>
    }
  }, [email, router])

  return (
    <div className="flex h-[calc(100%-100px)] w-full flex-col items-center justify-center">
      <Form onSubmit={handleSubmit}>
        <Input name="email" id="email" type="email" defaultValue={email} placeholder="?????????????????????" required />
        <Input
          name="password"
          id="password"
          type="password"
          defaultValue=""
          placeholder="8??????????????????????????????"
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
          {pathname === '/signup' ? '????????????' : '????????????'}
        </Button>
      </Form>
      {pathname === '/signin' ? (
        <HereList>
          <li>
            ?????????????????????????????????<Link href="/signup">?????????</Link>
          </li>
          <li>
            ????????????????????????????????????
            <span className="underline" onClick={handleFogetPassClick}>
              ?????????
            </span>
            ??????
          </li>
        </HereList>
      ) : (
        <SignInHere>
          ??????????????????<Link href="/signin">?????????</Link>
        </SignInHere>
      )}
    </div>
  )
})
