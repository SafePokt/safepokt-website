// Providers
import { BrowserRouter } from 'react-router-dom'
import { MetaMaskProvider } from './MetaMaskProvider'
import { SafePOKTProvider } from './SafePOKTProvider'
import { SpendableTokenProvider } from './SpendableTokenProvider'
import { ToastProvider } from './ToastProvider'

interface AppProvidersProps {
  children: React.ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <MetaMaskProvider>
          <SpendableTokenProvider>
            <SafePOKTProvider> {children}</SafePOKTProvider>
          </SpendableTokenProvider>
        </MetaMaskProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
