import { useMemo } from 'react'

// Contexts
import { useMetamaskContext } from 'providers/MetaMaskProvider'

export const useReady = () => {
  const { isUserConnected, isMetamaskLoading, isChainConnected } =
    useMetamaskContext()

  const isAllReady = useMemo(
    () => !isMetamaskLoading && isChainConnected && isUserConnected,
    [isMetamaskLoading, isChainConnected, isUserConnected]
  )

  return isAllReady
}
