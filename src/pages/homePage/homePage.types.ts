// Types
import { SafePoktParams } from 'hooks/useSafePOKT'
import { CoinImage } from 'components/coinIcon/coinIcon.types'

export interface HomeCard {
  key: SafePoktParams
  label: string
  statConfig?: {
    token?: {
      image?: CoinImage
      unit?: string
    }
    unit?: string
    prefix?: boolean
    notANumber?: boolean
  }
  subStatConfig?: { unit: string; prefix?: boolean }
  subStat?: (stat: number) => number | string
  info?: string
  imageUrl?: string
  icon?: string
}

export enum HomepageStat {
  TotalShares = 'TOTAL_SHARES',
  NewInvestments = 'NEW_INVESTMENTS',
  TotalInvestmentsInUSDC = 'TOTAL_INVESTMENTS_USDC',
  PoktRewards = 'POKT_REWARDS',
  NodeCount = 'NODE_COUNT',
  TotalClaimableRewards = 'TOTAL_REWARDS_USDC',
  TotalRewardsPOKT = 'TOTAL_REWARDS_POKT',
}
