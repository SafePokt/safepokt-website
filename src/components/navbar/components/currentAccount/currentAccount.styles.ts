import styled from 'styled-components'

// Components
import { HighlightedText } from 'components/highlightedText'
import { Skeleton } from 'components/skeleton/Skeleton'

export const AccountCountainer = styled.button`
  display: flex;
  align-items: center;
  padding: var(--size-minuscule);
  border-radius: var(--border-radius-pill);
  background: var(--neutral);
  font-weight: var(--font-weight-medium);
  border: var(--border);
  box-shadow: var(--depth-shadow-medium);
  height: var(--top-bar-item-height);
  cursor: pointer;
  transition: var(--transition-medium);

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

export const Balance = styled(HighlightedText)`
  font-size: var(--font-small);
  font-weight: var(--font-weight-semi-bold);
  margin-right: var(--size-small);
  padding-left: var(--size-medium);

  ${Skeleton} {
    width: 35px;
  }

  @media (max-width: 768px) {
    margin: 0px;
    padding: var(--size-small);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
