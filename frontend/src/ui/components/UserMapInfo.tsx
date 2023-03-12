import { memo } from 'react'

import { useRecoilValue } from 'recoil'

import { geoLocation, placeDetailState } from '@/lib/recoil/mapState'

import { Marker } from '@/ui/atom/Marker'

import { MarkerAndInfoWindows } from '@/ui/components/googleMap/MarkerAndInfoWindows'

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
