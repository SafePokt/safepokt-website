import React, { useContext } from 'react'

// Hooks
import {
  MetamaskState,
  METAMASK_INITIAL_STATE,
  useMetamask,
} from 'hooks/useMetamask'

const MetaMaskContext = React.createContext<MetamaskState>(
  METAMASK_INITIAL_STATE
)

interface MetaMaskProviderProps {
  children: React.ReactNode
}

export const MetaMaskProvider = ({ children }: MetaMaskProviderProps) => {
  const metamaskState = useMetamask()

  return (
    <MetaMaskContext.Provider value={metamaskState}>
      {children}
    </MetaMaskContext.Provider>
  )
}

export const useMetamaskContext = () => useContext(MetaMaskContext)
