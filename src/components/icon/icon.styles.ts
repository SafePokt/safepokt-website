import styled, { css } from 'styled-components'

interface StyledIconProps {
  size?: number
}

export const StyledIcon = styled.span<StyledIconProps>`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size }) => css`
    font-size: ${size ? `${size}px` : 'var(--icon-size-default)'};
  `}
  // As per: https://github.com/google/material-design-icons/issues/648
    transform: rotate(0.03deg);
`
