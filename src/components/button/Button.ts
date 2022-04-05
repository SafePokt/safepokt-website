import styled, { css } from 'styled-components'

export const Button = styled.button`
  outline: none;
  border: var(--button-border);
  border-radius: var(--border-radius-medium);
  background: var(--button-background);
  box-shadow: var(--depth-shadow-medium);
  font-size: var(--button-font-size);
  font-weight: var(--font-weight-medium);
  padding: var(--form-element-padding);
  letter-spacing: var(--button-letter-spacing);
  transition: all var(--transition-medium);

  cursor: pointer;

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        background: var(--button-background-hover);
      }

      &:active {
        background: var(--button-background);
      }

      &:focus {
        box-shadow: var(--focus-shadow);
      }
    `}

  &:disabled {
    cursor: not-allowed;
    background: var(--button-background-disabled);
    color: var(--button-font-color-disabled);
  }
`
