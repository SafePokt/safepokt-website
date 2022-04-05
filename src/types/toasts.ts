export enum ToastType {
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
}

export interface Toast {
  title: string
  message: string
  center?: boolean
  type?: ToastType
  id?: string
  tHash?: string
}
