'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from 'react'

import { MarkerProps } from '@react-google-maps/api'
import { useRecoilValue } from 'recoil'

import { mapState } from '@/lib/recoil/state'

export const Marker = memo(function Marker({ position, options, clickable, icon, onClick }: MarkerProps) {
  const map = useRecoilValue(mapState)
  const [instance, setInstance] = useState<google.maps.Marker | null>(null)
  const [clickListener, setClickListener] = useState<google.maps.MapsEventListener | null>(null)

  useEffect(() => {
    instance?.setMap(map)
  }, [map])

  useEffect(() => {
    if (options && instance) {
      instance.setOptions(options)
    }
  }, [instance, options])

  useEffect(() => {
    if (clickable && instance !== null) {
      instance.setClickable(clickable)
    }
  }, [instance, clickable])

  useEffect(() => {
    if (position && instance !== null) {
      instance.setPosition(position)
    }
  }, [instance, position])

  useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener)
      }
      setClickListener(google.maps.event.addListener(instance, 'click', onClick))
    }
  }, [onClick])

  useEffect(function markerInit() {
    const markerOptions = {
      ...options,
      map,
      position: position
    }
    const marker = new window.google.maps.Marker(markerOptions)
    marker.setMap(map)
    if (position) marker.setPosition(position)
    if (icon) marker.setIcon(icon)
    if (clickable) marker.setClickable(clickable)
    if (onClick) setClickListener(google.maps.event.addListener(marker, 'click', onClick))
    setInstance(marker)

    // return () => {
    //   if (marker) marker.setMap(null)
    // }
  }, [])

  return null
})
