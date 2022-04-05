import { UseSpendableTokenReturnType } from './useSpendableToken.types'

export const USDC_ADDRESS = '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75'
export const USDC_DECIMALS = 6
export const USDC_SUFIX = 'USDC'

export const TESTNET_USDC_ADDRESS = '0x028f4464B777CDa585A9a481CcE6b553786f16C6'
export const TESTNET_USDC_DECIMALS = 6
export const TESTNET_USDC_SUFIX = 'USDC'

const notInitialized = () => {
  throw new Error('Contract not initialized yet.')
}

export const useSpendableTokenDefaultReturn: UseSpendableTokenReturnType = {
  balanceOf: notInitialized,
  approve: notInitialized,
  allowance: notInitialized,
  refreshParams: notInitialized,
  address: '',
  sufix: '',
  isLoading: true,
  balance: 0,
}
