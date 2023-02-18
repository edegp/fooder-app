'use client'

import { forwardRef, ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import { memo } from 'react'

import styled from 'styled-components'

import { mediaQueryPc } from '@/lib/modules/mediaQuery'

type SwiperProps = React.PropsWithChildren & {
  width: string
  isVertical: boolean
}

const KeyFrame = ({ width }: { width: string }) => (
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
      @keyframes BottomToFadeIn {
        0% {
          transform: translateY(calc(90vh - 65px));
        }
        100% {
          transform: translateY(0);
        }
      }
      @keyframes BottomToFadeOut {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(calc(90vh - 65px));
        }
      }
    `}
  </style>
)

// no recommend var in reactの対策
const Swiper = forwardRef<HTMLDivElement, SwiperProps>(function Swiper(
  { isVertical: _isVertical, width: _width, ...props },
  _ref
) {
  return <div {...props}></div>
})

const SwiperComponent = styled(Swiper)`
  width: ${({ isVertical, width }) => (isVertical ? '100%' : width)};
  height: ${({ isVertical }) => (isVertical ? '90vh' : '100vh')};
  z-index: 30;
  position: absolute;
  top: 0;
  left: ${({ isVertical, width }) => (isVertical ? '0' : `calc(100vw - ${width})`)};
  color: black;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  border-radius: ${({ isVertical }) => (isVertical ? '8px;' : '0')};
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
  isOpen: boolean
  width?: number
  isVertical?: boolean
  className?: string
}

export const Drawer = memo(function Drawer({
  children,
  handleClose,
  isOpen,
  isVertical,
  className,
  width: widthPercent = 65
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [touchPosition, setTouchPosition] = useState<number>(0)
  const [moveDistance, setMoveDistance] = useState<number>(0)
  const [stopScroll, setStopScroll] = useState<boolean>(false)
  const width = `${widthPercent}vw`

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (stopScroll) {
        const { clientY, clientX } = event?.touches?.[0]
        const distance = isVertical ? clientY - touchPosition : clientX - touchPosition
        if (distance > 0) setMoveDistance(distance)
        const closeBoundary = isVertical
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
        const closeBoundary = isVertical
          ? clientY > (window.screen.height * 1) / 2
          : clientX > (window.screen.width * 2) / 3
        if (closeBoundary && typeof window !== 'undefined') {
          handleClose()
        }
      }
      await setTimeout(() => {
        setStopScroll(false)
      }, 100)
      setMoveDistance(0)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleClose]
  )

  const handleTouchStart = useCallback(() => {
    const startPosition = isVertical ? ref?.current?.offsetTop : ref?.current?.offsetLeft
    setTouchPosition(startPosition || 0)
    !isVertical && setStopScroll(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current])

  // animationのロジック
  const animation = useCallback(() => {
    if (isOpen && stopScroll) {
      return { transform: `translate${isVertical ? 'Y' : 'X'}(${moveDistance}px)` }
    }
    // 初回表示時はアニメーションを発火しない
    if (typeof isOpen === 'boolean') {
      // ドロワーが垂直でない場合
      if (isVertical) {
        if (isOpen) {
          return { animation: '0.5s ease BottomToFadeIn' }
        } else {
          // 垂直でない場合アニメーションを削除
          return {
            animation: '0.5s ease BottomToFadeOut',
            transform: `translateY(calc(90vh - 65px))`
          }
        }
      } else {
        if (isOpen) {
          return { animation: '0.5s ease LeftToFadeIn' }
        } else {
          // 垂直でない場合アニメーションを削除
          return {
            animation: '0.5s ease LeftToFadeOut',
            transform: `translateX(${width})}`
          }
        }
      }
    } else {
      return { transform: `translate${isVertical ? 'Y(calc(90vh - 65px))' : `X(${width})`}` }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, moveDistance, stopScroll, isVertical])

  // dynamic styling
  const styles = useMemo(
    () => ({
      overflowY: stopScroll || !isVertical ? 'hidden' : 'scroll',
      ...animation(),
      display: typeof isOpen === 'boolean' ? 'block' : 'none',
      visibility: typeof isOpen === 'boolean' ? 'visible' : 'hidden'
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [animation, isOpen, stopScroll]
  )
  return (
    <div>
      <KeyFrame width={width} />
      {isOpen && !isVertical && <OverLay onClick={() => handleClose()} />}
      <SwiperComponent
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={(event: React.TouchEvent) => handleTouchMove(event)}
        className={className}
        style={styles}
        width={width}
        isVertical={isVertical}
        ref={ref}
      >
        {isVertical && (
          <Puller
            onTouchStart={() => setStopScroll(true)}
            onTouchEnd={() => setTimeout(() => setStopScroll(false), 100)}
          />
        )}
        {children}
      </SwiperComponent>
    </div>
  )
})
