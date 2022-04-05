import 'styled-components'

interface BasicColor {
  light: string
  base: string
  dark: string
  baseTransparent: string
}

interface ExtendedColor extends BasicColor {
  lighter: string
  lightest: string
  darker: string
  darkest: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      font: {
        default: BasicColor
      }
      background: { gradient: { accent: string; neutral: string } }
      neutrals: ExtendedColor
      primary: ExtendedColor
      secondary: ExtendedColor
      error: BasicColor
      success: BasicColor
      warning: BasicColor
    }
  }
}
