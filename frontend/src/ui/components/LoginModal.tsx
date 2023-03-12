import { memo, useEffect } from 'react'

import { useRecoilValue } from 'recoil'

import { useOpenState } from '@/lib/hooks/useOpenState'
import { userStatus } from '@/lib/recoil/state'

import { Modal } from '@/ui/atom/Modal'
import { OverLay } from '@/ui/atom/OverLay'

const KeyFrame = () => (
  <style jsx>
    {`
      @keyframes Pop {
        0% {
          opacity: 0;
          transform: translateY(5%);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes PopReverse {
        0% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(5%);
        }
      }
    `}
  </style>
)
export const LoginModal = memo(function LoginModal() {
  const isLogin = useRecoilValue(userStatus)
  const { isOpen, setIsOpen, handleClose } = useOpenState()
  const style = {
    animation: isOpen ? '0.5s ease Pop' : '0.5s ease PopReverse',
    opacity: isOpen ? '1' : '0'
  }
  useEffect(() => {
    setIsOpen(isLogin)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])

  return (
    <>
      <KeyFrame />
      {isOpen && <OverLay />}
      <Modal isOpen={isOpen} handleClose={handleClose} title="ログインに成功しました" style={style} size="lg" />
    </>
  )
})
