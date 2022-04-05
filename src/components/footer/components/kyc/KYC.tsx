// Components
import { CoinscopeLogo } from './CoinscopeLogo'

// Styles
import { CoinscapeText, KYCContainer } from './kyc.styles'

export const KYC = () => {
  return (
    <KYCContainer
      href={'https://www.coinscope.co/coin/safepokt-share/kyc'}
      target={'_blank'}
    >
      KYC by <CoinscopeLogo />
      <CoinscapeText>
        <span>COIN</span>
        <span>SCOPE</span>
      </CoinscapeText>
    </KYCContainer>
  )
}
