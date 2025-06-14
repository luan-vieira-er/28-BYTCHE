import { createTheme } from '@mui/material/styles'

/**
 * Tema customizado para DoctorPixel
 * Inspirado em design pixel art e jogos retrô
 */

// Paleta de cores pixel art médica
const pixelColors = {
  // Cores principais
  primary: {
    main: '#00BCD4', // Cyan médico
    light: '#4DD0E1',
    dark: '#0097A7',
    contrastText: '#FFFFFF'
  },
  
  // Cores secundárias
  secondary: {
    main: '#FF6B6B', // Rosa médico
    light: '#FF8A80',
    dark: '#E53935',
    contrastText: '#FFFFFF'
  },
  
  // Cores de sucesso (saúde)
  success: {
    main: '#4CAF50', // Verde saúde
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#FFFFFF'
  },
  
  // Cores de aviso
  warning: {
    main: '#FF9800', // Laranja atenção
    light: '#FFB74D',
    dark: '#F57C00',
    contrastText: '#000000'
  },
  
  // Cores de erro
  error: {
    main: '#F44336', // Vermelho emergência
    light: '#EF5350',
    dark: '#D32F2F',
    contrastText: '#FFFFFF'
  },
  
  // Cores de informação
  info: {
    main: '#2196F3', // Azul informativo
    light: '#64B5F6',
    dark: '#1976D2',
    contrastText: '#FFFFFF'
  }
}

// Configuração da tipografia pixel art
const pixelTypography = {
  fontFamily: [
    '"Press Start 2P"',
    'monospace',
    'Arial',
    'sans-serif'
  ].join(','),
  
  // Tamanhos ajustados para fonte pixel
  h1: {
    fontSize: '2rem',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '0.1em'
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: '0.08em'
  },
  h3: {
    fontSize: '1.25rem',
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: '0.06em'
  },
  h4: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: '0.04em'
  },
  h5: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.02em'
  },
  h6: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.02em'
  },
  body1: {
    fontSize: '0.75rem',
    lineHeight: 1.6,
    letterSpacing: '0.01em'
  },
  body2: {
    fontSize: '0.625rem',
    lineHeight: 1.6,
    letterSpacing: '0.01em'
  },
  button: {
    fontSize: '0.75rem',
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  },
  caption: {
    fontSize: '0.625rem',
    lineHeight: 1.4,
    letterSpacing: '0.02em'
  }
}

// Componentes customizados
const pixelComponents = {
  // Botões com estilo pixel art
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0, // Bordas quadradas
        textTransform: 'uppercase',
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '0.75rem',
        padding: '12px 24px',
        border: '2px solid transparent',
        transition: 'all 0.1s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '4px 4px 0px rgba(0,0,0,0.3)'
        },
        '&:active': {
          transform: 'translateY(0px)',
          boxShadow: '2px 2px 0px rgba(0,0,0,0.3)'
        }
      },
      contained: {
        boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
        '&:hover': {
          boxShadow: '6px 6px 0px rgba(0,0,0,0.3)'
        }
      },
      outlined: {
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px'
        }
      }
    }
  },
  
  // Cards com estilo pixel
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        border: '2px solid #E0E0E0',
        boxShadow: '4px 4px 0px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '6px 6px 0px rgba(0,0,0,0.15)'
        }
      }
    }
  },
  
  // Inputs com estilo pixel
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 0,
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.75rem',
          '& fieldset': {
            borderWidth: '2px'
          },
          '&:hover fieldset': {
            borderWidth: '2px'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '2px'
          }
        },
        '& .MuiInputLabel-root': {
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.75rem'
        }
      }
    }
  },
  
  // AppBar com estilo pixel
  MuiAppBar: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        boxShadow: '0px 4px 0px rgba(0,0,0,0.2)'
      }
    }
  },
  
  // Chips com estilo pixel
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '0.625rem',
        border: '2px solid transparent'
      }
    }
  }
}

// Tema claro (padrão)
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...pixelColors,
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#212121',
      secondary: '#757575'
    }
  },
  typography: pixelTypography,
  components: pixelComponents,
  shape: {
    borderRadius: 0 // Bordas quadradas em todos os componentes
  },
  spacing: 8 // Espaçamento base de 8px
})

// Tema escuro
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...pixelColors,
    background: {
      default: '#121212',
      paper: '#1E1E1E'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0'
    }
  },
  typography: pixelTypography,
  components: {
    ...pixelComponents,
    // Ajustes específicos para tema escuro
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '2px solid #333333',
          boxShadow: '4px 4px 0px rgba(255,255,255,0.1)',
          '&:hover': {
            boxShadow: '6px 6px 0px rgba(255,255,255,0.15)'
          }
        }
      }
    }
  },
  shape: {
    borderRadius: 0
  },
  spacing: 8
})

// Tema de alto contraste (acessibilidade)
export const highContrastTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#000000'
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#000000',
      secondary: '#000000'
    }
  },
  typography: {
    ...pixelTypography,
    // Aumenta tamanhos para melhor legibilidade
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.8,
      fontWeight: 600
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.8,
      fontWeight: 600
    }
  },
  components: {
    ...pixelComponents,
    // Bordas mais grossas para alto contraste
    MuiButton: {
      styleOverrides: {
        root: {
          ...pixelComponents.MuiButton.styleOverrides.root,
          border: '3px solid #000000',
          fontWeight: 600
        }
      }
    }
  },
  shape: {
    borderRadius: 0
  },
  spacing: 8
})

export default lightTheme
