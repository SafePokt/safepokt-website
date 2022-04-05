import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`
export const Skeleton = styled.div`
  width: 100%;
  min-width: 20px;
  height: var(--skeleton-height);
  background-color: var(--neutral-lightest);
  animation: var(--skeleton-animation-speed) ${animation} infinite alternate
    ease-in-out;
  border-radius: var(--border-radius-medium);
`
