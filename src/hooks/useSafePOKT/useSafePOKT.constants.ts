import { Toast, ToastType } from 'types/toasts'
import {
  SafePoktParams,
  SafePoktUserParams,
  UseSafePoktReturnType,
} from './useSafePOKT.types'

interface ParamInfo {
  decimals?: boolean
  notNumber?: boolean
}
export interface GetParam extends ParamInfo {
  key: SafePoktParams | SafePoktUserParams
}

export const FIRST_EPOCH_DATE = new Date('04/09/2022')

export const DAY_MS = 24 * 60 * 60 * 1000
export const EPOCH_ESTIMATE_MS = 7 * DAY_MS

export const CONTRACT_GETS: GetParam[] = [
  { key: SafePoktParams.CurrentEpoch, decimals: false },
  { key: SafePoktParams.BuyPrice, decimals: true },
  { key: SafePoktParams.HolderActionsEnabled, notNumber: true },
  { key: SafePoktParams.HolderCount },
  // { key: SafePoktParams.LatestSellPoktPrice, decimals: true },
  { key: SafePoktParams.NewInvestments, decimals: true },
  { key: SafePoktParams.NodeCount },
  { key: SafePoktParams.ProtToken, notNumber: true },
  { key: SafePoktParams.TotalInvestmentsInUSDC },
  { key: SafePoktParams.TotalRewardsPOKT, decimals: true },
  { key: SafePoktParams.TotalClaimableRewards, decimals: true },
  { key: SafePoktParams.TotalShares, decimals: true },
]

export const USER_PARAMS_DECIMALS: Record<
  SafePoktUserParams,
  ParamInfo | undefined
> = {
  [SafePoktUserParams.Exists]: { decimals: false, notNumber: true },
  [SafePoktUserParams.PoktReward]: { decimals: true },
  [SafePoktUserParams.PoktShareCount]: { decimals: true },
  [SafePoktUserParams.PoktUnHold]: { decimals: true },
  [SafePoktUserParams.PoktUnHoldEpoch]: { decimals: false },
  [SafePoktUserParams.LatestSnapshotIndex]: { decimals: false },
  [SafePoktUserParams.NoRewardThisEpoch]: undefined,
  [SafePoktUserParams.PoktUnHoldClaimable]: undefined,
  [SafePoktUserParams.RewardClaimable]: { decimals: true },
  [SafePoktUserParams.TotalClaimedUSDC]: { decimals: true },
  [SafePoktUserParams.WillingToClaim]: { decimals: false },
  [SafePoktUserParams.CanClaimRewards]: { decimals: false, notNumber: true },
  [SafePoktUserParams.CanUpdatePercent]: { decimals: false, notNumber: true },
}

export const useSafePoktDefaultParams = {
  [SafePoktParams.NextEpochTime]: 0,
  [SafePoktParams.CurrentEpoch]: 0,
  [SafePoktParams.BuyPrice]: 1,
  [SafePoktParams.HolderCount]: 0,
  [SafePoktParams.NewInvestments]: 0,
  [SafePoktParams.NodeCount]: 0,
  [SafePoktParams.PoktRewards]: 0,
  [SafePoktParams.ProtToken]: '',
  [SafePoktParams.TotalInvestmentsInUSDC]: 0,
  [SafePoktParams.TotalRewardsPOKT]: 0,
  [SafePoktParams.TotalClaimableRewards]: 0,
  [SafePoktParams.TotalShares]: 0,
  [SafePoktParams.TotalSupply]: 0,
  [SafePoktParams.APR]: '97-290%',
  [SafePoktParams.HolderActionsEnabled]: false,

  // Users
  [SafePoktUserParams.Exists]: false,
  [SafePoktUserParams.WillingToClaim]: 100,
  [SafePoktUserParams.PoktReward]: 0,
  [SafePoktUserParams.PoktUnHold]: 0,
  [SafePoktUserParams.PoktUnHoldEpoch]: Infinity,
  [SafePoktUserParams.PoktUnHoldClaimable]: false,
  [SafePoktUserParams.PoktShareCount]: 0,
  [SafePoktUserParams.RewardClaimable]: 0,
  [SafePoktUserParams.TotalClaimedUSDC]: 0,
  [SafePoktUserParams.CanClaimRewards]: false,
  [SafePoktUserParams.CanUpdatePercent]: false,
  [SafePoktUserParams.NoRewardThisEpoch]: false,
  [SafePoktUserParams.LatestSnapshotIndex]: 0,
}

const notInitializedError = () => {
  throw new Error('Contract not initialized yet')
}

export const useSafePoktDefaultReturn: UseSafePoktReturnType = {
  ...useSafePoktDefaultParams,

  // Other
  isLoading: true,

  // Methods
  buyPokt: notInitializedError,
  claimReward: notInitializedError,
  changeClaimPercent: notInitializedError,
  unHoldPoktOrder: notInitializedError,
}

export const SUCCESS_EPOCH_TOAST: Toast = {
  title: 'New epoch started!',
  message: `The Reward distribution from the previous Epoch has been successfully completed!
    You will be able to claim rewards shortly.
    `,
  type: ToastType.Success,
}
