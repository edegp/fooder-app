import { MagnifyingGlass, Triangle } from 'react-loader-spinner'
import { useRecoilValue } from 'recoil'

import { colors } from '@/lib/modules/colors'
import { searchQueryState } from '@/lib/recoil/mapState'

import { OverLay } from '@/ui/atom/OverLay'

const color = colors.black
const style = {
  width: 'fit-content',
  margin: 'auto',
  position: 'absolute',
  zIndex: '200'
}

export const LoadingRing = ({ visible = true }: { visible?: boolean }) => {
  const searchQuery = useRecoilValue(searchQueryState)
  const inset = searchQuery ? '0' : '40% 0 0'

  return (
    <>
      {searchQuery ? (
        <MagnifyingGlass glassColor="transparent" color={color} wrapperStyle={{ ...style, inset }} visible={visible} />
      ) : (
        <Triangle color={color} wrapperStyle={{ ...style, inset }} visible={visible} />
      )}
      {visible && <OverLay />}
    </>
  )
}
