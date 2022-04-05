import { Toast, ToastType } from 'types/toasts'
import { ExtendedChainParams, MetamaskState } from './useMetamask.types'

export const METAMASK_INITIAL_STATE: MetamaskState = {
  currentAccount: '',
  error: '',
  isMetamaskLoading: true,
  isChainConnected: false,
  isUserConnected: false,
  hasMetamask: false,
}

export const PRODUCTION_NETWORK_PARAMS: ExtendedChainParams = {
  chainParams: {
    chainId: `0x${Number(250).toString(16)}`,
    chainName: 'Fantom',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ftm.tools/'],
    blockExplorerUrls: ['https://ftmscan.com/'],
  },
}

export const TESTNET_NETWORK_PARAMS: ExtendedChainParams = {
  chainParams: {
    chainId: `0xa869`,
    chainName: 'Avalanche FUJI',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  },
}

export const METAMASK_NOT_FOUND_TOAST: Toast = {
  title: 'Metamask was not found',
  message: 'Please install metamask to connect and use this website.',
  type: ToastType.Error,
}

export const USER_DENIED_CONNECTION_TOAST: Toast = {
  title: 'Could not connect to your wallet',
  message: 'Please connect to metamask to be able to use this website.',
  type: ToastType.Error,
}
