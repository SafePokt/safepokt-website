// Types
import { SafePoktParams } from 'hooks/useSafePOKT'
import { HomeCard } from './homePage.types'

export const CARDS: HomeCard[] = [
  {
    key: SafePoktParams.APR,
    statConfig: { notANumber: true },
    label: 'APR',
    icon: 'percent',
    info: `Gross APR estimation. See FAQ to understand how it's computed.`,
  },
  {
    key: SafePoktParams.NodeCount,
    label: 'Owned Nodes',
    statConfig: { unit: 'Nodes' },
    icon: 'dns',
  },
  {
    key: SafePoktParams.TotalClaimableRewards,
    label: 'Claimable Rewards',
    statConfig: { unit: '$', prefix: true },
    icon: 'paid',
    info: `Total USDC earned and distributed by the protocol.`,
  },
  {
    key: SafePoktParams.TotalRewardsPOKT,
    label: 'Total Rewards',
    statConfig: { unit: 'POKT' },
    icon: 'currency_exchange',
    info: `Total POKT earned (claimed & holded).`,
  },
  {
    key: SafePoktParams.CurrentEpoch,
    label: 'Current Epoch',
    subStat: () => 'Duration: 1 week',
    icon: 'view_timeline',
  },
  {
    key: SafePoktParams.TotalShares,
    label: 'Total Shares',
    statConfig: { unit: 'Shares' },
    icon: 'account_balance',
    info: `Number of POKT Shares.`,
  },
  {
    key: SafePoktParams.NewInvestments,
    label: 'New Investments',
    statConfig: { unit: '$', prefix: true },
    icon: 'pending',
    info: `Share sale revenue that is still to be invested.`,
    subStatConfig: { unit: 'Nodes' },
    subStat: (newInvestments: number) => newInvestments / 16000,
  },
  {
    key: SafePoktParams.TotalInvestmentsInUSDC,
    label: 'Total Investment',
    statConfig: { unit: '$', prefix: true },
    icon: 'savings',
  },
  {
    key: SafePoktParams.HolderCount,
    label: 'Holder Count',
    statConfig: { unit: 'Holders' },
    icon: 'groups',
  },
  {
    key: SafePoktParams.NextEpochTime,
    statConfig: { notANumber: true },
    label: 'Next Epoch',
    icon: 'hourglass_top',
    info: `Days until the current epoch finishes and the next one starts.`,
  },
]
