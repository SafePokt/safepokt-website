import styled from 'styled-components'

// Components
import { Card } from 'components/card'
import { Grid } from 'components/grid'

// Styles
import { BuyCard } from './components/buyCrypto/buyCrypto.styled'
import { OwnedCard } from './components/ownedCrypto/ownedCrypto.styled'

export const CardGrid = styled(Grid)`
  margin-top: var(--size-large);
`

export const CardDuo = styled.div`
  margin-top: var(--size-large);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;

  ${Card} {
    width: 100%;

    &:first-child {
      margin-top: var(--size-medium);
    }
  }

  @media (min-width: 1200px) {
    flex-wrap: nowrap;
    flex-direction: row;

    ${OwnedCard} {
      width: 70%;

      &:first-child {
        margin-top: 0px;
        margin-right: var(--size-medium);
      }
    }

    ${BuyCard} {
      width: 30%;
    }
  }
`

export const IconStatCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--icon-card-background);
  width: var(--icon-card-size);
  min-width: var(--icon-card-size);
  height: var(--icon-card-size);
  background-color: var(--icon-card-background);
  border-radius: var(--border-radius-medium);

  .material-icons {
    font-size: var(--icon-card-font-size);
  }
`
