import React, { useCallback, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

// Types
import { Toast } from 'types/toasts'

// Utils
import { easyClone } from 'utils/easyClone'

export interface ToastsState {
  toasts: Toast[]
  heights: number[]

  newToast: (toast: Toast, tHash?: string, isCenter?: boolean) => void
  removeToast: (id?: string) => void
  popToast: () => void
  setHeight: (index: number, height: number) => void
}

const ToastContext = React.createContext<ToastsState>({
  toasts: [],
  heights: [],

  newToast: () => {
    // Default empty
  },

  popToast: () => {
    // Default empty
  },

  removeToast: () => {
    // Default empty
  },

  setHeight: () => {
    // Default empty
  },
})

interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [heights, setHeights] = useState<number[]>([])

  const newToast = useCallback(
    (referenceToast: Toast, tHash?: string, isCenter?: boolean) => {
      const toast = easyClone(referenceToast)

      if (!toast.id) {
        toast.id = uuid()
      }

      toast.tHash = tHash
      toast.center = isCenter

      setToasts((current) => [...current, toast])
    },
    [setToasts]
  )

  const removeToast = useCallback(
    (id?: string) => {
      let removedIndex = -1

      setToasts((current) => {
        const curentToasts = [...current]
        removedIndex = current.findIndex((toast) => toast.id === id)
        if (removedIndex !== -1) {
          curentToasts.splice(removedIndex, 1)
        }
        return curentToasts
      })
      setHeights((current) => {
        const curentToasts = [...current]

        if (removedIndex !== -1) {
          curentToasts.splice(removedIndex, 1)
        }
        return curentToasts
      })
    },
    [setToasts]
  )

  const popToast = useCallback(() => {
    setToasts((current) => {
      const curentToasts = [...current]
      curentToasts.pop()
      return curentToasts
    })
    setHeights((current) => {
      const curentToasts = [...current]
      curentToasts.pop()
      return curentToasts
    })
  }, [setToasts])

  const setHeight = useCallback(
    (index: number, height: number) => {
      setHeights((current) => {
        const currentHeights = [...current]
        currentHeights[index] = height
        return currentHeights
      })
    },
    [setHeights]
  )

  return (
    <ToastContext.Provider
      value={{ toasts, heights, newToast, setHeight, removeToast, popToast }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export const useToasts = () => useContext(ToastContext)
