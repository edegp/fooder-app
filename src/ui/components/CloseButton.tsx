import { RxCross1 } from 'react-icons/rx'

export const CloseButton = ({ handleClose }: { handleClose: () => void }) => {
  return <RxCross1 onClick={handleClose} className="absolute top-5 right-5 z-30 text-white mix-blend-difference" />
}
