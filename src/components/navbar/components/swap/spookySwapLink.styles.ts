import styled from 'styled-components'

export const SpookySwapContainer = styled.a`
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-pill);
  background-color: var(--neutral-light);
  padding: var(--size-minuscule) var(--size-medium);
  border: solid 1px var(--neutral-lighter);
  text-decoration: none;
  height: var(--top-bar-item-height);
  cursor: pointer;

  &:hover {
    background-color: var(--neutral-lighter);
  }

  &:active {
    background-color: var(--neutral-light);
  }

  &:focus {
    box-shadow: var(--focus-shadow);
  }
`
export const SpookySwapText = styled.div`
  font-size: var(--font-small);
  margin-right: var(--size-small);
  font-weight: var(--font-weight-bold);

  @media (max-width: 992px) {
    display: none;
  }
`
