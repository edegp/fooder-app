import { Children, useEffect, useRef, useState } from 'react'

import { InfoWindowProps } from '@react-google-maps/api'
import { createPortal } from 'react-dom'
import { useRecoilValue } from 'recoil'

import { mapState } from '@/lib/recoil/state'

export const InfoWindow = ({ children, anchor, position, options }: InfoWindowProps) => {
  const map = useRecoilValue(mapState)
  const [instance, setInstance] = useState<google.maps.InfoWindow | null>(null)
  const containerElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (instance !== null) {
      instance.close()
      if (anchor) {
        instance.open(map, anchor)
      } else if (instance.getPosition()) {
        instance.open(map)
      }
    }
  }, [map, instance, anchor])

  useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options)
    }
  }, [instance, options])

  useEffect(() => {
    if (position && instance !== null) {
      instance.setPosition(position)
    }
  }, [instance, position])

  useEffect(() => {
    const infoWindow = new google.maps.InfoWindow({
      ...(options || {})
    })
    setInstance(infoWindow)
    containerElementRef.current = document.createElement('div')
    infoWindow.setContent(containerElementRef.current)
    if (position) {
      infoWindow.setPosition(position)
    }
    if (anchor) {
      infoWindow.open(map, anchor)
    } else if (infoWindow.getPosition()) {
      infoWindow.open(map)
    }
    return () => {
      infoWindow.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return containerElementRef.current ? createPortal(Children.only(children), containerElementRef.current) : null
}
