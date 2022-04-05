import { useCallback, useMemo } from 'react'

// Hooks
import { useToasts } from 'providers/ToastProvider'
import { useTransition } from 'react-spring'

// Components
import { ToastComponent } from './components/Toast'

// Styles
import { ToastContainer } from './toastManager.styles'

export const ToastManager = () => {
  const { toasts, heights, removeToast, setHeight } = useToasts()

  const indexedToasts = useMemo(
    () =>
      toasts.map((toast, index) => ({
        ...toast,
        index,
      })),
    [toasts]
  )

  const transitions = useTransition(indexedToasts, {
    keys: (item) => item.id ?? item.message,
    config: { duration: 300 },
    from: { opacity: 0 },
    enter: {
      opacity: 1,
      transform: 'translateX(0%)',
    },
    leave: {
      opacity: 0,
    },
  })

  const getPreviousHeight = useCallback(
    (index: number) => {
      if (index > 0) {
        const previousToasts = heights.slice(0, index)
        let previousHeight = 0

        previousToasts.forEach((height) => {
          previousHeight += height
        })

        return previousHeight
      }

      return 0
    },
    [heights]
  )

  return (
    <ToastContainer>
      {transitions((style, toast) => (
        <ToastComponent
          tHash={toast.tHash}
          previousHeight={getPreviousHeight(toast.index)}
          index={toast.index}
          style={style}
          key={toast.id}
          id={toast.id}
          center={toast.center}
          onClose={removeToast}
          setHeight={setHeight}
          message={toast.message}
          title={toast.title}
          type={toast.type}
        />
      ))}
    </ToastContainer>
  )
}
