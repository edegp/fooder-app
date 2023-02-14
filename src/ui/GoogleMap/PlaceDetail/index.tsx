import { memo, useCallback, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { Options, Splide } from '@splidejs/react-splide'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import styled from 'styled-components'

import { getDate } from '@/lib/modules/getDate'
import { imageLoader } from '@/lib/modules/imageLoader'
import { mediaQueryPc } from '@/lib/modules/mediaQuery'
import { CloseButton } from '@/ui/CloseButton'
import { Drawer } from '@/ui/Drawer'
import { OpeningTimeTab } from '@/ui/googleMap/PlaceDetail/OpningTimeTab'
import { SlideImages } from '@/ui/googleMap/PlaceDetail/SlideImages'
import { LongText } from '@/ui/LongText'
import { Star } from '@/ui/star'

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

const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  ${mediaQueryPc} {
    row-gap: 32px;
  }
`

/* レコメンドした場所をタップした場合に表示する詳細画面**/
export const PlaceDetail = memo(function PlaceDetail({
  detail,
  handleClose
}: {
  detail: google.maps.places.PlaceResult | null
  handleClose: () => void
}) {
  const [openingOpen, setOpeningOpen] = useState(false)
  const handleOpeningClick = useCallback(() => setOpeningOpen(!openingOpen), [openingOpen])
  const slideOptions: Options = {
    type: 'fade',
    rewind: true
  }
  const slidesRef = useRef<Splide>(null)
  const thumbsRef = useRef<Splide>(null)
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
  useEffect(() => {
    if (slidesRef.current && thumbsRef.current && thumbsRef.current.splide) {
      slidesRef.current.sync(thumbsRef.current.splide)
    }
  }, [])
  return detail ? (
    <Drawer handleClose={handleClose} isOpen={!!detail}>
      <CloseButton close={handleClose} />
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
        <ReviewWrap>
          {detail.reviews?.map((review, i) => (
            // 親要素にflexあり
            <div key={i}>
              <div className="flex flex-wrap space-x-10">
                <Image
                  loader={imageLoader}
                  src={review.profile_photo_url || ''}
                  width={30}
                  height={30}
                  alt={`${review.author_name}のアイコン画像`}
                />
                <div className="grow">{review.author_name}</div>
                <div>{getDate(review.time)}</div>
              </div>
              <div className="ml-[calc(30px+2.5rem)] flex">
                <Star rating={review.rating} />
              </div>
              <LongText className="my-5" isEllipsis>
                {review.text}
              </LongText>
            </div>
          ))}
        </ReviewWrap>
        <a href={detail.website} />
        <div>
          {detail.business_status === google.maps.places.BusinessStatus.CLOSED_TEMPORARILY
            ? '一時休業中'
            : detail.business_status === google.maps.places.BusinessStatus.CLOSED_PERMANENTLY && '閉店'}
        </div>
      </Container>
    </Drawer>
  ) : (
    <></>
  )
})
