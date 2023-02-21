import { Fragment, memo, useCallback, useState } from 'react'

import Image from 'next/image'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'

import { useOpenState } from '@/lib/hooks/useOpenState'
import { imageLoader } from '@/lib/modules/imageLoader'
import { mediaQueryPc } from '@/lib/modules/mediaQuery'
import { mapState, placeDetailState } from '@/lib/recoil/state'
import Button from '@/ui/atom/Button'
import Modal from '@/ui/atom/Modal'
import { Star } from '@/ui/components/Star'
import { InfoWindow } from '@/ui/googleMap/components/InfoWindow'
import { Marker } from '@/ui/googleMap/components/Marker'

const WindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  row-gap: 10px;
  height: auto;
  justify-items: center;
  text-align: center;
  overflow: hidden;
  > img,
  > div {
    margin: 0 auto;
  }
  ${mediaQueryPc} {
    font-size: 16px;
    row-gap: 14px;
    width: 280px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 12px;
`
/* レコメンドした場所をwindowで表示**/
export const InfoWindows = memo(function InfoWindows({
  makersLocation
}: {
  makersLocation: google.maps.places.PlaceResult[] | null
}) {
  const placeNames = makersLocation?.map((place: google.maps.places.PlaceResult) => [place.name, false]) || [[]]
  const placeObj = Object.fromEntries(placeNames)
  const [openList, setOpenList] = useState<{ [key: string]: boolean }>(placeObj)
  const { isOpen, handleClose, handleOpen } = useOpenState()
  const map = useRecoilValue(mapState)
  const setDetail = useSetRecoilState(placeDetailState)

  const detailCallback = useCallback(
    (result: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setDetail(result)
      }
    },
    [setDetail]
  )
  const handleClickDetail = useCallback(
    (placeId: google.maps.places.PlaceResult['place_id']) => {
      if (placeId) {
        const request = {
          placeId,
          fields: [
            'name',
            'rating',
            'formatted_phone_number',
            'opening_hours',
            'business_status',
            'reviews',
            'website',
            'photos'
          ]
        }
        if (map) {
          const service = new window.google.maps.places.PlacesService(map)
          service.getDetails(request, detailCallback)
        }
      }
    },
    [detailCallback, map]
  )

  return (
    <>
      {makersLocation
        ?.filter((place: google.maps.places.PlaceResult, i) => place.name && i < 5)
        .map((place: google.maps.places.PlaceResult, i) => {
          const { name, geometry, rating, icon, place_id, photos } = place
          const lat = geometry?.location?.lat()
          const lng = geometry?.location?.lng()
          const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${lat}%2C-${lng}&query_place_id=${place_id}`
          if (name)
            return (
              <Fragment key={i}>
                <Marker
                  position={geometry?.location || { lat: 0, lng: 0 }}
                  icon={{
                    url: icon || '',
                    labelOrigin: new google.maps.Point(geometry?.location?.lat() || 0, geometry?.location?.lng() || 0),
                    scaledSize: new google.maps.Size(26, 26, 'px', 'px')
                  }}
                  onClick={() => {
                    setOpenList(prev => Object.fromEntries(Object.keys(prev).map(key => [key, false])))
                    setOpenList(prev => ({ ...prev, [name]: !prev[name] }))
                  }}
                />
                {openList[name] && (
                  <InfoWindow position={geometry?.location}>
                    <WindowContainer>
                      <p>{name}</p>
                      <Star rating={rating} className="flex space-x-2" isDisplayRatingNum size={18} />
                      <Image
                        loader={imageLoader}
                        src={photos?.[0]?.getUrl() || ''}
                        width={112}
                        height={64}
                        className="h-[100px] object-cover"
                        alt={name || 'icon画像'}
                      />
                      <div
                        onClick={() => handleClickDetail(place_id)}
                        className="text-[15px] underline hover:opacity-30"
                      >
                        詳細を見る
                      </div>
                      <a onClick={handleOpen} className="leading-3">
                        GoogleMapで確認する
                      </a>
                    </WindowContainer>
                  </InfoWindow>
                )}
                <Modal isOpen={isOpen} handleClose={handleClose}>
                  <p>Google Mapに移動しますか？</p>
                  <ButtonContainer>
                    <a href={googleMapUrl} target="blank" rel="noreferrer">
                      <Button backgroundColor="blue">移動する</Button>
                    </a>
                    <Button backgroundColor="stone">戻る</Button>
                  </ButtonContainer>
                </Modal>
              </Fragment>
            )
        })}
    </>
  )
})