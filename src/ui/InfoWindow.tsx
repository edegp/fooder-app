import { InfoWindowF, MarkerF } from '@react-google-maps/api'
import { Dispatch, Fragment, memo, SetStateAction, useCallback, useState } from 'react'
import Image from 'next/image'
import { Star } from './star'
import { imageLoader } from '@/lib/imageLoader'

/* レコメンドした場所をwindowで表示**/
export const InfoWindows = memo(
  ({
    makersLocation,
    service,
    setDetail
  }: {
    makersLocation: google.maps.places.PlaceResult[] | null
    service: google.maps.places.PlacesService | null
    setDetail: Dispatch<SetStateAction<google.maps.places.PlaceResult | null>>
  }) => {
    const placeNames = makersLocation?.map((place: google.maps.places.PlaceResult) => [place.name, false]) || [[]]
    const placeObj = Object.fromEntries(placeNames)
    const [openList, setOpenList] = useState<{ [key: string]: boolean }>(placeObj)
    const detailCallback = useCallback(
      (result: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          setDetail(result)
        }
      },
      []
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
          service?.getDetails(request, detailCallback)
        }
      },
      [service]
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
                  <MarkerF
                    position={geometry?.location || { lat: 0, lng: 0 }}
                    icon={{
                      url: icon || '',
                      labelOrigin: new google.maps.Point(
                        geometry?.location?.lat() || 0,
                        geometry?.location?.lng() || 0
                      ),
                      scaledSize: new google.maps.Size(26, 26, 'px', 'px')
                    }}
                    onClick={() => {
                      setOpenList(prev => Object.fromEntries(Object.keys(prev).map(key => [key, false])))
                      setOpenList(prev => ({ ...prev, [name]: !prev[name] }))
                    }}
                  />
                  {openList[name] && (
                    <InfoWindowF position={geometry?.location}>
                      <div className="flex flex-col space-y-2">
                        <p>{name}</p>
                        <Star rating={rating} className="flex space-x-2" isDisplayRatingNum />
                        <Image
                          loader={imageLoader}
                          src={photos?.[0]?.getUrl() || ''}
                          width={60}
                          sizes="auto"
                          height={40}
                          alt={name || 'icon画像'}
                        />

                        <div onClick={() => handleClickDetail(place_id)} className="underline hover:opacity-30">
                          詳細を見る
                        </div>
                        <a href={googleMapUrl}>GoogleMapで確認する</a>
                      </div>
                    </InfoWindowF>
                  )}
                </Fragment>
              )
          })}
      </>
    )
  }
)
