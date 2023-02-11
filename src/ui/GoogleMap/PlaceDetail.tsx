import { getDate } from '@/lib/getDate'
import Image from 'next/image'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { Options, Splide, SplideSlide } from '@splidejs/react-splide'
import { Star } from '@/ui/star'
import { imageLoader } from '@/lib/imageLoader'
import { LongText } from '@/ui/LongText'
import styled from 'styled-components'
import { mediaQueryPc } from '@/lib/mediaQuery'
import { Swiperable } from '@/ui/Swiperable'

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

const OpeningTime = ({ openingOpen, detail }: { openingOpen: boolean; detail: google.maps.places.PlaceResult }) => {
  const opening2Part = detail.opening_hours?.weekday_text?.some(day => day.split(' ').length > 2)
  const OpeningPart = () => {
    if (!opening2Part) {
      return (
        <div>
          {parseInt(detail.opening_hours?.weekday_text?.[0]?.slice(0, 2) || '12', 10) < 15 ? '昼の営業' : '夜の営業'}
        </div>
      )
    } else {
      return (
        <>
          <div>昼の営業</div>
          <div>夜の営業</div>
        </>
      )
    }
  }
  return openingOpen ? (
    <>
      <div className="ml-20 flex space-x-16">
        <OpeningPart />
      </div>
      {detail.opening_hours?.weekday_text?.map((day: string, i: number) => (
        <div key={i} className="m-3">
          {day.replace(/,/g, '，　').replace(/:/g, ':　').replace(/時/g, ':').replace(/分/g, '')}
        </div>
      ))}
    </>
  ) : (
    <></>
  )
}

const Slides = ({ photos, name }: { photos?: google.maps.places.PlacePhoto[]; name?: string }) => (
  <>
    {photos?.map((photo, i) => (
      <SplideSlide key={i} className="relative aspect-square">
        <Image key={i} loader={imageLoader} src={photo.getUrl() || ''} fill alt={`${name}の画像${i + 1}`} />
      </SplideSlide>
    ))}
  </>
)
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
  }, [thumbsRef.current, slidesRef.current])
  return detail ? (
    <Swiperable handleClose={handleClose} detail={detail}>
      <RxCross1 onClick={handleClose} className="absolute top-5 right-5 z-30 text-white mix-blend-difference" />
      <div className="mb-8 w-full">
        <Splide options={slideOptions} ref={slidesRef} aria-label="place photos">
          <Slides photos={detail.photos} name={detail.name} />
        </Splide>
        <Splide options={thumbsOptions} ref={thumbsRef}>
          <Slides photos={detail.photos} name={detail.name} />
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
        <OpeningTime openingOpen={openingOpen} detail={detail} />
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
    </Swiperable>
  ) : (
    <></>
  )
})
