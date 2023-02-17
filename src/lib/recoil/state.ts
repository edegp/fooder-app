import { string } from '@recoiljs/refine'
import { atom, selector } from 'recoil'
import { urlSyncEffect } from 'recoil-sync'

import { currentUserState } from '@/lib/hooks/useUser'

const clientSize = atom({
  key: 'clientSize',
  default: [0, 0]
})

const isPcBrowser = selector({
  key: 'isPcBrowser',
  get: ({ get }) => {
    const [clientWidth] = get(clientSize) as number[]
    return clientWidth > 768
  }
})

const mapState = atom<google.maps.Map | null>({
  key: 'mapState',
  default: null,
  dangerouslyAllowMutability: true
})

const urlState = atom<string>({
  key: 'url',
  effects: [
    ({ getPromise, setSelf }) => {
      getPromise(currentUserState).then(result => (!!result ? setSelf('/') : setSelf('/signup')))
    },
    urlSyncEffect({ storeKey: 'url', refine: string() })
  ]
})

export { clientSize, isPcBrowser, mapState, urlState }
