import Head from 'next/head'
import Layout from '@/components/Layout'
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  Paper,
  Chip,
  Divider
} from '@mui/material'
import { Heart, Users, Gamepad2, Lightbulb, Shield, Accessibility } from 'lucide-react'
import { HeartIcon, MedicalCrossIcon, StethoscopeIcon, AmbulanceIcon } from '@/components/ui/PixelIcons'
import { ThemePreview } from '@/components/ui/ThemeSelector'

export default function About() {
  return (
    <>
      <Head>
        <title>Sobre - DoctorPixel</title>
        <meta name="description" content="Conheça mais sobre o DoctorPixel, o hospital virtual em pixel art" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #E3F2FD 0%, #F1F8E9 100%)' }}>
          {/* Hero Section */}
          <Container maxWidth="lg" sx={{ pt: 6, pb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 4 }}>
                <MedicalCrossIcon size={48} color="#FF6B6B" />
                <HeartIcon size={36} color="#FF6B6B" />
                <StethoscopeIcon size={42} color="#00BCD4" />
              </Box>

              <Typography 
                variant="h2" 
                component="h1"
                sx={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  color: 'primary.main',
                  textShadow: '3px 3px 0px rgba(0,0,0,0.2)',
                  mb: 3
                }}
              >
                Sobre o DoctorPixel
              </Typography>
              
              <Typography 
                variant="h6" 
                component="h2"
                sx={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: { xs: '0.75rem', sm: '1rem' },
                  color: 'text.secondary',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.8
                }}
              >
                Um projeto inovador que combina pixel art, gamificação e educação em saúde
              </Typography>
            </Box>
          </Container>

          {/* Missão e Visão */}
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper className="pixel-card" sx={{ p: 4, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Heart size={32} color="#FF6B6B" />
                    <Typography variant="h5" component="h3" sx={{ ml: 2 }}>
                      🎯 Nossa Missão
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    Tornar a educação em saúde acessível, divertida e interativa através de um hospital virtual em pixel art. 
                    Queremos que crianças e adultos aprendam sobre triagem médica de forma lúdica e envolvente.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper className="pixel-card" sx={{ p: 4, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Lightbulb size={32} color="#FF9800" />
                    <Typography variant="h5" component="h3" sx={{ ml: 2 }}>
                      🔮 Nossa Visão
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    Ser referência em gamificação da saúde, criando experiências que reduzem a ansiedade médica e 
                    promovem o conhecimento sobre cuidados de saúde de forma natural e divertida.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>

          {/* Características Técnicas */}
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography 
              variant="h4" 
              component="h2"
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: { xs: '1rem', sm: '1.25rem' },
                textAlign: 'center',
                mb: 4,
                color: 'primary.main'
              }}
            >
              🛠️ Características Técnicas
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card className="pixel-card" sx={{ textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Gamepad2 size={40} color="#2196F3" />
                    <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                      PIXI.js
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Engine de jogos 2D para renderização suave e performance otimizada
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card className="pixel-card" sx={{ textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Users size={40} color="#4CAF50" />
                    <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                      React + Next.js
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Framework moderno para interface responsiva e experiência fluida
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card className="pixel-card" sx={{ textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Shield size={40} color="#FF6B6B" />
                    <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                      Material UI
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Design system customizado com tema pixel art e acessibilidade
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card className="pixel-card" sx={{ textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <AmbulanceIcon size={40} color="#FF9800" />
                    <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                      Tilesets
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Assets do Kenney.nl para visual pixel art autêntico e profissional
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card className="pixel-card" sx={{ textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Accessibility size={40} color="#9C27B0" />
                    <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                      Acessibilidade
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Múltiplos temas, incluindo alto contraste e suporte a leitores de tela
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card className="pixel-card" sx={{ textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <HeartIcon size={40} color="#E91E63" />
                    <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                      Press Start 2P
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fonte pixel art autêntica para experiência nostálgica completa
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>

          {/* Temas */}
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography 
              variant="h4" 
              component="h2"
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: { xs: '1rem', sm: '1.25rem' },
                textAlign: 'center',
                mb: 4,
                color: 'primary.main'
              }}
            >
              🎨 Sistema de Temas
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={6}>
                <ThemePreview />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className="pixel-card" sx={{ p: 4, height: '100%' }}>
                  <Typography variant="h6" component="h3" sx={{ mb: 3 }}>
                    Temas Disponíveis
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip label="☀️ Claro" variant="outlined" />
                      <Typography variant="body2">
                        Tema padrão, ideal para uso diurno
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip label="🌙 Escuro" variant="outlined" />
                      <Typography variant="body2">
                        Reduz cansaço visual em ambientes escuros
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip label="🔍 Alto Contraste" variant="outlined" />
                      <Typography variant="body2">
                        Melhor acessibilidade para deficiências visuais
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>

          {/* Créditos */}
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper className="pixel-card" sx={{ p: 4, textAlign: 'center' }}>
              <Typography 
                variant="h5" 
                component="h2"
                sx={{
                  fontFamily: '"Press Start 2P", monospace',
                  mb: 3,
                  color: 'primary.main'
                }}
              >
                💝 Créditos e Agradecimentos
              </Typography>
              
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    🎨 Assets
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kenney.nl - Tiny Town Bundle
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    🔤 Fonte
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Press Start 2P - Google Fonts
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    🎮 Engine
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    PIXI.js - Renderização 2D
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    🎯 Inspiração
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Jogos retrô e educação em saúde
                  </Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="body2" color="text.secondary">
                Desenvolvido com ❤️ para tornar a educação em saúde mais acessível e divertida
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Layout>
    </>
  )
}
