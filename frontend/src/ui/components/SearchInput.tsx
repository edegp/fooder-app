import { EventHandler, FormEvent, useRef } from 'react'

import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'

import { queryState } from '@/lib/recoil/state'
import { Input } from '@/ui/atom/Input'

const Form = styled.form`
  display: flex;
  width: 75vw;
  position: relative;
  max-width: 420px;
`

export const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null)
  const setTextQuery = useSetRecoilState(queryState)
  const handleInputEvent: EventHandler<FormEvent> = event => {
    event.preventDefault()
    const value = ref.current?.value || ''
    setTextQuery(value)
  }
  return (
    <Form onSubmit={handleInputEvent}>
      <Input onBlur={handleInputEvent} ref={ref} width="100%" />
    </Form>
  )
}
