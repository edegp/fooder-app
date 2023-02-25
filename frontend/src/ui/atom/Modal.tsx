import { CSSProperties, DetailedHTMLProps, HTMLAttributes, memo, PropsWithChildren, PropsWithRef } from 'react'

import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { clientSize } from '@/lib/recoil/state'
import { Title, TitleBase } from '@/ui/atom/Title'
import { CloseButton } from '@/ui/components/CloseButton'

type CustomProps = {
  padding: string
  radius: number
  clientWidth: number
  hasButton: boolean
}

type ModalProps = {
  isOpen: boolean
  handleClose: () => void
  style?: CSSProperties
  padding?: string
  radius?: number
  title?: string
  button?: JSX.Element
}

const OverLay = styled.div`
  background-color: gray;
  opacity: 20;
  width: 100vw;
  height: 100vh;
  z-index: 900;
`
// no recoment var in reactの対策
const ModalComponent = ({
  padding: _padding,
  radius: _radius,
  clientWidth: _clientWidth,
  hasButton: _hasButton,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & CustomProps) => <div {...props} />

const ModalContainer = styled(ModalComponent)`
  position: absolute;
  z-index: 1000;
  top: calc(50% - 100px);
  left: max(calc(50% - ${({ clientWidth }) => (clientWidth * 1) / 3}px), calc(50% - 150px));
  width: 70%;
  max-width: 300px;
  height: ${({ hasButton }) => (hasButton ? '200px' : '120px')};
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: ${({ hasButton }) => (hasButton ? 'end' : 'center')};
  align-items: center;
  row-gap: 24px;
  padding: ${({ padding }) => padding};
  border-radius: ${({ radius }) => radius}px;
  > ${TitleBase} {
    font-size: 15px;
    font-weight: 700;
    margin: 0 auto;
  }
`

export const Modal = memo(function Modal(props: PropsWithRef<PropsWithChildren<ModalProps>>) {
  const { isOpen, handleClose, radius = 15, padding = '12px', title, button, children, style, ...other } = props
  const [clientWidth] = useRecoilValue(clientSize)

  // if (!isOpen && !style) {
  //   return <></>
  // }

  return (
    <>
      <OverLay />
      <ModalContainer
        radius={radius}
        padding={padding}
        clientWidth={clientWidth}
        hasButton={!!button}
        style={style}
        {...other}
      >
        <CloseButton handleClose={handleClose} />
        {title && <Title level={2}>{title}</Title>}
        {children}
        {button}
      </ModalContainer>
    </>
  )
})
