import React, { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { lightTheme, darkTheme, highContrastTheme } from '@/theme/doctorPixelTheme'

// Tipos de tema disponíveis
export const THEME_TYPES = {
  LIGHT: 'light',
  DARK: 'dark',
  HIGH_CONTRAST: 'highContrast'
}

// Contexto do tema
const ThemeContext = createContext({
  currentTheme: THEME_TYPES.LIGHT,
  setTheme: () => {},
  toggleTheme: () => {},
  availableThemes: Object.values(THEME_TYPES)
})

// Hook para usar o contexto do tema
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um DoctorPixelThemeProvider')
  }
  return context
}

// Mapeamento dos temas
const themeMap = {
  [THEME_TYPES.LIGHT]: lightTheme,
  [THEME_TYPES.DARK]: darkTheme,
  [THEME_TYPES.HIGH_CONTRAST]: highContrastTheme
}

// Nomes amigáveis dos temas
export const themeNames = {
  [THEME_TYPES.LIGHT]: 'Claro',
  [THEME_TYPES.DARK]: 'Escuro',
  [THEME_TYPES.HIGH_CONTRAST]: 'Alto Contraste'
}

// Ícones dos temas (usando emojis como fallback)
export const themeIcons = {
  [THEME_TYPES.LIGHT]: '☀️',
  [THEME_TYPES.DARK]: '🌙',
  [THEME_TYPES.HIGH_CONTRAST]: '🔍'
}

// Provider do tema
export const DoctorPixelThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(THEME_TYPES.LIGHT)

  // Carrega tema salvo do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('doctorPixel-theme')
    if (savedTheme && Object.values(THEME_TYPES).includes(savedTheme)) {
      setCurrentTheme(savedTheme)
    } else {
      // Detecta preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches
      
      if (prefersHighContrast) {
        setCurrentTheme(THEME_TYPES.HIGH_CONTRAST)
      } else if (prefersDark) {
        setCurrentTheme(THEME_TYPES.DARK)
      }
    }
  }, [])

  // Salva tema no localStorage quando muda
  useEffect(() => {
    localStorage.setItem('doctorPixel-theme', currentTheme)
  }, [currentTheme])

  // Função para definir tema
  const setTheme = (themeName) => {
    if (Object.values(THEME_TYPES).includes(themeName)) {
      setCurrentTheme(themeName)
    }
  }

  // Função para alternar entre temas
  const toggleTheme = () => {
    const themes = Object.values(THEME_TYPES)
    const currentIndex = themes.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themes.length
    setCurrentTheme(themes[nextIndex])
  }

  // Obtém o tema atual do Material UI
  const muiTheme = themeMap[currentTheme]

  const contextValue = {
    currentTheme,
    setTheme,
    toggleTheme,
    availableThemes: Object.values(THEME_TYPES),
    themeName: themeNames[currentTheme],
    themeIcon: themeIcons[currentTheme]
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default DoctorPixelThemeProvider
