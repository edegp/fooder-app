import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Options, Splide } from '@splidejs/react-splide'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { mediaQueryPc } from '@/lib/modules/mediaQuery'
import { placeDetailState } from '@/lib/recoil/state'
import { Drawer } from '@/ui/atom/Drawer'
import { CloseButton } from '@/ui/components/CloseButton'
import { Reviews } from '@/ui/components/Reviews'
import { OpeningTimeTab } from '@/ui/googleMap/components/OpningTimeTab'
import { SlideImages } from '@/ui/googleMap/components/SlideImages'

const Container = styled.div`
  padding: 0 32px;
  display: flex;
  row-gap: 16px;
  flex-direction: column;
  ${mediaQueryPc} {
    padding: 0 48px;
    row-gap: 32px;
  }
`

/* レコメンドした場所をタップした場合に表示する詳細画面**/
export const PlaceDetail = memo(function PlaceDetail() {
  const [openingOpen, setOpeningOpen] = useState(false)
  const slidesRef = useRef<Splide>(null)
  const thumbsRef = useRef<Splide>(null)
  const [detail, setDetail] = useRecoilState(placeDetailState)
  // first renderingで表示しない
  const isOpen = useMemo(() => (detail === null ? null : !!detail), [detail])

  const slideOptions: Options = {
    type: 'fade',
    fixedWidth: '100%',
    fixedHeight: 250,
    focus: 'center',
    cover: true,
    rewind: true
  }
  const thumbsOptions: Options = {
    type: 'slide',
    rewind: true,
    gap: '1rem',
    pagination: false,
    fixedWidth: 110,
    fixedHeight: 70,
    cover: true,
    focus: 'center',
    isNavigation: true
  }

  // thumbとスライドを同期
  useEffect(() => {
    if (slidesRef.current && thumbsRef.current && thumbsRef.current.splide) {
      slidesRef.current.sync(thumbsRef.current.splide)
    }
  }, [])

  const handleOpeningClick = useCallback(() => setOpeningOpen(!openingOpen), [openingOpen])
  const handleClose = useCallback(() => setDetail(null), [setDetail])

  return (
    <Drawer handleClose={handleClose} isOpen={isOpen} isVertical>
      <CloseButton handleClose={handleClose} />
      {detail && (
        <>
          <div className="mb-8 w-full">
            <Splide options={slideOptions} ref={slidesRef} aria-label="place photos">
              <SlideImages photos={detail.photos} name={detail.name} />
            </Splide>
            <Splide options={thumbsOptions} ref={thumbsRef}>
              <SlideImages photos={detail.photos} name={detail.name} />
            </Splide>
          </div>
          <Container>
            <div className="my-6 text-center text-xl font-bold drop-shadow">{detail.name}</div>
            <div
              className="my-2 flex justify-between rounded-md px-6 py-3 shadow-[0_0px_8px_rgba(0,0,0,0.2)]"
              onClick={handleOpeningClick}
            >
              <p>営業時間</p>
              {openingOpen ? (
                <MdKeyboardArrowUp className="h-7 w-7 md:h-9 md:w-9" />
              ) : (
                <MdKeyboardArrowDown className="h-7 w-7 md:h-9 md:w-9" />
              )}
            </div>
            <OpeningTimeTab openingOpen={openingOpen} detail={detail} />
            <div className="my-4 flex px-6">
              <p>電話番号 :　</p>
              <a href={`tel:${detail.formatted_phone_number}`}>{detail.formatted_phone_number}</a>
            </div>
            <Reviews />
            <a href={detail.website}>webサイト</a>
            <p>
              {detail.business_status === google.maps.places.BusinessStatus.CLOSED_TEMPORARILY
                ? '一時休業中'
                : detail.business_status === google.maps.places.BusinessStatus.CLOSED_PERMANENTLY && '閉店'}
            </p>
          </Container>
        </>
      )}
    </Drawer>
  )
})
