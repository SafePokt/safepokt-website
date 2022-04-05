import { ethers } from 'ethers'

export interface MetamaskInternalState {
  error: string
  chainId?: string
  currentAccount: string
  targetNetwork?: ExtendedChainParams
  isChainConnected: boolean
  isUserConnected: boolean
  isMetamaskLoading: boolean
  hasMetamask: boolean
}

export interface MetamaskState extends MetamaskInternalState {
  connect?: () => Promise<void>
  swapToProd?: () => Promise<void>
  provider?: unknown
  ethersProvider?: ethers.providers.BaseProvider
  isTestNetwork?: boolean
}

export interface ChainParams {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
}

export interface ExtendedChainParams {
  wsurl?: string
  chainParams: ChainParams
}
