import styled from 'styled-components'

// Components
import { Icon } from 'components/icon'
import { Pill } from 'components/pill/Pill'

export const UnderConstructionContainer = styled.div`
  margin: var(--size-extra-large) 0px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const UnderConstructionIcon = styled(Icon)`
  font-size: 200px;
`
export const UnderConstructionText = styled.div`
  font-size: 30px;
  margin-top: var(--size-medium);
  text-align: center;
`

export const ReturnContainer = styled(Pill)`
  margin: var(--size-medium) 0px;
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: var(--font-medium);
  border: solid 1px var(--neutral-lighter);
  background: var(--neutral-light);

  &:hover {
    background: var(--neutral-lighter);
  }

  &:active {
    background: var(--neutral-light);
  }

  &:focus {
    box-shadow: var(--focus-shadow);
  }

  span {
    margin-right: var(--size-small);
    font-size: var(--font-large);
  }
`
