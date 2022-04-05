import { Icon } from 'components/icon'
import { animated } from 'react-spring'
import styled, { css } from 'styled-components'
import { INFO_WIDTH } from './info.constants'

export const IconInfo = styled(Icon).attrs(() => ({ icon: 'info' }))``

export const IconContainer = styled.div`
  margin: 0px var(--size-small);
  display: flex;
  justify-content: center;
  span {
    color: var(--neutral-lightest);
  }
`

export const FullScreenContainer = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`
interface TextContainerProps {
  hoverPosition: [number, number]
  width?: number
}

export const TextContainer = styled.div<TextContainerProps>`
  position: absolute;
  display: block;
  color: var(--font-color) !important;
  font-weight: var(--font-weight-regular);
  box-shadow: var(--depth-shadow-medium);
  font-size: var(--font-small);
  line-height: var(--line-large);
  background: var(--neutral-light);
  padding: var(--size-small);
  border: solid 1px var(--neutral-lighter);
  border-radius: var(--border-radius-medium);
  top: var(--size-extra-large);
  text-transform: none;
  z-index: 1;

  ${({ hoverPosition }) => css`
    left: ${hoverPosition[0]}px;
    top: ${hoverPosition[1]}px;
  `};

  ${({ width }) => css`
    width: ${width ?? INFO_WIDTH}px;
  `};
`
