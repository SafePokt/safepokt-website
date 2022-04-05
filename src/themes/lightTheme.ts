import { DefaultTheme } from 'styled-components'

const black = 'rgb(30,30,30)'

// TODO: Implement light theme.
export const lightTheme: DefaultTheme = {
  colors: {
    font: {
      default: {
        light: '',
        base: 'rgb(220,220,220)',
        dark: '',
        baseTransparent: '',
      },
    },
    background: { gradient: { accent: '#00328f', neutral: '#111111' } },
    neutrals: {
      lightest: '',
      lighter: 'rgb(55 57 65)',
      light: 'rgb(42 45 50)',
      base: 'rgb(36, 38, 44)',
      dark: 'rgb(25, 27, 31)',
      darker: black,
      darkest: '',
      baseTransparent: '',
    },
    primary: {
      lightest: '',
      lighter: '',
      light: '#4fa6f5',
      base: '#1d8aed',
      dark: '#1b65a9',
      darker: '#0b3458',
      darkest: '',
      baseTransparent: '',
    },
    secondary: {
      lightest: '',
      lighter: '',
      light: '#e261eb',
      base: '#ba00c7',
      dark: '#6d54d3',
      darker: '#392b6e',
      darkest: '',
      baseTransparent: '',
    },
    success: {
      light: '',
      base: '#b90505',
      dark: '',
      baseTransparent: '',
    },
    warning: {
      light: '',
      base: '#b90505',
      dark: '',
      baseTransparent: '',
    },
    error: {
      light: '',
      base: '#b90505',
      dark: '',
      baseTransparent: '',
    },
  },
}
