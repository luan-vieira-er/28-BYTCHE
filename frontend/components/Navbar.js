import Link from 'next/link'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip
} from '@mui/material'
import { Home, Info, Gamepad2 } from 'lucide-react'
import ThemeSelector from './ui/ThemeSelector'
import { HeartIcon, MedicalCrossIcon } from './ui/PixelIcons'

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #00BCD4 0%, #4DD0E1 100%)',
        boxShadow: '0px 4px 0px rgba(0,0,0,0.2)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo e nome */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MedicalCrossIcon size={32} color="#FFFFFF" />
            <HeartIcon size={24} color="#FF6B6B" />
          </Box>

          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                color: 'white',
                textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  textShadow: '3px 3px 0px rgba(0,0,0,0.4)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              DoctorPixel
            </Typography>
          </Link>
        </Box>

        {/* Menu de navegação */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Links de navegação */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            <Link href="/" passHref>
              <Button
                startIcon={<Home size={16} />}
                sx={{
                  color: 'white',
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Home
              </Button>
            </Link>

            <Link href="/game" passHref>
              <Button
                startIcon={<Gamepad2 size={16} />}
                sx={{
                  color: 'white',
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Jogar
              </Button>
            </Link>

            <Link href="/about" passHref>
              <Button
                startIcon={<Info size={16} />}
                sx={{
                  color: 'white',
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Sobre
              </Button>
            </Link>
          </Box>

          {/* Menu mobile */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 0.5 }}>
            <Tooltip title="Home">
              <Link href="/" passHref>
                <IconButton sx={{ color: 'white' }}>
                  <Home size={20} />
                </IconButton>
              </Link>
            </Tooltip>

            <Tooltip title="Jogar">
              <Link href="/game" passHref>
                <IconButton sx={{ color: 'white' }}>
                  <Gamepad2 size={20} />
                </IconButton>
              </Link>
            </Tooltip>

            <Tooltip title="Sobre">
              <Link href="/about" passHref>
                <IconButton sx={{ color: 'white' }}>
                  <Info size={20} />
                </IconButton>
              </Link>
            </Tooltip>
          </Box>

          {/* Seletor de tema */}
          <Box sx={{ ml: 1 }}>
            <ThemeSelector variant="button" />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
