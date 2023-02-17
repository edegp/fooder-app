import { RxCross1 } from 'react-icons/rx'

export const CloseButton = ({ close }: { close: () => void }) => {
  return <RxCross1 onClick={close} className="absolute top-5 right-5 z-30 text-white mix-blend-difference" />
}
