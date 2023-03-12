import { FormEventHandler } from 'react'

import { TbMapSearch } from 'react-icons/tb'
import { useSetRecoilState } from 'recoil'

import { searchQueryState } from '@/lib/recoil/mapState'

import { Button } from '@/ui/atom/Button'
import { Input } from '@/ui/atom/Input'

type FormAttr = EventTarget & { searchQuery?: HTMLInputElement }

export const SearchBox = () => {
  const setSearchQuerys = useSetRecoilState(searchQueryState)
  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    const { searchQuery }: FormAttr = event.target
    setSearchQuerys(searchQuery?.value || '')
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input
        className="self-center justify-self-center"
        name="searchQuery"
        radius={24}
        height={40}
        width={55}
        endAdornment={
          <Button backgroundColor="transparent" width="fit-content" padding="3px">
            <TbMapSearch size={24} />
          </Button>
        }
      />
    </form>
  )
}
