import styled from 'styled-components'
import { CoinImage } from './coinIcon.types'

interface CoinIconProps {
  coinImage: CoinImage
}

export const CoinIcon = styled.img.attrs<CoinIconProps>(({ coinImage }) => ({
  src: `/coins/${coinImage}.png`,
  alt: coinImage,
  title: coinImage,
}))<CoinIconProps>`
  height: 24px;
  box-shadow: var(--depth-shadow-small);
  border-radius: var(--border-radius-rounded);
`
