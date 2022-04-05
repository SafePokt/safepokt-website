import { Toast, ToastType } from 'types/toasts'

export const USDC_BALANCE = 10000
export const POKT_BALANCE = 8000

export const USDC_PERIOD_REWARDS = 200
export const POKT_PERIOD_REWARDS = 160

export const USDC_TOTAL_REWARDS = 5000
export const POKT_TOTAL_REWARDS = 4000

export const CLAIM_RATE_TITLE_INFO = `Claim/Hold Rate for following distributions.`

export const POKT_HOLDINGS_INFO =
  'POKT rewards you own in the Pocket Network holding wallet.'

export const UNHOLDING_INFO =
  'Sell any amount of your POKT Holdings. Claim obtained $USDC within the next epoch reward distribution.'

export const CLAIMABLE_INFO = 'USDC rewards you have available to claim'

export const HOLDINGS_RELEASED_INFO =
  'POKT holdings pending/available to be released and claimable as USDC.'

export const SUCCESS_CLAIM_RATE_TOAST: Toast = {
  title: 'Success!',
  message: 'Your Claim Rate was successfully updated!',
  type: ToastType.Success,
}

export const ERROR_CLAIM_RATE_TOAST: Toast = {
  title: 'Something went wrong',
  message: 'Your Claim Rate could not be updated.',
  type: ToastType.Error,
}

export const SUCCESS_CLAIM_TOAST: Toast = {
  title: 'Success!',
  message: 'Your Rewards were successfully claimed!',
  type: ToastType.Success,
}

export const ERROR_CLAIM_TOAST: Toast = {
  title: 'Something went wrong',
  message: 'Your Rewards could not be claimed.',
  type: ToastType.Error,
}

export const SUCCESS_UNHOLD_TOAST: Toast = {
  title: 'Success!',
  message:
    'Your POKT was successfully unholded! You will be able to claim it in the next epoch.',
  type: ToastType.Success,
}

export const ERROR_UNHOLD_TOAST: Toast = {
  title: 'Something went wrong',
  message: 'Your POKT could not be unholded.',
  type: ToastType.Error,
}

export const DISABLED_INFO_NOT_EXISTS = 'You are not a holder.'

export const DISABLED_INFO_HOLDER_ACTIONS = 'Holder Actions disabled.'

export const DISABLED_INFO_INVESTING_EPOCH =
  'Your money is still in investing epoch.'

export const DISABLED_INFO_ALREADY_CLAIMED = 'You will be able to claim next epoch.'
