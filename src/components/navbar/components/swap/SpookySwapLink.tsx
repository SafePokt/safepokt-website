import { SpookySwapContainer, SpookySwapText } from './spookySwapLink.styles'
import { SpookySwapLogo } from './SpookySwapLogo'

// Constants
import { SPOOKY_SWAP_LINK } from 'components/navbar/navbar.constants'

export const SpookySwapLink = () => {
  return (
    <SpookySwapContainer href={SPOOKY_SWAP_LINK} target={'_blank'}>
      <SpookySwapText>Bridge tokens </SpookySwapText> <SpookySwapLogo />
    </SpookySwapContainer>
  )
}
