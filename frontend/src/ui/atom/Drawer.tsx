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
  display: flex;
  flex-direction: column;
  border-radius: ${({ isVertical }) => (isVertical ? '8px;' : '0')};
  touch-action: none;
  transform: translate3d(0, 100%, 0);
  transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
  background-color: white;
  ${mediaQueryPc} {
    top: 0;
    right: -5px;
    width: ${({ isVertical, width }) => (isVertical ? '40%' : width)};
  }
`

const SwaiperContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
`

const Puller = styled.div`
  width: 32px;
  height: 6px;
  border-radius: 8px;
  position: fixed;
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

const FakeKeyFrame = () => (
  <style jsx>{`
    @keyframes fake-animation {
    }
  `}</style>
)

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

  const wappedHandleClose = useCallback(() => {
    setStopScroll(false)
    setMoveDistance(-1)
    handleClose()
  }, [handleClose])

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (stopScroll) {
        const { clientY, clientX } = event?.touches?.[0]
        const { innerHeight } = event.view as unknown as Window
        let yDistance = clientY - innerHeight * 0.1 - 65
        if (yDistance < -10) {
          yDistance = -(10 + Math.sqrt(Math.abs(yDistance + 10)))
        }
        const distance = isVertical ? yDistance : clientX - touchPosition

        setMoveDistance(distance)
        const closeBoundary = isVertical
          ? clientY > clientHeight / 2
          : clientX > (clientWidth * 2) / 5
        if (closeBoundary) {
          wappedHandleClose()
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wappedHandleClose, touchPosition, stopScroll]
  )

  const handleTouchEnd = useCallback(
    async (event: React.TouchEvent) => {
      const t = event.target as HTMLElement
      event.preventDefault()
      t.style.transform = 'translateY(-2000px)'
      t.focus()
      requestAnimationFrame(() => {
        t.style.transform = ''
      })
      const touch = event?.changedTouches?.[0]
      if (touch && stopScroll) {
        const { clientY, clientX } = touch
        const closeBoundary = isVertical
          ? clientY > clientHeight / 2
          : clientX > (clientWidth * 2) / 3
        if (closeBoundary) {
          wappedHandleClose()
        }
      }
      // isVertical ? 65 : 0
      setMoveDistance(0)
      setStopScroll(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wappedHandleClose]
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
      return {
        transform: `translate${isVertical ? 'Y(90vh)' : `X(${width})`}`,
        transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1) 0s'
      }
    }
    if (isOpen) {
      // ポインターに追従するアニメーション
      if (stopScroll) {
        return {
          transform: `translate${isVertical ? 'Y' : 'X'}(${moveDistance}px)`,
          transition: 'none 0s ease 0s'
        }
      }
      // fadeIn
      if (moveDistance < 0) {
        return {
          transform: 'translate3d(0,var(--snap-point-height, 0),0)'
        }
      }
      // 閉じてない場合元に戻る（reset）
      return {
        transform: `translate${isVertical ? 'Y' : 'X'}(0)`,
        transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1) 0s'
      }
    }
    // fadeOut
    return isVertical
      ? {
          transform: `translateY(90vh)`,
          transition: `transform 1s cubic-bezier(0.32,0.72, 0, 1)`
        }
      : {
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
      display: 'block',
      visibility: 'visible',
      opacity: 1
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [animation, isOpen, stopScroll]
  )
  return (
    <>
      <FakeKeyFrame />
      {isOpen && <OverLay onClick={wappedHandleClose} />}
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
        <SwaiperContainer>{children}</SwaiperContainer>
      </SwiperComponent>
    </>
  )
})
