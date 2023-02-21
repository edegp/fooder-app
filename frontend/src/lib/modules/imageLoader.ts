import { ImageLoaderProps } from 'next/image'
/* next/image用のimage loader**/
export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => `${src}?w=${width}&q=${quality || 75}`
