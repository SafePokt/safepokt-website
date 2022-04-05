import React, { useContext } from 'react'

// Types
import { UseSpendableTokenReturnType } from 'hooks/useSpendableToken/useSpendableToken.types'

// Constants
import { useSpendableTokenDefaultReturn } from 'hooks/useSpendableToken/useSpendableToken.constants'

// Hooks
import { useSpendableToken } from 'hooks/useSpendableToken/useSpendableToken'

const SpendableTokenContext = React.createContext<UseSpendableTokenReturnType>(
  useSpendableTokenDefaultReturn
)

interface SpendableTokenProviderProps {
  children: React.ReactNode
}

export const SpendableTokenProvider = ({
  children,
}: SpendableTokenProviderProps) => {
  const SpendableTokenState = useSpendableToken()

  return (
    <SpendableTokenContext.Provider value={SpendableTokenState}>
      {children}
    </SpendableTokenContext.Provider>
  )
}

export const useSpendableTokenContext = () => useContext(SpendableTokenContext)
