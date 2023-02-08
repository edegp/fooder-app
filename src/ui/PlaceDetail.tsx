import { getDate } from '@/lib/getDate'
import Image from 'next/image'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { Options, Splide, SplideSlide } from '@splidejs/react-splide'
import { Star } from '@/ui/star'
import { imageLoader } from '@/lib/imageLoader'
import { LongText } from '@/ui/LongText'

const Slides = ({ photos, name }: { photos?: google.maps.places.PlacePhoto[]; name?: string }) => (
  <>
    {photos?.map((photo, i) => (
      <SplideSlide>
        <Image key={i} loader={imageLoader} src={photo.getUrl() || ''} fill alt={`${name}の画像${i + 1}`} />
      </SplideSlide>
    ))}
  </>
)
/* レコメンドした場所をタップした場合に表示する詳細画面**/
export const PlaceDetail = memo(
  ({ detail, handleClose }: { detail: google.maps.places.PlaceResult | null; handleClose: () => void }) => {
    const [openingOpen, setOpeningOpen] = useState(false)
    const handleOpeningClick = useCallback(() => setOpeningOpen(!openingOpen), [openingOpen])
    const slideOptions: Options = {
      type: 'fade',
      rewind: true,
      fixedHeight: 280
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
      <div className="absolute top-10 right-0 z-20 flex h-full w-full flex-col space-y-3 overflow-x-hidden overflow-y-scroll bg-slate-500 p-6 text-white md:w-1/3">
        <RxCross1 onClick={handleClose} className="absolute top-5 right-5 z-30" />
        <div className="my-6 text-center text-lg font-bold">{detail.name}</div>
        <div className="my-8 w-full ">
          <Splide options={slideOptions} ref={slidesRef} aria-label="place photos">
            <Slides photos={detail.photos} name={detail.name} />
          </Splide>
          <Splide options={thumbsOptions} ref={thumbsRef}>
            <Slides photos={detail.photos} name={detail.name} />
          </Splide>
        </div>
        <div className="my-8 flex justify-between" onClick={handleOpeningClick}>
          <p>営業時間</p>
          {openingOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
        {openingOpen && detail.opening_hours?.weekday_text?.map(day => <div className="my-3">{day}</div>)}

        <div className="flex">
          <p>電話番号 :　</p>
          <a href={`tel:${detail.formatted_phone_number}`}>{detail.formatted_phone_number}</a>
        </div>
        <div>
          {detail.reviews?.map(review => (
            // 親要素にflexあり
            <div>
              <div className="flex flex-wrap  space-x-10">
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
        </div>
        <a href={detail.website} />
        <div>
          {detail.business_status === google.maps.places.BusinessStatus.CLOSED_TEMPORARILY
            ? '一時休業中'
            : detail.business_status === google.maps.places.BusinessStatus.CLOSED_PERMANENTLY && '閉店'}
        </div>
      </div>
    ) : (
      <></>
    )
  }
)
