import styled, { css } from 'styled-components'

import { Label } from 'components/label'
import { Pill } from 'components/pill/Pill'
import { Skeleton } from 'components/skeleton/Skeleton'

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  ${Skeleton} {
    width: 60px;
  }
`
interface LabelRowProps {
  isHighlighted?: boolean
}

export const LabelRow = styled.div<LabelRowProps>`
  display: flex;
  width: 100%;

  ${Label} {
    ${({ isHighlighted }) =>
      isHighlighted
        ? css`
            font-size: var(--font-medium);
          `
        : css`
            font-size: var(--font-small);
          `}
  }

  span {
    margin-bottom: var(--size-medium);
  }
`
export const Unit = styled.div`
  font-size: var(--font-small);
  font-weight: var(--font-weight-medium);
`

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
export const StatValueRow = styled.div`
  display: flex;
  align-items: center;
`

export const TokenImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-left: 0px;
  margin-right: var(--size-medium);

  img {
    height: 28px;
  }
`

export const TokenPill = styled(Pill)`
  display: flex;
  align-items: center;
  padding: var(--size-minuscule) var(--size-small);

  img {
    margin-right: var(--size-small);
    height: 28px;
  }
`

export const ExtraValue = styled.div`
  font-size: var(--font-extra-small);
  margin-left: var(--size-medium);
`
