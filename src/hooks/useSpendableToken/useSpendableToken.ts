import { useCallback, useEffect, useMemo, useState } from 'react'

// Contract
import FTM from 'contracts/FTM.json'
import fUSDC from 'contracts/fUSDT.json'

// Hooks
import { useERC20 } from 'hooks/useERC20/useERC20'
import { useMetamaskContext } from 'providers/MetaMaskProvider'

// Types
import { MetamaskState } from 'hooks/useMetamask'
import { UseSpendableTokenReturnType } from './useSpendableToken.types'

// Constants
import {
  TESTNET_USDC_ADDRESS,
  TESTNET_USDC_DECIMALS,
  TESTNET_USDC_SUFIX,
  USDC_ADDRESS,
  USDC_DECIMALS,
  USDC_SUFIX,
} from './useSpendableToken.constants'

// Utils
import { toNormalNumber } from 'utils/bigNumber'
import { refreshTwice } from 'utils/refreshTwice'

export const useSpendableToken = (): UseSpendableTokenReturnType => {
  const state: MetamaskState = useMetamaskContext()

  const [isLoading, setIsLoading] = useState(true)
  const [balance, setBalance] = useState(0)

  const [abi, address, decimals, sufix] = useMemo(() => {
    return state.isTestNetwork
      ? [FTM, TESTNET_USDC_ADDRESS, TESTNET_USDC_DECIMALS, TESTNET_USDC_SUFIX]
      : [fUSDC, USDC_ADDRESS, USDC_DECIMALS, USDC_SUFIX]
  }, [state.isTestNetwork])

  const interactions = useERC20(state, abi, address, decimals)

  const initializeParams = useCallback(async () => {
    if (state.currentAccount) {
      const balance = (await interactions.balanceOf(
        state.currentAccount
      )) as number

      setBalance(balance)
      setIsLoading(false)
    }
  }, [interactions.allowance, interactions.balanceOf, state.currentAccount])

  const initializeEvents = useCallback(
    (currentAccount: string) => {
      interactions.setEvent(
        'Transfer',
        (from: string, to: string, value: number) => {
          setBalance(
            (currentBalance) => currentBalance - toNormalNumber(value, decimals)
          )
        },
        [currentAccount]
      )

      interactions.setEvent(
        'Transfer',
        (from: string, to: string, value: number) => {
          setBalance(
            (currentBalance) => currentBalance + toNormalNumber(value, decimals)
          )
        },
        [null, currentAccount]
      )
    },
    [interactions.setEvent, setBalance]
  )

  useEffect(() => {
    initializeParams()
  }, [initializeParams])

  const refreshParams = useCallback(() => {
    refreshTwice(initializeParams)
  }, [initializeParams])

  // useEffect(() => {
  //   if (state.currentAccount) {
  //     initializeEvents(state.currentAccount)
  //   }

  //   return () => {
  //     if (state.currentAccount) {
  //       interactions.cleanEvents()
  //     }
  //   }
  // }, [initializeEvents, interactions.cleanEvents, state.currentAccount])

  return {
    ...interactions,
    refreshParams,
    address,
    sufix,
    isLoading,
    balance,
  }
}
