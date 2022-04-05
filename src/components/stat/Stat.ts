import styled, { css } from 'styled-components'

// Components
import { HighlightedText } from 'components/highlightedText'

const commontFontStyles = css`
  font-size: var(--font-extra-large);
  font-weight: var(--font-weight-bold);
  margin-left: var(--size-extra-small);
  white-space: nowrap;
`

export const Stat = styled.div`
  ${commontFontStyles}
`

export const HighlightedStat = styled(HighlightedText)`
  ${commontFontStyles}
`
