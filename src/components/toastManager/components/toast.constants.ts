import { ToastType } from 'types/toasts'

export const TOAST_TYPE_ICON: Record<ToastType, string> = {
  [ToastType.Error]: 'error',
  [ToastType.Success]: 'done',
  [ToastType.Warning]: 'warning',
}

// Time that toasts are shown when they are not discarded by the user (in ms).
export const TOAST_DISAPPEAR_TIME = 12000

export const TRANSACTION_DETAILS_TEXT = 'See Transaction Details'
