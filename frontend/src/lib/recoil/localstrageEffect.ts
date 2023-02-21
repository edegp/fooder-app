'use client'

import { AtomEffect, DefaultValue } from 'recoil'

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(key)
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue))
      }
    }
    onSet(newValue => {
      if (typeof window !== 'undefined') {
        if (newValue instanceof DefaultValue) {
          localStorage.removeItem(key)
        } else {
          localStorage.setItem(key, JSON.stringify(newValue))
        }
      }
    })
  }
