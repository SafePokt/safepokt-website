import styled from 'styled-components'

export const KYCContainer = styled.a`
  display: flex;
  align-items: center;
  padding: var(--size-medium);
  border-radius: var(--border-radius-pill);
  background: var(--neutral);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  font-size: var(--font-extra-small);
  border: var(--border);
  box-shadow: var(--depth-shadow-medium);
  height: var(--top-bar-item-height);
  margin-bottom: var(--size-large);
  opacity: 0.85;
  transition: var(--transition-medium);
  outline: none;
  cursor: pointer;

  svg {
    margin-left: var(--size-minuscule);
  }

  &:hover {
    background: var(--neutral-light);
  }

  &:active {
    background: var(--neutral);
  }

  &:focus {
    box-shadow: var(--focus-shadow);
  }
`
export const CoinscapeText = styled.div`
  font-size: var(--font-small);

  & > span {
    :last-child {
      color: rgb(31, 199, 212);
      font-weight: 300;
    }
  }
`
