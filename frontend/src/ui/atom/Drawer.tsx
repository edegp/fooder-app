'use client'

import { forwardRef, memo, ReactNode, useCallback, useMemo, useRef, useState } from 'react'

import styled from 'styled-components'

import { mediaQueryPc } from '@/lib/modules/mediaQuery'
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
  _ref
) {
  return <div {...props}></div>
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
    cursor: pointer;
  }
`

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
  const [moveDistance, setMoveDistance] = useState<number>(isVertical ? 65 : 0)
  const [stopScroll, setStopScroll] = useState<boolean>(false)
  const width = `${widthPercent}vw`
  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (stopScroll) {
        const { clientY, clientX } = event?.touches?.[0]
        const distance = isVertical ? clientY - touchPosition - 80 : clientX - touchPosition - 375 * 0.33
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
      if (touch && stopScroll) {
        const { clientY, clientX } = touch
        const closeBoundary = isVertical
          ? clientY > (window.screen.height * 1) / 2
          : clientX > (window.screen.width * 2) / 3
        if (closeBoundary && typeof window !== 'undefined') {
          handleClose()
          setMoveDistance(isVertical ? 65 : 0)
        }
      }
      await setTimeout(() => {
        setStopScroll(false)
      }, 400)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleClose]
  )

  const handleTouchStart = useCallback(() => {
    const startPosition = isVertical ? ref?.current?.offsetTop : ref?.current?.offsetLeft
    setTouchPosition(startPosition || 0)
    !isVertical && setStopScroll(true)
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
        return { transform: `translate${isVertical ? 'Y' : 'X'}(${moveDistance}px)`, transitionDuration: '0.5s' }
        // 閉じてない場合元に戻る（reset）
      } else if (moveDistance !== 0) {
        return { transform: `translate${isVertical ? 'Y(65px)' : 'X(0px)'}`, transitionDuration: '0.4s' }
      }
      // fadein
      return { animation: isVertical ? '0.6s ease BottomToFadeIn' : '0.6s ease LeftToFadeIn' }
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
          <Puller onTouchStart={() => setStopScroll(true)} onTouchEnd={() => () => setStopScroll(false)} />
        )}
        {children}
      </SwiperComponent>
    </>
  )
})
