import styled from 'styled-components'

export const Pill = styled.div`
  padding: calc(var(--size-small) - 1px);
  border-radius: var(--border-radius-pill);
  background: var(--neutral-lighter);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-small);
  box-shadow: var(--depth-shadow-small);
  border: solid 1px var(--neutral-lightest);
  outline: none;
  text-transform: none;
  margin-left: var(--size-small);
  transition: all var(--transition-medium);
`
