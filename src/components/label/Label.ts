import styled, { css } from 'styled-components'

interface LabelProps {
  disabled?: boolean
}

export const Label = styled.label<LabelProps>`
  margin-bottom: var(--size-medium);

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--disabled);
    `}
`
