import { createTheme } from '@mui/material/styles'

/**
 * Tema customizado para DoctorPixel
 * Inspirado em design pixel art e jogos retrô
 */

// Paleta de cores moderna e comercial
const modernColors = {
  // Cores principais
  primary: {
    main: '#56FF9E', // Verde neon vibrante
    light: '#7DFFB3',
    dark: '#3EE67A',
    contrastText: '#131F24'
  },

  // Cores secundárias
  secondary: {
    main: '#1A2B33', // Azul escuro complementar
    light: '#2A3B43',
    dark: '#0F1A1F',
    contrastText: '#FFFFFF'
  },

  // Cores de sucesso
  success: {
    main: '#56FF9E', // Mesmo verde primário
    light: '#7DFFB3',
    dark: '#3EE67A',
    contrastText: '#131F24'
  },

  // Cores de aviso
  warning: {
    main: '#FFD93D', // Amarelo vibrante
    light: '#FFE066',
    dark: '#E6C235',
    contrastText: '#131F24'
  },

  // Cores de erro
  error: {
    main: '#FF6B6B', // Vermelho suave
    light: '#FF8A8A',
    dark: '#E55555',
    contrastText: '#FFFFFF'
  },

  // Cores de informação
  info: {
    main: '#4ECDC4', // Turquesa
    light: '#6DD5CE',
    dark: '#3BA99F',
    contrastText: '#131F24'
  }
}

// Configuração da tipografia moderna
const modernTypography = {
  fontFamily: [
    '"Poppins"',
    '"Inter"',
    '"Roboto"',
    '"Helvetica"',
    'Arial',
    'sans-serif'
  ].join(','),

  // Tamanhos modernos e legíveis
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01em'
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em'
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '-0.01em'
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0em'
  },
  h5: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0em'
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0em'
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0em'
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    letterSpacing: '0em'
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none',
    letterSpacing: '0.01em'
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.4,
    letterSpacing: '0.01em'
  }
}

// Componentes customizados modernos
const modernComponents = {
  // Botões com estilo moderno e comercial
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        textTransform: 'none',
        fontSize: '0.95rem',
        fontWeight: 600,
        padding: '12px 24px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(86, 255, 158, 0.3)'
        }
      },
      contained: {
        background: 'linear-gradient(135deg, #56FF9E 0%, #3EE67A 100%)',
        boxShadow: '0 4px 15px rgba(86, 255, 158, 0.4)',
        color: '#131F24',
        '&:hover': {
          background: 'linear-gradient(135deg, #3EE67A 0%, #2DD865 100%)',
          boxShadow: '0 8px 25px rgba(86, 255, 158, 0.5)'
        }
      },
      outlined: {
        border: '2px solid #56FF9E',
        color: '#56FF9E',
        '&:hover': {
          backgroundColor: 'rgba(86, 255, 158, 0.1)',
          border: '2px solid #3EE67A'
        }
      }
    }
  },

  // Cards com estilo moderno e comercial
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 20,
        border: '1px solid rgba(86, 255, 158, 0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        backgroundColor: 'rgba(26, 43, 51, 0.6)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 48px rgba(86, 255, 158, 0.2)',
          border: '1px solid rgba(86, 255, 158, 0.4)'
        }
      }
    }
  },

  // Inputs com estilo moderno
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          fontSize: '1rem'
        }
      }
    }
  },

  // AppBar com estilo moderno
  MuiAppBar: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
      }
    }
  },

  // Chips com estilo moderno
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        fontSize: '0.875rem'
      }
    }
  }
}

// Tema claro (padrão)
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...modernColors,
    background: {
      default: '#131F24',
      paper: '#1A2B33'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5'
    }
  },
  typography: modernTypography,
  components: modernComponents,
  shape: {
    borderRadius: 12
  },
  spacing: 8
})

// Tema escuro
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...modernColors,
    background: {
      default: '#0A1015',
      paper: '#131F24'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#94A3B8'
    }
  },
  typography: modernTypography,
  components: {
    ...modernComponents,
    // Ajustes específicos para tema escuro
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(86, 255, 158, 0.1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          backgroundColor: 'rgba(26, 43, 51, 0.8)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(86, 255, 158, 0.2)',
            border: '1px solid rgba(86, 255, 158, 0.2)'
          }
        }
      }
    }
  },
  shape: {
    borderRadius: 12
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
    ...modernTypography,
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
    ...modernComponents,
    // Bordas mais grossas para alto contraste
    MuiButton: {
      styleOverrides: {
        root: {
          ...modernComponents.MuiButton.styleOverrides.root,
          border: '2px solid #000000',
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
