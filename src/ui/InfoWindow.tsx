import { InfoWindow } from '@react-google-maps/api'
import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'

export const InfoWindows = ({
  makersLocation,
  service,
  setDetail
}: {
  makersLocation: google.maps.places.PlaceResult[] | null
  service: google.maps.places.PlacesService | null
  setDetail: Dispatch<SetStateAction<google.maps.places.PlaceResult | null>>
}) => {
  const detailCallback = (result: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      setDetail(result)
    }
  }
  const handleClickDetail = (placeId: google.maps.places.PlaceResult['place_id']) => {
    if (placeId) {
      const request = {
        placeId,
        fields: ['name', 'rating', 'formatted_phone_number', 'opening_hours', 'business_status', 'reviews', 'website']
      }
      service?.getDetails(request, detailCallback)
    }
  }
  return (
    <>
      {makersLocation &&
        makersLocation.map((place: google.maps.places.PlaceResult, i) => {
          const lat = place?.geometry?.location?.lat()
          const lng = place?.geometry?.location?.lng()
          const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${lat}%2C-${lng}&query_place_id=${place.place_id}`
          if (!place.name || i > 5) return
          return (
            <InfoWindow key={i} position={place?.geometry?.location}>
              <div>
                <p>{place.name}</p>
                <Image src={place.photos?.[0]?.getUrl() || ''} width="60" height="40" alt={place.name || 'icon画像'} />
                <div>{place.rating}</div>
                <div onClick={() => handleClickDetail(place.place_id)}>詳細を見る</div>
                <a href={googleMapUrl}>GoogleMapで確認する</a>
              </div>
            </InfoWindow>
          )
        })}
    </>
  )
}
