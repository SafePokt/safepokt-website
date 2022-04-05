import { TransactionResponse } from '@ethersproject/abstract-provider'

export type KeyValue = {
  key: SafePoktParams | SafePoktUserParams
  value: unknown
}

export enum SafePoktParams {
  NextEpochTime = 'nextEpochTime',
  CurrentEpoch = 'latestSnapshotIndex',
  APR = 'getLastEpochAPR',
  BuyPrice = 'poktBuyPrice',
  HolderCount = 'holderCount',
  NewInvestments = 'newInvestments',
  NodeCount = 'totalNodeCount',
  PoktRewards = 'poktRewards',
  ProtToken = 'protToken',
  TotalInvestmentsInUSDC = 'totalInvestmentsInUSDC',
  TotalRewardsPOKT = 'totalPOKTRewards',
  TotalClaimableRewards = 'totalClaimableRewards',
  TotalShares = 'totalPoktShares',
  TotalSupply = 'totalSupply',
  HolderActionsEnabled = 'holderActionsEnabled',
}

export enum SafePoktUserParams {
  Exists = 'exists',
  WillingToClaim = 'willingToClaim',
  PoktReward = 'PoktReward',
  PoktUnHold = 'PoktUnHold',
  PoktUnHoldEpoch = 'PoktUnHoldEpoch',
  PoktUnHoldClaimable = 'PoktUnHoldClaimable',
  PoktShareCount = 'poktShareCount',
  RewardClaimable = 'rewardClaimable',
  NoRewardThisEpoch = 'noRewardThisEpoch',
  LatestSnapshotIndex = 'lastSnapshotIndex',
  TotalClaimedUSDC = 'totalClaimedUSDC',
  CanUpdatePercent = 'canChangePercent',
  CanClaimRewards = 'canClaimReward',
}

export enum SafePoktEvents {
  WillingToClaim = 'ClaimRateUpdated',
  Deposited = 'Deposited',
  RewardPaid = 'RewardPaid',
  UnHold = 'UnHold',
  NodeAdded = 'NodeAdded',
  BuyPriceUpdate = 'BuyPriceUpdate',
  HolderActionsToggled = 'HolderActionsToggled',
  RewardAdded = 'RewardAdded',
}

export interface UseSafePoktUserParams {
  [SafePoktUserParams.Exists]: boolean
  [SafePoktUserParams.WillingToClaim]: number
  [SafePoktUserParams.PoktReward]: number
  [SafePoktUserParams.PoktUnHold]: number
  [SafePoktUserParams.PoktUnHoldEpoch]: number
  [SafePoktUserParams.PoktUnHoldClaimable]: boolean
  [SafePoktUserParams.PoktShareCount]: number
  [SafePoktUserParams.RewardClaimable]: number
  [SafePoktUserParams.TotalClaimedUSDC]: number
  [SafePoktUserParams.CanClaimRewards]: boolean
  [SafePoktUserParams.CanUpdatePercent]: boolean
  [SafePoktUserParams.LatestSnapshotIndex]: number
  [SafePoktUserParams.NoRewardThisEpoch]: boolean
}

export interface UseSafePoktParams extends UseSafePoktUserParams {
  [SafePoktParams.NextEpochTime]: number
  [SafePoktParams.CurrentEpoch]: number
  [SafePoktParams.APR]: string
  [SafePoktParams.BuyPrice]: number
  [SafePoktParams.HolderCount]: number
  [SafePoktParams.NewInvestments]: number
  [SafePoktParams.NodeCount]: number
  [SafePoktParams.PoktRewards]: number
  [SafePoktParams.ProtToken]: string
  [SafePoktParams.TotalInvestmentsInUSDC]: number
  [SafePoktParams.TotalRewardsPOKT]: number
  [SafePoktParams.TotalClaimableRewards]: number
  [SafePoktParams.TotalShares]: number
  [SafePoktParams.TotalSupply]: number
  [SafePoktParams.HolderActionsEnabled]: boolean
}

export interface UseSafePoktReturnType extends UseSafePoktParams {
  address?: string
  isLoading: boolean
  buyPokt: (amount: number) => Promise<TransactionResponse>
  claimReward: () => Promise<TransactionResponse>
  changeClaimPercent: (amount: number) => Promise<TransactionResponse>
  unHoldPoktOrder: (amount: number) => Promise<TransactionResponse>
}
