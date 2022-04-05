import {
  DISABLED_INFO_BALANCE,
  DISABLED_INFO_DISCONNECTED,
  DISABLED_INFO_HOLDER_ACTIONS,
} from './buyCrypto.constants'

export const getDisabledInfo = (
  disconnected: boolean,
  actionsDisabled: boolean,
  hasEnoughBalance: boolean
): string => {
  if (disconnected) {
    return DISABLED_INFO_DISCONNECTED
  }
  if (actionsDisabled) {
    return DISABLED_INFO_HOLDER_ACTIONS
  }
  if (!hasEnoughBalance) {
    return DISABLED_INFO_BALANCE
  }
  return ''
}
