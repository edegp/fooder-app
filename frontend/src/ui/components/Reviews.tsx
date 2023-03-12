import { memo } from 'react'

import Image from 'next/image'

import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { getDiffDate } from '@/lib/modules/getDiffDate'
import { imageLoader } from '@/lib/modules/imageLoader'
import { mediaQueryPc } from '@/lib/modules/mediaQuery'
import { placeDetailState } from '@/lib/recoil/mapState'

import { Star } from '@/ui/atom/Star'
import { Text } from '@/ui/atom/Text'

const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  ${mediaQueryPc} {
    row-gap: 32px;
  }
`

export const Reviews = memo(function Reviews() {
  const detail = useRecoilValue(placeDetailState)

  if (!detail) {
    return <></>
  }

  return (
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
              className="object-cover"
            />
            <div className="grow">{review.author_name}</div>
            <p>{getDiffDate(review.time)}</p>
          </div>
          <div className="ml-[calc(30px+2.5rem)] flex">
            <Star rating={review.rating} />
          </div>
          <Text className="my-5" isEllipsis>
            {review.text}
          </Text>
        </div>
      ))}
    </ReviewWrap>
  )
})
