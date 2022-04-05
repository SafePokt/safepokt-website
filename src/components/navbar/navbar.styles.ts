import styled, { css } from 'styled-components'

// Components
import { Button } from 'components/button'
import { Container } from 'components/container/Container'
import { Icon } from 'components/icon'
import { Link, NavLink } from 'react-router-dom'

export const StyledNavbar = styled.div`
  width: 100%;
  height: var(--top-bar-height);
  padding: var(--size-medium) 0px;
  display: flex;
  align-items: center;
  background: var(--top-bar-background);
  backdrop-filter: blur(var(--top-bar-blur));
  position: sticky;
  top: 0;
  z-index: 2;
`
export const NavbarContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

export const LogoText = styled.div`
  font-size: var(--font-heading-largest);
  font-weight: var(--font-weight-bold);

  background: -webkit-linear-gradient(45deg, #33c4e5, #de58ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: fit-content;

  @media (max-width: 576px) {
    display: none;
  }
`

const focusStyles = css`
  outline: none;
  border-radius: var(--border-radius-medium);
  transition: all var(--transition-medium);

  &:focus {
    box-shadow: var(--focus-shadow);
  }
`

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;

  ${focusStyles}
`

export const Logo = styled.img`
  height: 45px;
  margin-right: var(--size-small);
`

export const NavbarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: var(--transition-medium);

  &.active {
    color: var(--secondary-lighter);
  }

  &:hover {
    color: var(--secondary-light);
  }

  ${focusStyles}

  span {
    color: inherit;
    font-size: var(--icon-size-large);
    margin-right: var(--size-small);

    @media (max-width: 992px) {
      font-size: var(--icon-size-extra-large);
    }
  }
`

export const NavbarLinkText = styled.div`
  color: inherit;
  font-weight: var(--font-weight-semi-bold);

  @media (max-width: 992px) {
    display: none;
  }
`

export const NavbarLinks = styled.div`
  margin-left: var(--size-extra-large);
  display: flex;
  align-items: center;

  @media (max-width: 992px) {
    margin-left: var(--size-large);
  }

  @media (max-width: 576px) {
    margin-left: var(--size-small);
  }
`

export const ConnectButton = styled(Button)`
  border: var(--connect-button-border);
  background: var(--connect-button-background);

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        background: var(--connect-button-background-hover);
      }

      &:active {
        background: var(--connect-button-background);
      }
    `}
`
export const Attention = styled.div`
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-medium);
  font-weight: var(--font-weight-medium);
  font-size: var(--button-font-size);
  padding: var(--form-element-padding);
  background: var(--error);

  @media (max-width: 768px) {
    padding: var(--size-small);
  }
`

export const WarningIcon = styled(Icon)`
  font-size: var(--font-large);

  @media (max-width: 768px) {
    font-size: var(--font-small);
  }
`

export const WarningText = styled.div`
  margin-left: var(--size-small);

  @media (max-width: 768px) {
    display: none;
  }
`

export const ChangeNetworkButton = styled(Button)`
  @media (max-width: 768px) {
    font-size: var(--font-extra-small);
    padding: var(--size-small);
  }
`

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  min-width: 20px;

  & > * {
    margin-left: var(--size-medium);

    &:first-child {
      margin-left: 0px;
    }
  }
`
