/* eslint-disable @typescript-eslint/no-explicit-any */
/* I would rather not have "any" types but metamask typescript support looks to be limited.*/

import { useCallback, useEffect, useMemo, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'

// Types
import {
  ChainParams,
  MetamaskInternalState,
  MetamaskState,
} from './useMetamask.types'

// Constants
import {
  METAMASK_INITIAL_STATE,
  PRODUCTION_NETWORK_PARAMS,
  TESTNET_NETWORK_PARAMS,
  USER_DENIED_CONNECTION_TOAST,
  METAMASK_NOT_FOUND_TOAST,
} from './useMetamask.constants'

// Hooks
import { useToasts } from 'providers/ToastProvider'
import { useEthers } from 'hooks/useEthers'

export const useMetamask = (): MetamaskState => {
  const [metamaskState, setMetamaskState] = useState<MetamaskInternalState>(
    METAMASK_INITIAL_STATE
  )
  const [provider, setProvider] = useState<any>(null)
  const { newToast } = useToasts()

  const isTestNetwork = useMemo(() => {
    return process.env.NODE_ENV !== 'production'
  }, [])

  const targetNetwork = useMemo(
    () => (isTestNetwork ? TESTNET_NETWORK_PARAMS : PRODUCTION_NETWORK_PARAMS),
    [isTestNetwork]
  )

  const isCorrectChain = useCallback(
    (chainId: string) => chainId == targetNetwork.chainParams.chainId,
    [targetNetwork]
  )

  // TODO: Error Handling.
  const swapNetwork = useCallback(
    async (ethereum: any, chainParams: ChainParams) => {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainParams.chainId }],
        })
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [chainParams],
            })
          } catch (addError) {
            console.error(addError)
          }
        } else {
          console.error(switchError)
        }
      }
    },
    []
  )

  const swapToProd = useCallback(() => {
    return swapNetwork(provider, targetNetwork.chainParams)
  }, [swapNetwork, provider, targetNetwork])

  const setState = useCallback(
    <T>(key: keyof MetamaskInternalState, newValue: T) => {
      setMetamaskState((current) => ({ ...current, [key]: newValue }))
    },
    []
  )

  const getAccounts = useCallback((ethereum: any) => {
    return ethereum
      .request({ method: 'eth_accounts' })
      .then(handleAccountsChanged)
      .catch((err: any) => {
        console.error(err)
      })
  }, [])

  const getChainId = useCallback(async (ethereum: any) => {
    return ethereum
      .request({ method: 'eth_chainId' })
      .then(handleChainChanged)
      .catch((err: any) => {
        console.error(err)
      })
  }, [])

  const handleConnect = useCallback(
    (ethereum: any, chainId: string) => {
      setState(
        'isChainConnected',
        ethereum.isConnected() && isCorrectChain(chainId)
      )
    },
    [setState, targetNetwork]
  )

  const handleDisconnect = useCallback(() => {
    setState('isChainConnected', false)
  }, [setState])

  const handleAccountsChanged = useCallback(
    (accounts: unknown[]) => {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        setState('isUserConnected', false)
        setState('isMetamaskLoading', false)
        console.log('Please connect to MetaMask.')
      } else {
        const newAddress = ethers.utils.getAddress(accounts[0] as string)
        if (newAddress !== metamaskState.currentAccount) {
          setState('currentAccount', newAddress)
          setState('isUserConnected', true)
        }
      }
    },
    [setState]
  )

  const handleChainChanged = useCallback((chainId) => {
    setState('chainId', chainId)
    setState('isChainConnected', isCorrectChain(chainId))

    return chainId
  }, [])

  const startApp = useCallback(
    async (provider: any) => {
      // Handle provider
      if (provider !== window.ethereum) {
        throw 'Do you have multiple wallets installed?'
      }
      setProvider(provider)

      // Handle accounts
      await getAccounts(provider)
      provider.on('accountsChanged', handleAccountsChanged)

      // Handle chain
      const chainId = await getChainId(provider)
      provider.on('chainChanged', handleChainChanged)

      // Handle connection
      handleConnect(provider, chainId)
      provider.on('connect', () => handleConnect(provider, chainId))
      provider.on('disconnect', handleDisconnect)

      setState('isMetamaskLoading', false)
      setState('hasMetamask', true)
    },
    [setState]
  )

  const cleanUp = useCallback(
    (provider: any) => {
      if (provider) {
        provider.removeListener('accountsChanged', handleAccountsChanged)
        provider.removeListener('chainChanged', handleChainChanged)
      }
    },
    [setState]
  )

  useEffect(() => {
    const getProvider = async () => {
      try {
        const provider = await detectEthereumProvider()
        if (provider) {
          console.log('Ethereum successfully detected!')
          startApp(provider)
        } else {
          newToast(METAMASK_NOT_FOUND_TOAST, undefined)
          throw 'Provider not detected, please install MetaMask!'
        }
      } catch (error) {
        console.error('Error connecting to your metamask wallet.', error)
        setState('isMetamaskLoading', false)
      }
    }

    getProvider()

    return () => cleanUp(window.ethereum)
  }, [])

  const connect = useCallback(async () => {
    if (provider) {
      provider
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((err: any) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            newToast(USER_DENIED_CONNECTION_TOAST)
            console.log('Please connect to MetaMask.')
          } else {
            console.error(err)
          }
        })
    }
  }, [provider])

  const ethersProvider = useEthers(
    provider,
    metamaskState.isChainConnected,
    targetNetwork.chainParams.rpcUrls[0],
    targetNetwork.wsurl
  )

  return {
    ...metamaskState,
    connect,
    swapToProd,
    ethersProvider,
    provider,
    targetNetwork,
    isTestNetwork,
  }
}
