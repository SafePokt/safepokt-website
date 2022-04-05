/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react'
import { Contract, ContractInterface, ethers } from 'ethers'

// Types
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { MetamaskState } from 'hooks/useMetamask/useMetamask.types'

/**
 * Hook to handle contract initialization and interaction.
 * @param state Metamask State.
 * @param abi Contract abi.
 * @param contractAddress Contract address.
 */
export const useContract = (
  state: MetamaskState,
  abi: ContractInterface,
  contractAddress?: string
) => {
  const contract = useRef<Contract | null>(null)

  /**
   * Cleans all the event listeners of the contract.
   */
  const cleanEvents = useCallback(() => {
    contract.current?.removeAllListeners()
  }, [])

  /**
   * Initializes contract with the current provider.
   */
  const initialize = useCallback(() => {
    if (state.ethersProvider && contractAddress) {
      let signer: ethers.providers.JsonRpcSigner | null = null

      if (
        state.ethersProvider instanceof ethers.providers.Web3Provider &&
        state.currentAccount
      ) {
        signer = state.ethersProvider.getSigner(state.currentAccount)
      }

      contract.current = new Contract(
        contractAddress,
        abi,
        signer ?? state.ethersProvider
      )
    }
  }, [state.ethersProvider, state.currentAccount, contractAddress, contract])

  /**
   * Cleans event listeners and removes the contract instance when either the provider or the currentAccount changes.
   */
  useEffect(() => {
    cleanEvents()
    contract.current = null
  }, [state.ethersProvider, state.currentAccount])

  /**
   * Wrapper that handles contract initialization.
   */
  const callWrapper = useCallback(
    (callback: (contract: Contract) => Promise<unknown>) => {
      return new Promise<unknown>((resolve, reject) => {
        if (!contract.current) {
          initialize()
        }
        if (contract.current) {
          callback(contract.current)
            .then((response) => {
              resolve(response)
            })
            .catch((error: Error) => reject(error))
        } else {
          reject(new Error('Contract or provider not yet initialized.'))
        }
      })
    },
    [contract, initialize]
  )

  /**
   * Helper function to get smart contract info.
   * @param methodName Name of the method.
   * @param methodParams Params of the method.
   * @returns Whatever you asked for.
   */
  const callGetter = useCallback(
    async <T extends Array<unknown>>(methodName: string, methodParams: T) => {
      return callWrapper((contract) => {
        return contract[methodName](...methodParams)
      }) as Promise<unknown>
    },
    [contract, callWrapper]
  )

  /**
   * Helper function to call smart contract write methods.
   * @param methodName Name of the method.
   * @param methodParams Params of the method.
   * @returns Transaciton Response.
   */
  const callSetter = useCallback(
    async <T extends Array<unknown>>(
      methodName: string,
      methodParams: T
    ): Promise<TransactionResponse> => {
      return (
        callWrapper((contract) =>
          contract[methodName](...methodParams)
        ) as Promise<TransactionResponse>
      ).then(async (transaction) => {
        await transaction.wait()
        return transaction
      })
    },
    [contract, callWrapper, state.currentAccount]
  )

  /**
   * Sets listener to the given event with an specific callback and filters.
   * @param eventName Name of the event.
   * @param callback Callback that will be executed when the event is fired.
   * @param filters Event filters as an array, matching the order of the event arguments.
   */
  const setEvent = useCallback(
    (
      eventName: string,
      callback: (...args: any[]) => void,
      filters?: unknown[]
    ) => {
      if (!contract.current) {
        initialize()
      }
      if (contract.current) {
        if (filters) {
          const filteredEvent = contract.current.filters[eventName](...filters)

          contract.current.on(filteredEvent, callback)
        } else {
          contract.current.on(eventName, callback)
        }
      }
    },
    [contract]
  )

  return { callGetter, callSetter, setEvent, cleanEvents }
}
