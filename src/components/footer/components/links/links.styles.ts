import styled from 'styled-components'

export const LinkAnchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  border-radius: var(--border-radius-medium);
  outline: none;
  border: none;
  transition: all var(--transition-medium);

  &:focus {
    box-shadow: var(--focus-shadow);
  }
`

export const LinksRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: var(--size-large);

  svg {
    height: 25px;
    width: 25px;
    fill: var(--font-color);
  }
`

export const InterestLink = styled.img`
  margin: var(--size-small);
  height: 42px;
  width: 42px;
`
