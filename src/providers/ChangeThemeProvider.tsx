import React, { useCallback, useState } from 'react'

// Styled components Theme Provider
import { ThemeProvider } from 'styled-components'

// Themes
import { darkTheme, lightTheme } from 'themes'

const ChangeThemeContext = React.createContext<(() => void) | null>(null)

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ChangeThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isLightTheme, setIsLightTheme] = useState(false)

  const toggleTheme = useCallback(() => {
    setIsLightTheme((currentState) => !currentState)
  }, [])

  return (
    <ChangeThemeContext.Provider value={toggleTheme}>
      <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ChangeThemeContext.Provider>
  )
}
