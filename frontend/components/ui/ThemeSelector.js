import React, { useState } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Typography
} from '@mui/material'
import { Palette, Sun, Moon, Eye } from 'lucide-react'
import { useTheme, THEME_TYPES, themeNames, themeIcons } from '@/contexts/ThemeContext'

// Ícones para cada tema
const ThemeIcon = ({ themeType, size = 20 }) => {
  const iconProps = { size, style: { filter: 'pixelated' } }
  
  switch (themeType) {
    case THEME_TYPES.LIGHT:
      return <Sun {...iconProps} />
    case THEME_TYPES.DARK:
      return <Moon {...iconProps} />
    case THEME_TYPES.HIGH_CONTRAST:
      return <Eye {...iconProps} />
    default:
      return <Palette {...iconProps} />
  }
}

const ThemeSelector = ({ variant = 'icon' }) => {
  const { currentTheme, setTheme, availableThemes, themeName } = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleThemeSelect = (themeType) => {
    setTheme(themeType)
    handleClose()
  }

  if (variant === 'button') {
    return (
      <Box>
        <Tooltip title={`Tema atual: ${themeName}`}>
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{
              border: '2px solid',
              borderColor: 'primary.main',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '4px 4px 0px rgba(0,0,0,0.2)'
              }
            }}
          >
            <ThemeIcon themeType={currentTheme} />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 0,
              boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
              mt: 1
            }
          }}
        >
          {availableThemes.map((themeType) => (
            <MenuItem
              key={themeType}
              onClick={() => handleThemeSelect(themeType)}
              selected={themeType === currentTheme}
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '0.75rem',
                py: 2,
                '&:hover': {
                  backgroundColor: 'primary.light',
                  transform: 'translateX(4px)'
                },
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <ThemeIcon themeType={themeType} />
              </ListItemIcon>
              <ListItemText 
                primary={themeNames[themeType]}
                primaryTypographyProps={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '0.75rem'
                }}
              />
            </MenuItem>
          ))}
        </Menu>
      </Box>
    )
  }

  // Variant 'icon' (padrão)
  return (
    <Tooltip title={`Alterar tema (atual: ${themeName})`}>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'action.hover',
            transform: 'scale(1.1)'
          }
        }}
      >
        <ThemeIcon themeType={currentTheme} size={24} />
      </IconButton>
    </Tooltip>
  )
}

// Componente de demonstração dos temas
export const ThemePreview = () => {
  const { currentTheme } = useTheme()
  
  return (
    <Box
      sx={{
        p: 3,
        border: '2px solid',
        borderColor: 'primary.main',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: 300
      }}
    >
      <Typography variant="h6" component="h3">
        🎨 Tema Atual
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <ThemeIcon themeType={currentTheme} size={32} />
        <Typography variant="body1">
          {themeNames[currentTheme]}
        </Typography>
      </Box>
      
      <Typography variant="body2" color="text.secondary">
        {currentTheme === THEME_TYPES.LIGHT && 'Tema claro e amigável, ideal para uso diurno.'}
        {currentTheme === THEME_TYPES.DARK && 'Tema escuro que reduz o cansaço visual.'}
        {currentTheme === THEME_TYPES.HIGH_CONTRAST && 'Tema de alto contraste para melhor acessibilidade.'}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            backgroundColor: 'primary.main',
            border: '1px solid',
            borderColor: 'divider'
          }}
        />
        <Box
          sx={{
            width: 24,
            height: 24,
            backgroundColor: 'secondary.main',
            border: '1px solid',
            borderColor: 'divider'
          }}
        />
        <Box
          sx={{
            width: 24,
            height: 24,
            backgroundColor: 'success.main',
            border: '1px solid',
            borderColor: 'divider'
          }}
        />
        <Box
          sx={{
            width: 24,
            height: 24,
            backgroundColor: 'warning.main',
            border: '1px solid',
            borderColor: 'divider'
          }}
        />
        <Box
          sx={{
            width: 24,
            height: 24,
            backgroundColor: 'error.main',
            border: '1px solid',
            borderColor: 'divider'
          }}
        />
      </Box>
    </Box>
  )
}

export default ThemeSelector
