import styled from 'styled-components'

// Components
import { Icon } from 'components/icon'

export const SplashContainer = styled.div`
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
  background: var(--splash--background);
  padding: var(--size-large);
  margin-top: var(--size-large);
  border-radius: var(--border-radius-medium);
  justify-content: center;
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
`

export const ShadowIcon = styled(Icon)`
  font-size: 100px;
  margin-right: -120px;
  color: #0000002b;
  filter: blur(5px);
`

export const OriginalIcon = styled(Icon)`
  font-size: 100px;
  width: 200px;
  height: 200px;
`

export const SplashTitle = styled.h1`
  font-size: var(--font-heading-largest);
  font-weight: var(--font-weight-bold);
`

export const SplashSubtitle = styled.h2`
  font-size: var(--font-heading-default);
  font-weight: var(--font-weight-medium);
  margin-bottom: 0px;
`
