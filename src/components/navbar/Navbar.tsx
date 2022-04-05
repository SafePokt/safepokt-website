// Components
import { Icon } from 'components/icon'
import { CurrentAccount } from './components'
import { SpookySwapLink } from './components/swap/SpookySwapLink'

// Constants
import { NAVIGATION_LINKS } from './navbar.constants'

// Contexts
import { useMetamaskContext } from 'providers/MetaMaskProvider'
import { useSpendableTokenContext } from 'providers/SpendableTokenProvider'

// Styles
import {
  Attention,
  ChangeNetworkButton,
  ConnectButton,
  LeftSide,
  Logo,
  LogoContainer,
  LogoText,
  NavbarContainer,
  NavbarLink,
  NavbarLinks,
  NavbarLinkText,
  RightSide,
  StyledNavbar,
  WarningIcon,
  WarningText,
} from './navbar.styles'

export const Navbar = () => {
  const state = useMetamaskContext()

  const {
    isUserConnected,
    isChainConnected,
    isMetamaskLoading,
    currentAccount,
    targetNetwork,
    swapToProd,
    connect,
    hasMetamask,
  } = state

  const { balance, isLoading, sufix } = useSpendableTokenContext()

  return (
    <StyledNavbar>
      <NavbarContainer>
        <LeftSide>
          <LogoContainer to={'/'}>
            <Logo title='SafePOKT' src={'/logo.png'} />
            <LogoText>SafePOKT</LogoText>
          </LogoContainer>
          <NavbarLinks>
            {NAVIGATION_LINKS.map(({ name, url, icon }) => (
              <NavbarLink to={url} key={url}>
                <Icon icon={icon} />
                <NavbarLinkText>{name}</NavbarLinkText>
              </NavbarLink>
            ))}
          </NavbarLinks>
        </LeftSide>

        <RightSide>
          {isUserConnected && currentAccount ? (
            isChainConnected ? (
              <>
                {!isLoading && balance === 0 && <SpookySwapLink />}
                <CurrentAccount
                  account={currentAccount}
                  balance={balance}
                  currency={sufix}
                  isLoading={isLoading}
                />
              </>
            ) : (
              <>
                <Attention>
                  <WarningIcon icon='error' />
                  <WarningText>Wrong Network</WarningText>
                </Attention>
                <ChangeNetworkButton onClick={swapToProd}>
                  Change to {targetNetwork?.chainParams.chainName}
                </ChangeNetworkButton>
              </>
            )
          ) : (
            <ConnectButton
              disabled={isMetamaskLoading || !hasMetamask}
              onClick={() => connect && connect()}
            >
              Connect
            </ConnectButton>
          )}
          {/* <Settings /> */}
        </RightSide>
      </NavbarContainer>
    </StyledNavbar>
  )
}
