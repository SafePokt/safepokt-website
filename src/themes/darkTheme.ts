import { DefaultTheme } from 'styled-components'

const black = 'rgb(15 16 18);'

export const darkTheme: DefaultTheme = {
  colors: {
    font: {
      default: {
        light: '',
        base: 'rgb(220,220,220)',
        dark: 'rgb(141 141 141)',
        baseTransparent: '',
      },
    },
    background: { gradient: { accent: '#00328f', neutral: '#111111' } },
    neutrals: {
      lightest: '#3e4148',
      lighter: 'rgb(55 57 65)',
      light: 'rgb(42 45 50)',
      base: 'rgb(36, 38, 44)',
      dark: 'rgb(25, 27, 31)',
      darker: black,
      darkest: '',
      baseTransparent: 'rgba(36, 38, 44, 0.5)',
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
      lighter: '#e991ef',
      light: '#e261eb',
      base: '#ba00c7',
      dark: '#6d54d3',
      darker: '#392b6e',
      darkest: '',
      baseTransparent: '',
    },
    success: {
      light: '#4bd96b',
      base: '#28a745',
      dark: '',
      baseTransparent: '',
    },
    warning: {
      light: '#ffd24d',
      base: '#ffc107',
      dark: '',
      baseTransparent: '',
    },
    error: {
      light: '#f55e6c',
      base: '#dc3545',
      dark: '',
      baseTransparent: '',
    },
  },
}
