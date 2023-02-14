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
        <SplideSlide key={i} className="relative aspect-square">
          <Image key={i} loader={imageLoader} src={photo.getUrl() || ''} fill alt={`${name}の画像${i + 1}`} />
        </SplideSlide>
      ))}
    </>
  )
})
