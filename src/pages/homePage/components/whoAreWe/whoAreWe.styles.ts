import styled, { css } from 'styled-components'

// Components
import { Card } from 'components/card'
import { Icon } from 'components/icon'
import { Pill } from 'components/pill'

export interface OpenableProps {
  isOpen: boolean
}

export const WhoAreWeCard = styled(Card)<OpenableProps>`
  margin-top: var(--size-large);
  transition: all ease 0.5s;
  max-height: 52px;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  ${({ isOpen }) =>
    isOpen &&
    css`
      max-height: 300px;

      @media (max-width: 768px) {
        max-height: 600px;
      }

      @media (max-width: 576px) {
        max-height: 800px;
      }

      @media (max-width: 350px) {
        max-height: 1100px;
      }
    `}
`

export const Title = styled.div`
  font-size: var(--font-heading-smallest);
  font-weight: var(--font-weight-bold);
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
`

export const TextContent = styled.div`
  margin-top: var(--size-medium);
  line-height: 26px;

  & > *:last-child {
    margin-top: var(--size-small);
  }
`

export const ArrowIcon = styled(Icon).attrs(() => ({
  icon: 'expand_more',
}))<OpenableProps>`
  font-size: var(--icon-size-large);
  transform: rotate(0deg);
  transition: all var(--transition-medium);
  margin-left: var(--size-small);
  color: var(--secondary-light);

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `}
`

export const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PillsContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
`

export const LinkText = styled.div`
  font-weight: var(--font-weight-semi-bold);
`

export const PillWrapper = styled.a`
  margin-top: var(--size-medium);
  cursor: pointer;
  text-decoration: none;
  border-radius: var(--border-radius-pill);
  margin-right: var(--size-medium);

  &:focus {
    box-shadow: var(--focus-shadow);
  }
`

export const LinkPill = styled(Pill)`
  display: flex;
  align-items: center;
  background: var(--neutral);
  border: solid 1px var(--neutral-light);
  width: fit-content;
  padding: var(--size-extra-small) var(--size-small);
  margin: 0px;
  font-size: var(--font-small);

  &:hover {
    background: var(--neutral-light);
  }

  &:active {
    background: var(--neutral);
  }

  svg {
    height: 24px;
    width: 24px;
    margin-left: var(--size-small);
    fill: var(--font-color);
  }
`
