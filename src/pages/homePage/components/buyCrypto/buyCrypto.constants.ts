import { Toast, ToastType } from 'types/toasts'

// Toasts
export const SUCCESS_TOAST: Toast = {
  title: 'Success!',
  message: 'Shares bought successfully!',
  type: ToastType.Success,
}

export const ERROR_TOAST: Toast = {
  title: 'Unexpected Buy Error.',
  message: 'The shares could not be bought.',
  type: ToastType.Error,
}

export const APPROVE_SUCCESS_TOAST: Toast = {
  title: 'Success!',
  message: 'Your USDC was successfully approved!',
  type: ToastType.Success,
}

export const APPROVE_ERROR_TOAST: Toast = {
  title: 'Unexpected Approve Error.',
  message: 'USDC approve failed. USDC balance can not be zero.',
  type: ToastType.Error,
}

export const DISABLED_INFO_HOLDER_ACTIONS = 'Holder actions disabled.'

export const DISABLED_INFO_BALANCE = 'Not enough balance.'

export const DISABLED_INFO_DISCONNECTED = 'Connect to buy shares.'
