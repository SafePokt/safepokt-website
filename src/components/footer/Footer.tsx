// Components
import { Links } from './components'
import { Disclaimer } from './components/disclaimer'
import { KYC } from './components/kyc/KYC'

// Styles
import { FooterContainer } from './footer.styles'

export const Footer = () => {
  return (
    <FooterContainer>
      <Links />
      <KYC />
      <Disclaimer />
    </FooterContainer>
  )
}
