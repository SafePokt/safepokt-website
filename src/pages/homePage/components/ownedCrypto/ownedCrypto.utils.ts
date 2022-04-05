import { Toast, ToastType } from 'types/toasts'
import {
  DISABLED_INFO_ALREADY_CLAIMED,
  DISABLED_INFO_HOLDER_ACTIONS,
  DISABLED_INFO_INVESTING_EPOCH,
  DISABLED_INFO_NOT_EXISTS,
} from './ownedCrypto.constants'

export const getClaimRateInfo = (
  claimed = 100,
  holded = 0
) => `Each distribution, from your earned $POKT amount rewards:
  ${claimed}% will be Cashed to $USDC for you to claim.
  ${holded}% will be Holded in the Pocket Network. Release tokens at the $POKT price you want.
  `
export const getClaimWarningToast = (claimed = 100, holded = 0): Toast => ({
  title: 'Warning',
  message: `For the following epoch's reward distributions, ${claimed}% of your $POKT rewards will be cashed to $USDC for you to claim, while the remaining ${holded}% will be holded in $POKT.`,
  type: ToastType.Warning,
})

export const getDisabledInfo = (
  exists?: boolean,
  actionsDisabled?: boolean,
  investingEpoch?: boolean,
  alreadyClaimed?: boolean
): string => {
  if (actionsDisabled) {
    return DISABLED_INFO_HOLDER_ACTIONS
  }

  if (!exists) {
    return DISABLED_INFO_NOT_EXISTS
  }

  if (investingEpoch) {
    return DISABLED_INFO_INVESTING_EPOCH
  }

  if (alreadyClaimed) {
    return DISABLED_INFO_ALREADY_CLAIMED
  }

  return ''
}
