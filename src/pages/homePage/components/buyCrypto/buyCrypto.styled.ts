import styled, { css } from 'styled-components'

// Components
import { Icon } from 'components/icon'
import { Button } from 'components/button'
import { Skeleton } from 'components/skeleton'
import { TitledCard } from 'components/titledCard'

export const BuyCard = styled(TitledCard)`
  display: flex;
  flex-direction: column;
`

export const BuyButton = styled(Button)`
  margin-top: var(--size-medium);
  align-self: end;
  width: 100%;
`

export const BuyForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const ButtonContainer = styled.div``

interface ExchangeRatePrams {
  disabled?: boolean
}

export const ExchangeRate = styled.div<ExchangeRatePrams>`
  margin-top: var(--size-medium);
  font-size: var(--font-extra-small);
  font-weight: bold;
  color: inherit;
  display: flex;
  align-items: center;

  ${Skeleton} {
    width: 12px;
    margin: 0px var(--size-small);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--disabled);
    `}
`

export const RateIcon = styled(Icon).attrs(() => ({
  icon: 'sync',
}))`
  margin-right: var(--size-small);
  color: var(--disabled);
`
