import styled, { css } from 'styled-components'

interface ThumbPrarameters {
  disabled?: boolean
}

export const Thumb = styled.div<ThumbPrarameters>`
  height: 20px;
  width: 20px;
  background: white;
  border-radius: var(--border-radius-pill);
  outline: none;
  box-shadow: var(--depth-shadow-large);

  ${({ disabled }) =>
    disabled
      ? css`
          background: var(--disabled);
        `
      : css`
          &:active {
            background: rgb(220, 220, 220);
          }

          &:focus {
            box-shadow: var(--focus-shadow), var(--depth-shadow-large);
          }
        `}
`
export const Track = styled.div`
  height: 8px;
  width: 100%;
  border-radius: var(--border-radius-pill);
`
