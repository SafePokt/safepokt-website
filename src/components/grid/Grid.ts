import styled, { css } from 'styled-components'

interface GridProps {
  breakpoints: {
    xs?: number
    s?: number
    m?: number
    l?: number
    xl?: number
    xll?: number
  }
  length?: number
}

const gridElementStyles = (cols?: number) =>
  cols !== undefined &&
  css`
    &:nth-child(1n) {
      margin-left: var(--size-medium);
      margin-top: var(--size-medium);
    }

    width: calc((100% - ${cols - 1} * var(--size-medium)) / ${cols});

    &:nth-child(${cols}n + 1),
    &:first-child {
      margin-left: 0px;
    }

    &:nth-child(-n + ${cols}) {
      margin-top: 0px;
    }
  `

export const Grid = styled.div<GridProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  ${({ breakpoints: { xs, s, m, l, xl, xll } }) => {
    return css`
      & > * {
        ${gridElementStyles(xs)}

        @media (min-width: 576px) {
          ${gridElementStyles(s)}
        }

        @media (min-width: 768px) {
          ${gridElementStyles(m)}
        }

        @media (min-width: 992px) {
          ${gridElementStyles(l)}
        }

        @media (min-width: 1200px) {
          ${gridElementStyles(xl)}
        }

        @media (min-width: 1400px) {
          ${gridElementStyles(xll)}
        }
      }
    `
  }}
`
