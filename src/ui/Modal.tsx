import { ReactNode } from 'react'

import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { clientSize } from '@/lib/recoil/state'
import { CloseButton } from '@/ui/CloseButton'
// import { useWindowSize } from '@/lib/hooks/useWindowSize'

const OverLay = styled.div`
  background-color: gray;
  opacity: 20;
  width: 100vw;
  height: 100vh;
  z-index: 900;
`

const ModalContainer = styled.div<{ padding: string; radius: number; clientWidth: number; clientHeight: number }>`
  position: absolute;
  z-index: 1000;
  top: calc(50% - 80px);
  left: max(calc(50% - ${({ clientWidth }) => clientWidth * 0.3}px), calc(50% - 150px));
  width: 60%;
  max-width: 300px;
  height: 160px;
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  padding: ${({ padding }) => padding};
  border-radius: ${({ radius }) => radius}px;
  > p {
    font-size: 16px;
    font-weight: 700;
    margin: 0 auto;
  }
`
export default function Modal({
  open,
  close,
  radius = 15,
  padding = '12px',
  children
}: {
  open: boolean
  close: () => void
  radius?: number
  padding?: string
  children: ReactNode
}) {
  const [clientWidth, clientHeight] = useRecoilValue(clientSize)
  return open ? (
    <>
      <OverLay />
      <ModalContainer radius={radius} padding={padding} clientWidth={clientWidth} clientHeight={clientHeight}>
        <CloseButton close={close} />
        {children}
      </ModalContainer>
    </>
  ) : (
    <></>
  )
}
