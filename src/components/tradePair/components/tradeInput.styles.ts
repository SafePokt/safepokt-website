import styled, { css } from 'styled-components'

// Components
import { Pill } from 'components/pill'

interface TradePairInput {
  isFocused: boolean
  disabled?: boolean
}

export const TradePairInputContainer = styled.div<TradePairInput>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 60px;
  background: var(--neutral);
  border-radius: var(--border-radius-large);
  border: solid 1px var(--neutral-light);
  padding: var(--size-small);
  padding-left: var(--size-medium);
  color: inherit;
  transition: all var(--transition-medium);

  ${({ disabled, isFocused }) =>
    disabled
      ? css`
          color: var(--disabled);
        `
      : css`
          &:hover {
            border: solid 1px var(--neutral-lighter);
          }

          &:active {
            background: var(--neutral-dark);
          }

          ${isFocused &&
          css`
            box-shadow: var(--focus-shadow);
          `}
        `}
`

export const TradePairInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  font-weight: var(--font-weight-semi-bold);
  font-size: var(--font-large);
  color: inherit;
`

export const TradePairCurrencyPill = styled(Pill)`
  color: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: var(--size-extra-small) var(--size-small);

  img {
    margin-right: var(--size-small);
  }
`
