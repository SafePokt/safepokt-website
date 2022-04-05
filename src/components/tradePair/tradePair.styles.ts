import styled from 'styled-components'

// Components
import { Icon } from 'components/icon'

export const TradePairContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const TradePairSeparator = styled.div`
  position: relative;
  width: 100%;
  height: var(--size-small);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TradePairSeparatorIcon = styled(Icon).attrs(() => ({
  icon: 'arrow_downward',
}))`
  position: relative;
  background: var(--neutral);
  padding: var(--size-extra-small);
  border-radius: var(--border-radius-medium);
  font-size: var(--font-small);
  box-shadow: 0px 0px 0px 3px var(--neutral-dark);
`
