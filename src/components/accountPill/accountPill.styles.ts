import styled, { css } from 'styled-components'

// Components
import { Pill } from 'components/pill/Pill'

interface AccountPillContainerProps {
  hiddeable?: boolean
}

export const AccountPillContainer = styled(Pill)<AccountPillContainerProps>`
  ${({ hiddeable }) =>
    hiddeable &&
    css`
      @media (max-width: 768px) {
        display: none;
      }
    `}
`
