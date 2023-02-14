'use client'

import { ReactNode, useCallback, useMemo, useRef, useState } from 'react'

import styled from 'styled-components'

import { mediaQueryPc } from '@/lib/modules/mediaQuery'

const Swiper = styled.div<{ width: string; isvertical: boolean }>`
  width: 100%;
  height: 100vh;
  z-index: 30;
  position: absolute;
  top: ${({ isvertical }) => (isvertical ? '16px' : '0')};
  left: ${({ isvertical, width }) => (isvertical ? '0' : `calc(100vw - ${width})`)};
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

const OverLay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 15;
  background-color: black;
  opacity: 0.3;
  overflow: hidden;
`

type Props = {
  children: ReactNode
  handleClose: () => void
  isOpen: boolean | null
  width?: number
  vertical?: boolean
  className?: string
}

export const Drawer = ({ children, handleClose, isOpen, vertical, className, width: widthPercent = 65 }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [touchPosition, setTouchPosition] = useState<number>(0)
  const [moveDistance, setMoveDistance] = useState<number>(0)
  const [stopScroll, setStopScroll] = useState<boolean>(false)
  const width = `${widthPercent}vw`

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (stopScroll) {
        const { clientY, clientX } = event?.touches?.[0]
        const distance = vertical ? clientY - touchPosition : clientX - touchPosition
        if (distance > 0) setMoveDistance(distance)
        const closeBoundary = vertical
          ? clientY > (window.screen.height * 3) / 4
          : clientX > (window.screen.width * 4) / 5
        if (closeBoundary && typeof window !== 'undefined') {
          handleClose()
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleClose, touchPosition, stopScroll]
  )

  const handleTouchEnd = useCallback(
    async (event: React.TouchEvent) => {
      const touch = event?.changedTouches?.[0]
      if (touch) {
        const { clientY, clientX } = touch
        const closeBoundary = vertical
          ? clientY > (window.screen.height * 1) / 2
          : clientX > (window.screen.width * 2) / 3
        if (closeBoundary && typeof window !== 'undefined') {
          handleClose()
        }
      }
      !vertical &&
        (await setTimeout(() => {
          setStopScroll(false)
        }, 100))
      setMoveDistance(0)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleClose]
  )

  const handleTouchStart = useCallback(() => {
    const startPosition = vertical ? ref?.current?.offsetTop : ref?.current?.offsetLeft
    setTouchPosition(startPosition || 10)
    !vertical && setStopScroll(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current])

  // animationのロジック
  const animation = useCallback(() => {
    if (isOpen && stopScroll) {
      return { transform: `translate${vertical ? 'Y' : 'X'}(${moveDistance}px)` }
    }
    // 初回表示時はアニメーションを発火しない
    if (!vertical && typeof isOpen === 'boolean') {
      if (isOpen) {
        return { animation: '0.5s ease LeftToFadeIn' }
      } else {
        return {
          animation: '0.5s ease LeftToFadeOut',
          transform: `translate${vertical ? 'Y(100vh)' : `X(${width})`}`
        }
      }
    } else {
      return { transform: `translate${vertical ? 'Y(100vh)' : `X(${width})`}` }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, moveDistance, stopScroll, vertical])

  // dynamic styling
  const styles = useMemo(
    () => ({
      overflowY: stopScroll || vertical ? 'hidden' : 'scroll',
      overflowX: 'hidden',
      ...animation(),
      width
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [moveDistance, isOpen, stopScroll]
  )
  return (
    <>
      <style jsx>
        {`
          @keyframes LeftToFadeIn {
            0% {
              transform: translateX(${width});
            }
            100% {
              transform: translateX(0);
            }
          }
          @keyframes LeftToFadeOut {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(${width});
            }
          }
        `}
      </style>
      {isOpen && <OverLay onClick={() => handleClose()} />}
      <Swiper
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={(event: React.TouchEvent) => handleTouchMove(event)}
        className={className}
        style={styles}
        width={width}
        isvertical={vertical}
        ref={ref}
      >
        {vertical && (
          <Puller
            onTouchStart={() => setStopScroll(true)}
            onTouchEnd={() => setTimeout(() => setStopScroll(false), 100)}
          />
        )}
        {children}
      </Swiper>
    </>
  )
}
