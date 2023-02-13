// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '../../../tailwind.config.js'

const { theme } = resolveConfig(tailwindConfig)
export const colors = theme?.colors as { [key: string]: { [key: string]: string } }
