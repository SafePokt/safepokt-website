import { useEffect, useRef } from 'react'

// Types
import { ToastType } from 'types/toasts'

// Constants
import {
  TOAST_DISAPPEAR_TIME,
  TOAST_TYPE_ICON,
  TRANSACTION_DETAILS_TEXT,
} from './toast.constants'

// Styles
import {
  Accent,
  CloseIcon,
  ToastCard,
  ToastContent,
  ToastIcon,
  ToastMessage,
  ToastContentRow,
  ToastTitle,
  ToastWrapper,
  ToastSpringAnimations,
  TransactionDetails,
  TransactionDetailsContainer,
} from './toast.styles'

// Utils
import { getScan } from './toast.utils'

interface ToastProps {
  index: number
  id?: string
  tHash?: string
  title: string
  message: string
  type?: ToastType
  center?: boolean
  onClose: (id?: string) => void
  setHeight: (index: number, height: number) => void
  style?: Record<string, unknown>
  previousHeight: number
}

export const ToastComponent = ({
  title,
  message,
  type = ToastType.Warning,
  onClose,
  setHeight,
  index,
  id,
  tHash,
  previousHeight,
  center,
  ...rest
}: ToastProps) => {
  const toastRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (toastRef.current) {
      setHeight(index, toastRef.current.getBoundingClientRect().height)
    }
  }, [toastRef, setHeight, index, id])

  useEffect(() => {
    const removeTimeout = setTimeout(() => {
      onClose(id)
    }, TOAST_DISAPPEAR_TIME)

    return () => {
      clearTimeout(removeTimeout)
    }
  }, [onClose, id])

  return (
    <ToastWrapper
      $previousHeight={previousHeight}
      index={index}
      ref={toastRef}
      $isCenter={center}
    >
      <ToastSpringAnimations {...rest}>
        <Accent type={type} />
        <ToastCard>
          <ToastContentRow>
            <ToastIcon type={type} icon={TOAST_TYPE_ICON[type]} />
            <ToastContent>
              <ToastTitle>{title}</ToastTitle>
              <ToastMessage>{message}</ToastMessage>
              {tHash && (
                <TransactionDetailsContainer>
                  <TransactionDetails
                    type={type}
                    href={getScan(tHash)}
                    target='_blank'
                  >
                    {TRANSACTION_DETAILS_TEXT}
                  </TransactionDetails>
                </TransactionDetailsContainer>
              )}
            </ToastContent>
          </ToastContentRow>
          <div>
            <CloseIcon
              type={type}
              onClick={() => {
                onClose(id)
              }}
            />
          </div>
        </ToastCard>
      </ToastSpringAnimations>
    </ToastWrapper>
  )
}
