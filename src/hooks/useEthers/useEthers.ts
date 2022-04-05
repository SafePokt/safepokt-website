/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'
import { ethers } from 'ethers'

/**
 * Hook that initializes the web3 provider using ethers.
 * @param metamaskProvider Metamask Provider.
 * @param isTargetChainConnected Whether we are connected to the target chain.
 * @param targetRPC Target RPC endpoint.
 * @param targetWS Target WS endpoint.
 * @returns ethers provider.
 */
export const useEthers = (
  metamaskProvider?: any,
  isTargetChainConnected?: boolean,
  targetRPC?: string,
  targetWS?: string
) => {
  const web3 = useMemo(() => {
    if (metamaskProvider && isTargetChainConnected) {
      return new ethers.providers.Web3Provider(metamaskProvider)
    }

    if (targetWS) {
      return new ethers.providers.WebSocketProvider(targetWS)
    }

    if (targetRPC) {
      return new ethers.providers.JsonRpcProvider(targetRPC)
    }
  }, [metamaskProvider, targetWS, isTargetChainConnected, targetRPC])

  return web3
}
