import { memo } from 'react'

import Image from 'next/image'

import { SplideSlide } from '@splidejs/react-splide'

import { imageLoader } from '@/lib/modules/imageLoader'

export const SlideImages = memo(function SlideImages({
  photos,
  name
}: {
  photos?: google.maps.places.PlacePhoto[]
  name?: string
}) {
  return (
    <>
      {photos?.map((photo, i) => (
        <SplideSlide key={i}>
          <Image
            key={i}
            loader={imageLoader}
            src={photo.getUrl() || ''}
            width="375"
            height="400"
            alt={`${name}の画像${i + 1}`}
            className="h-auto w-auto object-cover"
          />
        </SplideSlide>
      ))}
    </>
  )
})
