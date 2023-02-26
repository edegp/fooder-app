'use client'

import { forwardRef, memo, ReactNode, useCallback, useMemo, useRef, useState } from 'react'

import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { mediaQueryPc } from '@/lib/modules/mediaQuery'
import { clientSize } from '@/lib/recoil/state'
import { OverLay } from '@/ui/atom/OverLay'

type SwiperProps = React.PropsWithChildren & {
  width: string
  isVertical: boolean
}

type Props = {
  children: ReactNode
  handleClose: () => void
  isOpen: boolean | null
  width?: number
  isVertical?: boolean
  className?: string
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
          transform: translateY(90vh);
        }
        100% {
          transform: translateY(65px);
        }
      }
      @keyframes BottomToFadeOut {
        0% {
          transform: translateY(65px);
        }
        100% {
          transform: translateY(90vh);
        }
      }
    `}
  </style>
)

// no recommend var in reactの対策
const Swiper = forwardRef<HTMLDivElement, SwiperProps>(function Swiper(
  { isVertical: _isVertical, width: _width, ...props },
  ref
) {
  return <div ref={ref} {...props}></div>
})

const SwiperComponent = styled(Swiper)`
  width: ${({ isVertical, width }) => (isVertical ? '100%' : width)};
  height: ${({ isVertical }) => (isVertical ? '90vh' : '100vh')};
  z-index: 30;
  position: absolute;
  top: ${({ isVertical }) => (isVertical ? 'calc(5vh + 65px)' : 0)};
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
    width: ${({ isVertical, width }) => (isVertical ? '40%' : width)};
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
`
//タッチ領域を広げる
const Touchable = styled.div`
  display: block;
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  top: -15px;
  left: -15px;
  border-radius: 50%;
  cursor: pointer;
  touch-action: auto;
`

const upperOffset = 107

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
  const [moveDistance, setMoveDistance] = useState<number>(-1)
  const [stopScroll, setStopScroll] = useState<boolean>(false)
  const [clientWidth, clientHeight] = useRecoilValue(clientSize)
  const width = `${widthPercent}vw`
  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (stopScroll) {
        const { clientY, clientX } = event?.touches?.[0]
        const distance = isVertical ? (clientY - upperOffset - 130) * 1.2 : clientX - touchPosition
        if (distance > 0) setMoveDistance(distance)
        const closeBoundary = isVertical ? clientY > (clientHeight * 3) / 4 : clientX > (clientWidth * 4) / 5
        if (closeBoundary) {
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
      if (touch && stopScroll) {
        const { clientY, clientX } = touch
        const closeBoundary = isVertical ? clientY > (clientHeight * 1) / 2 : clientX > (clientWidth * 2) / 3
        if (closeBoundary) {
          handleClose()
        }
      }
      setMoveDistance(isVertical ? 65 : 0)
      setStopScroll(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleClose]
  )
  const handleTouchStart = useCallback(() => {
    if (!isVertical) {
      setTouchPosition(ref.current?.offsetLeft || 0)
      setStopScroll(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // animationのロジック
  const animation = useCallback(() => {
    // 初回表示時はアニメーションを発火しない
    if (typeof isOpen !== 'boolean') {
      return { transform: `translate${isVertical ? 'Y(90vh)' : `X(${width})`}` }
    }
    if (isOpen) {
      // ポインターに追従するアニメーション
      if (stopScroll) {
        return {
          transform: `translate${isVertical ? 'Y' : 'X'}(${moveDistance}px)`,
          transitionDuration: '0.3s'
        }
      }
      // fadeIn
      if (moveDistance < 0) {
        return { animation: isVertical ? '0.6s ease BottomToFadeIn' : '0.6s ease LeftToFadeIn' }
      }
      // 閉じてない場合元に戻る（reset）
      return {
        transform: `translate${isVertical ? 'Y' : 'X'}(0)`,
        transitionDuration: '0.4s'
      }
    }
    // fadeOut
    return isVertical
      ? {
          animation: '0.5s ease BottomToFadeOut',
          transform: `translateY(90vh)`
        }
      : {
          animation: '0.5s ease LeftToFadeOut',
          transform: `translateX(${width})`
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, stopScroll, moveDistance])

  // dynamic styling
  const styles = useMemo(
    () => ({
      ...(stopScroll || !isVertical ? { overflowY: 'hidden' } : {}),
      ...animation(),
      // 初回はheaderを非表示
      ...(typeof isOpen === 'boolean'
        ? { display: 'block', visibility: 'visible', opacity: 1 }
        : { display: 'none', visibility: 'none', opacity: 0 })
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [animation, isOpen, stopScroll]
  )
  return (
    <>
      <KeyFrame width={width} />
      {isOpen && <OverLay onClick={handleClose} />}
      <SwiperComponent
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        className={className}
        style={styles}
        width={width}
        isVertical={isVertical}
        ref={ref}
      >
        {isVertical && (
          <Puller onTouchStart={() => setStopScroll(true)}>
            <Touchable />
          </Puller>
        )}
        {children}
      </SwiperComponent>
    </>
  )
})
