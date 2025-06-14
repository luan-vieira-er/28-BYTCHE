import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  Chip,
  Paper
} from '@mui/material'
import { Play, Heart, Users, Building2, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { HeartIcon, MedicalCrossIcon, StethoscopeIcon, AmbulanceIcon } from '@/components/ui/PixelIcons'

// Importação dinâmica do jogo para evitar problemas de SSR com Pixi.js
const MedicalTriageGame = dynamic(() => import('@/components/game/MedicalTriageGame'), {
  ssr: false,
  loading: () => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #E3F2FD 0%, #F1F8E9 100%)'
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Box className="animate-pixel-pulse" sx={{ mb: 4 }}>
          <MedicalCrossIcon size={64} color="#00BCD4" />
        </Box>
        <Typography variant="h6" sx={{ fontFamily: '"Press Start 2P", monospace', fontSize: '1rem' }}>
          Carregando DoctorPixel...
        </Typography>
      </Box>
    </Box>
  )
})

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)

  if (gameStarted) {
    return (
      <>
        <Head>
          <title>DoctorPixel - Hospital Virtual Pixel Art</title>
          <meta name="description" content="DoctorPixel - Um hospital virtual em pixel art para triagem médica interativa" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MedicalTriageGame onExit={() => setGameStarted(false)} />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>DoctorPixel - Hospital Virtual Pixel Art</title>
        <meta name="description" content="DoctorPixel - Um hospital virtual em pixel art para triagem médica interativa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #E3F2FD 0%, #F1F8E9 100%)' }}>
          {/* Hero Section */}
          <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              {/* Logo animado */}
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box className="animate-pixel-bounce">
                  <MedicalCrossIcon size={64} color="#FF6B6B" />
                </Box>
                <Box className="animate-pixel-pulse">
                  <HeartIcon size={48} color="#FF6B6B" />
                </Box>
                <Box className="animate-pixel-bounce" sx={{ animationDelay: '0.5s' }}>
                  <StethoscopeIcon size={56} color="#00BCD4" />
                </Box>
              </Box>

              <Typography 
                variant="h1" 
                component="h1"
                sx={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                  color: 'primary.main',
                  textShadow: '4px 4px 0px rgba(0,0,0,0.2)',
                  mb: 3,
                  lineHeight: 1.2
                }}
              >
                DoctorPixel
              </Typography>
              
              <Typography 
                variant="h5" 
                component="h2"
                sx={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: { xs: '0.75rem', sm: '1rem' },
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.8
                }}
              >
                🏥 Hospital Virtual em Pixel Art 🎮
                <br />
                Aprenda sobre saúde de forma interativa e divertida!
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Play size={24} />}
                  onClick={() => setGameStarted(true)}
                  sx={{
                    fontSize: '1rem',
                    py: 2,
                    px: 4,
                    background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #388E3C 0%, #66BB6A 100%)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(76, 175, 80, 0.4)'
                    }
                  }}
                >
                  Começar Aventura
                </Button>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Chip 
                    icon={<ArrowUp size={16} />} 
                    label="↑" 
                    size="small" 
                    variant="outlined"
                  />
                  <Chip 
                    icon={<ArrowDown size={16} />} 
                    label="↓" 
                    size="small" 
                    variant="outlined"
                  />
                  <Chip 
                    icon={<ArrowLeft size={16} />} 
                    label="←" 
                    size="small" 
                    variant="outlined"
                  />
                  <Chip 
                    icon={<ArrowRight size={16} />} 
                    label="→" 
                    size="small" 
                    variant="outlined"
                  />
                  <Typography variant="caption" sx={{ alignSelf: 'center', ml: 1 }}>
                    ou WASD para mover
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>

          {/* Features Section */}
          <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                textAlign: 'center',
                mb: 6,
                color: 'primary.main'
              }}
            >
              🌟 Características do Jogo
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card className="pixel-card" sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Users size={48} color="#00BCD4" />
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                      Interação com NPCs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Converse com o Dr. Pixel e outros personagens do hospital virtual
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card className="pixel-card" sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <HeartIcon size={48} color="#4CAF50" />
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                      Sistema de Triagem
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Aprenda sobre triagem médica através de jogos interativos e educativos
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card className="pixel-card" sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Building2 size={48} color="#FF9800" />
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                      Hospital Virtual
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Explore um hospital completo com diferentes áreas e equipamentos médicos
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>

          {/* Instructions Section */}
          <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                textAlign: 'center',
                mb: 6,
                color: 'primary.main'
              }}
            >
              📋 Como Jogar
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper className="pixel-card" sx={{ p: 4, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Gamepad2 size={32} color="#2196F3" />
                    <Typography variant="h6" component="h3" sx={{ ml: 2 }}>
                      🎮 Controles
                    </Typography>
                  </Box>
                  <Box component="ul" sx={{ pl: 2, '& li': { mb: 1 } }}>
                    <li>• Use as setas ↑↓←→ para mover</li>
                    <li>• Ou use as teclas WASD</li>
                    <li>• Aproxime-se dos NPCs para interagir</li>
                    <li>• Clique nas opções de diálogo</li>
                    <li>• Explore todas as áreas do hospital</li>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper className="pixel-card" sx={{ p: 4, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <AmbulanceIcon size={32} color="#4CAF50" />
                    <Typography variant="h6" component="h3" sx={{ ml: 2 }}>
                      🎯 Objetivos
                    </Typography>
                  </Box>
                  <Box component="ul" sx={{ pl: 2, '& li': { mb: 1 } }}>
                    <li>• Converse com o Dr. Pixel</li>
                    <li>• Complete a triagem médica</li>
                    <li>• Explore o hospital virtual</li>
                    <li>• Aprenda sobre saúde e medicina</li>
                    <li>• Divirta-se aprendendo!</li>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  )
}
