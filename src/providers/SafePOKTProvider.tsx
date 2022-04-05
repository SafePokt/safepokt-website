import React, { useContext } from 'react'

// Types
import { UseSafePoktReturnType } from 'hooks/useSafePOKT/useSafePOKT.types'

// Constants
import { useSafePoktDefaultReturn } from 'hooks/useSafePOKT/useSafePOKT.constants'

// Context
import { useMetamaskContext } from './MetaMaskProvider'

// Hooks
import { useSafePOKT } from 'hooks/useSafePOKT/useSafePOKT'

const SafePOKTContext = React.createContext<UseSafePoktReturnType>(
  useSafePoktDefaultReturn
)

interface SafePOKTProviderProps {
  children: React.ReactNode
}

export const SafePOKTProvider = ({ children }: SafePOKTProviderProps) => {
  const state = useMetamaskContext()
  const SafePOKTState = useSafePOKT(state)

  return (
    <SafePOKTContext.Provider value={SafePOKTState}>
      {children}
    </SafePOKTContext.Provider>
  )
}

export const useSafePOKTContext = () => useContext(SafePOKTContext)
