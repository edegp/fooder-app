import { useWindowSize } from '@/lib/useWindowSize'

const mediaQueryMin = (min: number, style?: TemplateStringsArray | string) => () =>
  `@media screen and (min-width: ${Math.trunc(min)}px)` + ((style && `{ ${style} }`) || '')

export const mediaQueryPc = mediaQueryMin(768)()

export const useIsPcBrowser = () => useWindowSize()[0] > 768
