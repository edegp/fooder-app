import { RingLoader } from 'react-spinners'

export const LoadingRing = () => (
  <RingLoader
    color="#222"
    cssOverride={{
      margin: 'auto',
      textAlign: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 100
    }}
  />
)
