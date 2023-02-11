import { ReactNode, useCallback, useRef, useState } from 'react'

import styled from 'styled-components'

import { mediaQueryPc } from '@/lib/mediaQuery'

const Swiper = styled.div<{ height: number }>`
  width: 100%;
  height: 100%;
  z-index: 20;
  position: absolute;
  top: 16px;
  right: 0;
  color: black;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: white;
  ${mediaQueryPc} {
    top: 0;
    right: -5px;
    width: 40%;
  }
`

const Puller = styled.div`
  width: 32px;
  height: 6px;
  border-radius: 8px;
  position: absolute;
  background-color: #a5a5a5;
  top: 8px;
  left: calc(50% - 15px);
  z-index: 150;
  // afterでタッチ領域を広げる
  &:after {
    display: block;
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    top: -15px;
    left: -15px;
    border-radius: 50%;
  }
`

export const Swiperable = ({
  children,
  handleClose,
  detail
}: {
  children: ReactNode
  handleClose: () => void
  detail: google.maps.places.PlaceResult
}) => {
  const [touchY, setTouchY] = useState<number>(0)
  const [moveDistance, setMoveDistance] = useState<number>(0)
  const [stopScroll, setStopScroll] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      console.log(stopScroll)
      if (stopScroll) {
        setMoveDistance(event?.touches?.[0]?.clientY - touchY)
        if (event?.touches?.[0]?.clientY > (window.screen.height * 2) / 3) {
          handleClose()
        }
      }
    },
    [handleClose, touchY, stopScroll]
  )
  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (event?.touches?.[0]?.clientY > (window.screen.height * 1) / 2) {
        handleClose()
      }
      setMoveDistance(0)
    },
    [handleClose]
  )
  const className =
    'w-full h-full z-20 top-4 right-0 text-black absolute overflow-y-scroll rounded-lg bg-white md:top-0 md: md:right-[-5px] md:w-2/5'
  return (
    <Swiper
      onTouchStart={(event: React.TouchEvent) => setTouchY(event.touches[0].clientY)}
      onTouchEnd={handleTouchEnd}
      onTouchMove={(event: React.TouchEvent) => handleTouchMove(event)}
      className={className}
      style={{
        top: `${moveDistance + 16}px`,
        display: detail ? 'block' : 'none',
        visibility: detail ? 'visible' : 'hidden',
        transitionDuration: '100ms',
        transform: `translateY(${moveDistance}px)`
      }}
      ref={ref}
    >
      <Puller onTouchStart={() => setStopScroll(true)} onTouchEnd={() => setTimeout(() => setStopScroll(false), 100)} />
      {children}
    </Swiper>
  )
}
