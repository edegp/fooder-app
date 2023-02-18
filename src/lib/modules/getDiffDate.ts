import { differenceInDays, fromUnixTime } from 'date-fns'

export const getDiffDate = (time: number) => {
  const diff = differenceInDays(new Date(), fromUnixTime(time))
  if (diff > 365) {
    return `${(diff / 365) | 0}年前`
  } else if (diff > 30) {
    return `${(diff / 30) | 0}ヶ月前`
  } else if (diff > 7) {
    return `${(diff / 7) | 0}週間前`
  }
  return `${diff}日前`
}
