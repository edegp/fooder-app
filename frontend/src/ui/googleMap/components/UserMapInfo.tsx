import { memo } from 'react'

import { useRecoilValue } from 'recoil'

import { geoLocation, placeDetailState } from '@/lib/recoil/state'
import { MarkerAndInfoWindows } from '@/ui/googleMap/MarkerAndInfoWindows'
import { Marker } from '@/ui/googleMap/components/Marker'

export const UserMapInfo = memo(function UserMapInfo() {
  const center = useRecoilValue(geoLocation)
  const detail = useRecoilValue(placeDetailState)
  if (!center) {
    return <></>
  }
  return (
    <>
      <Marker
        position={center}
        icon={{ scaledSize: new google.maps.Size(24, 24), url: '/navigate-circle-outline.svg' }}
        clickable={!!detail}
      />
      <MarkerAndInfoWindows />
    </>
  )
})
