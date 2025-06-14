import Head from 'next/head'
import { useState } from 'react'
import AccessCodeDialog from '@/components/ui/AccessCodeDialog'
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip
} from '@mui/material'
import {
  Play,
  Heart,
  Users,
  Building2,
  Gamepad2,
  Shield,
  Award,
  Clock,
  BookOpen
} from 'lucide-react'

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleStartGame = () => {
    setDialogOpen(true)
  }

  return (
    <>
      <Head>
        <title>DoctorPixel - Hospital Virtual</title>
        <meta name="description" content="DoctorPixel - Um hospital virtual para triagem médica interativa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #131F24 0%, #0A1015 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Effects */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(86, 255, 158, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(86, 255, 158, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(78, 205, 196, 0.05) 0%, transparent 50%)
          `,
          zIndex: 0
        }} />

        {/* Hero Section */}
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: 8
          }}>
            <Grid container spacing={6} alignItems="center">
              {/* Left Content */}
              <Grid item xs={12} lg={6}>
                <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
                  {/* Badge */}
                  <Box sx={{ mb: 4 }}>
                    <Chip
                      label="🚀 Nova Experiência em Saúde Digital"
                      sx={{
                        backgroundColor: 'rgba(86, 255, 158, 0.1)',
                        color: 'primary.main',
                        border: '1px solid rgba(86, 255, 158, 0.3)',
                        fontSize: '0.9rem',
                        py: 1,
                        px: 2
                      }}
                    />
                  </Box>

                  {/* Main Title */}
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem' },
                      fontWeight: 800,
                      lineHeight: 0.9,
                      mb: 3,
                      background: 'linear-gradient(135deg, #56FF9E 0%, #4ECDC4 50%, #56FF9E 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 40px rgba(86, 255, 158, 0.3)'
                    }}
                  >
                    Doctor
                    <br />
                    <Box component="span" sx={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #B0BEC5 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      Pixel
                    </Box>
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                      color: 'text.secondary',
                      mb: 6,
                      lineHeight: 1.5,
                      maxWidth: '500px',
                      mx: { xs: 'auto', lg: 0 }
                    }}
                  >
                    Revolucione o aprendizado médico com nossa plataforma de
                    <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      {' '}triagem virtual interativa
                    </Box>
                  </Typography>

                  {/* CTA Buttons */}
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    alignItems="center"
                    justifyContent={{ xs: 'center', lg: 'flex-start' }}
                    sx={{ mb: 6 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Play size={24} />}
                      onClick={handleStartGame}
                      sx={{
                        fontSize: '1.1rem',
                        py: 2,
                        px: 6,
                        minWidth: 200,
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                          transition: 'left 0.5s',
                        },
                        '&:hover::before': {
                          left: '100%',
                        }
                      }}
                    >
                      Começar Agora
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<BookOpen size={20} />}
                      sx={{
                        fontSize: '1rem',
                        py: 2,
                        px: 4,
                        minWidth: 160
                      }}
                    >
                      Saiba Mais
                    </Button>
                  </Stack>

                  {/* Stats */}
                  <Stack direction="row" spacing={4} justifyContent={{ xs: 'center', lg: 'flex-start' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                        10K+
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Estudantes
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                        95%
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Satisfação
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                        24/7
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Disponível
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              {/* Right Visual */}
              <Grid item xs={12} lg={6}>
                <Box sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 500
                }}>
                  {/* Main Visual Circle */}
                  <Box sx={{
                    width: { xs: 300, md: 400, lg: 500 },
                    height: { xs: 300, md: 400, lg: 500 },
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(86, 255, 158, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)',
                    border: '2px solid rgba(86, 255, 158, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '120%',
                      height: '120%',
                      borderRadius: '50%',
                      border: '1px solid rgba(86, 255, 158, 0.1)',
                      animation: 'pulse 3s ease-in-out infinite'
                    },
                    '@keyframes pulse': {
                      '0%, 100%': {
                        transform: 'scale(1)',
                        opacity: 1
                      },
                      '50%': {
                        transform: 'scale(1.05)',
                        opacity: 0.7
                      }
                    }
                  }}>
                    <Heart size={120} color="#56FF9E" />
                  </Box>

                  {/* Floating Elements */}
                  <Box sx={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: 'rgba(26, 43, 51, 0.8)',
                    border: '1px solid rgba(86, 255, 158, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Users size={24} color="#56FF9E" />
                  </Box>

                  <Box sx={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '10%',
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: 'rgba(26, 43, 51, 0.8)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Shield size={24} color="#4ECDC4" />
                  </Box>

                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '5%',
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: 'rgba(26, 43, 51, 0.8)',
                    border: '1px solid rgba(255, 217, 61, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Award size={24} color="#FFD93D" />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* Features Section */}
        <Container maxWidth="xl" sx={{ py: 12, position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #B0BEC5 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Por que escolher DoctorPixel?
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 8,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Uma plataforma revolucionária que combina tecnologia de ponta com metodologias
              educacionais comprovadas para transformar o ensino médico
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{
                height: '100%',
                textAlign: 'center',
                p: 4,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <CardContent>
                  <Box sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #56FF9E 0%, #3EE67A 100%)',
                    color: '#131F24',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(86, 255, 158, 0.3)'
                  }}>
                    <Users size={40} />
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600, color: 'white' }}>
                    Colaboração em Tempo Real
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Conecte-se com colegas e profissionais de saúde ao redor do mundo.
                    Aprenda através de casos clínicos colaborativos e discussões em grupo.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{
                height: '100%',
                textAlign: 'center',
                p: 4,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <CardContent>
                  <Box sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4ECDC4 0%, #3BA99F 100%)',
                    color: '#131F24',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(78, 205, 196, 0.3)'
                  }}>
                    <Shield size={40} />
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600, color: 'white' }}>
                    Protocolos Validados
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Baseado em protocolos médicos internacionais e validado por especialistas.
                    Garanta que está aprendendo as melhores práticas da medicina moderna.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{
                height: '100%',
                textAlign: 'center',
                p: 4,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <CardContent>
                  <Box sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFD93D 0%, #E6C235 100%)',
                    color: '#131F24',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(255, 217, 61, 0.3)'
                  }}>
                    <Award size={40} />
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600, color: 'white' }}>
                    Certificação Reconhecida
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Obtenha certificados reconhecidos por instituições de ensino e
                    organizações de saúde. Comprove suas competências de forma oficial.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* CTA Section */}
        <Container maxWidth="lg" sx={{ py: 12, position: 'relative', zIndex: 1 }}>
          <Box sx={{
            textAlign: 'center',
            p: 8,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(86, 255, 158, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)',
            border: '1px solid rgba(86, 255, 158, 0.2)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(86, 255, 158, 0.05) 50%, transparent 70%)',
              animation: 'shimmer 3s ease-in-out infinite'
            },
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' }
            }
          }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                mb: 3,
                color: 'white'
              }}
            >
              Pronto para revolucionar seu aprendizado?
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 6,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Junte-se a milhares de profissionais de saúde que já estão transformando
              sua carreira com DoctorPixel
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Play size={24} />}
                onClick={handleStartGame}
                sx={{
                  fontSize: '1.2rem',
                  py: 2.5,
                  px: 8,
                  minWidth: 250,
                  position: 'relative',
                  zIndex: 2
                }}
              >
                Começar Gratuitamente
              </Button>

              <Typography variant="body2" color="text.secondary">
                ✨ Sem compromisso • Acesso imediato • Suporte 24/7
              </Typography>
            </Stack>
          </Box>
        </Container>

        {/* Footer */}
        <Container maxWidth="xl" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
          <Box sx={{
            borderTop: '1px solid rgba(86, 255, 158, 0.1)',
            pt: 6
          }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(135deg, #56FF9E 0%, #4ECDC4 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  DoctorPixel
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
                  Transformando o ensino médico através de tecnologia inovadora e
                  experiências imersivas de aprendizado.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Chip
                    label="Inovação"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(86, 255, 158, 0.1)',
                      color: 'primary.main',
                      border: '1px solid rgba(86, 255, 158, 0.3)'
                    }}
                  />
                  <Chip
                    label="Educação"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(78, 205, 196, 0.1)',
                      color: 'info.main',
                      border: '1px solid rgba(78, 205, 196, 0.3)'
                    }}
                  />
                  <Chip
                    label="Saúde"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 217, 61, 0.1)',
                      color: 'warning.main',
                      border: '1px solid rgba(255, 217, 61, 0.3)'
                    }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      Produto
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Funcionalidades</Typography>
                      <Typography variant="body2" color="text.secondary">Preços</Typography>
                      <Typography variant="body2" color="text.secondary">Suporte</Typography>
                      <Typography variant="body2" color="text.secondary">Documentação</Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      Empresa
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Sobre nós</Typography>
                      <Typography variant="body2" color="text.secondary">Carreiras</Typography>
                      <Typography variant="body2" color="text.secondary">Blog</Typography>
                      <Typography variant="body2" color="text.secondary">Contato</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{
              mt: 6,
              pt: 4,
              borderTop: '1px solid rgba(86, 255, 158, 0.1)',
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">
                © 2024 DoctorPixel. Todos os direitos reservados.
                Desenvolvido com ❤️ para revolucionar o ensino médico.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Access Code Dialog */}
      <AccessCodeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  )
}
