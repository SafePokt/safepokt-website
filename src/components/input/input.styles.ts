import styled, { css } from 'styled-components'

interface StyledInputProps {
  hasUnit?: boolean
}

// TODO: Fix hover color.
export const StyledInput = styled.input<StyledInputProps>`
  background: var(--input-background);
  padding: var(--form-element-padding);
  border-radius: var(--input-border-radius);
  outline: none;
  border: var(--input-border);
  box-shadow: var(--input-shadow);
  width: 100%;

  transition: all var(--transition-medium);
  transition-property: border, background;

  ${({ hasUnit }) =>
    hasUnit &&
    css`
      padding-right: 72px;
    `}

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        border: solid 1px rgb(106 109 124);
      }

      &:active {
        background: var(--input-background-active);
      }

      &:focus {
        box-shadow: var(--focus-shadow);
      }
    `}
  
  &:disabled {
    cursor: not-allowed;
    color: var(--input-disabled-font-color);
  }
`

export const InputContainer = styled.div`
  position: relative;
  display: flex;
`

interface UnitProps {
  disabled?: boolean
}

export const Unit = styled.div<UnitProps>`
  margin-right: var(--size-medium);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  top: 0;
  height: 100%;
  pointer-events: none;

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--disabled);
    `}
`
