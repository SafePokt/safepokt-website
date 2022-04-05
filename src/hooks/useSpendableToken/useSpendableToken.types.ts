import { TransactionResponse } from '@ethersproject/abstract-provider'

export interface UseSpendableTokenReturnType {
  balanceOf: (address: string) => Promise<number>
  refreshParams: () => void
  approve: (
    addressToApprove: string,
    amount: number
  ) => Promise<TransactionResponse>
  allowance: (owner: string, spender: string) => Promise<number>
  isLoading: boolean
  address: string
  sufix: string
  balance: number
}
