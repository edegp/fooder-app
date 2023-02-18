import { useRecoilValue } from 'recoil'

import { currentUserInfo } from '@/lib/recoil/state'

export const useUser = () => useRecoilValue(currentUserInfo)
