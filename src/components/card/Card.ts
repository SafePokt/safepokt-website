import styled from 'styled-components'

export const Card = styled.div`
  border-radius: var(--border-radius-medium);
  border: var(--card-border);
  background: var(--card-background);
  padding: var(--size-medium);
  box-shadow: var(--depth-shadow-small);
  z-index: 0;
  overflow: hidden;

  &:hover {
    z-index: 1;
  }
`
