// Components
import { Footer } from 'components/footer'
import { Navbar } from 'components/navbar'
import { Router } from 'components/router'
import { ToastManager } from 'components/toastManager'

// Providers
import { ChangeThemeProvider } from 'providers/ChangeThemeProvider'
import { AppProviders } from 'providers/AppProviders'

// Styles
import { AppContainer, GlobalStyle, PageContainer } from 'app.styles'

const App = () => {
  return (
    <ChangeThemeProvider>
      <GlobalStyle />
      <AppProviders>
        <AppContainer>
          <Navbar />
          <PageContainer>
            <ToastManager />
            <Router />
            <Footer />
          </PageContainer>
        </AppContainer>
      </AppProviders>
    </ChangeThemeProvider>
  )
}

export default App
