import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { clientSize } from '@/lib/recoil/state'
import { CloseButton } from '@/ui/CloseButton'

const OverLay = styled.div`
  background-color: gray;
  opacity: 20;
  width: 100vw;
  height: 100vh;
  z-index: 900;
`
const ModalContainer = styled(
  // no recoment var in reactの対策
  ({
    padding: _padding,
    radius: _radius,
    clientWidth: _clientWidth,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    padding: string
    radius: number
    clientWidth: number
  }) => <div {...props} />
)`
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
  const [clientWidth] = useRecoilValue(clientSize)

  if (!open) {
    return <></>
  }

  return (
    <>
      <OverLay />
      <ModalContainer radius={radius} padding={padding} clientWidth={clientWidth}>
        <CloseButton close={close} />
        {children}
      </ModalContainer>
    </>
  )
}
