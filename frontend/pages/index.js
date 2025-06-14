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
  Shield,
  Award,
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
        <title>DoctorPixel - Cuidado Infantil Personalizado</title>
        <meta name="description" content="DoctorPixel - Plataforma digital segura para cuidado e apoio infantil personalizado" />
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
            py: { xs: 4, lg: 8 }
          }}>
            <Grid container spacing={6} alignItems="stretch">
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
                      maxWidth: '550px',
                      mx: { xs: 'auto', lg: 0 }
                    }}
                  >
                    Uma plataforma digital
                    <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      {' '}acolhedora e segura
                    </Box>
                    {' '}que ajuda cada criança a se expressar de forma única e receber o cuidado personalizado que merece através de um ambiente lúdico e respeitoso.
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
                        +30
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Especialistas em <br/>desenvolvimento infantil
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                        +92%
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Das crianças se sentem <br/>acolhidas e compreendidas
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                        100%
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Livre de julgamentos. <br/>Totalmente acolhedor.
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
                  minHeight: { xs: 400, md: 500 },
                  width: '100%'
                }}>
                  {/* Main Visual Circle */}
                  <Box sx={{
                    width: { xs: 300, md: 400, lg: 450 },
                    height: { xs: 300, md: 400, lg: 450 },
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(86, 255, 158, 0.15) 0%, rgba(78, 205, 196, 0.15) 50%, rgba(255, 217, 61, 0.1) 100%)',
                    border: '3px solid rgba(86, 255, 158, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: '0 0 60px rgba(86, 255, 158, 0.2)',
                    mx: 'auto',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '120%',
                      height: '120%',
                      borderRadius: '50%',
                      border: '2px solid rgba(86, 255, 158, 0.2)',
                      animation: 'pulse 4s ease-in-out infinite',
                      zIndex: -1
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '140%',
                      height: '140%',
                      borderRadius: '50%',
                      border: '1px solid rgba(78, 205, 196, 0.1)',
                      animation: 'pulse 6s ease-in-out infinite reverse',
                      zIndex: -2
                    },
                    '@keyframes pulse': {
                      '0%, 100%': {
                        transform: 'scale(1)',
                        opacity: 1
                      },
                      '50%': {
                        transform: 'scale(1.08)',
                        opacity: 0.6
                      }
                    }
                  }}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Heart size={80} color="#56FF9E" />
                      <Typography sx={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: '#56FF9E',
                        textAlign: 'center',
                        lineHeight: 1.2
                      }}>
                        Cuidado<br />Especializado
                      </Typography>
                    </Box>
                  </Box>

                  {/* Floating Elements */}
                  <Box sx={{
                    position: 'absolute',
                    top: '15%',
                    right: '8%',
                    p: 2.5,
                    borderRadius: 4,
                    backgroundColor: 'rgba(26, 43, 51, 0.95)',
                    border: '2px solid rgba(86, 255, 158, 0.5)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 12px 40px rgba(86, 255, 158, 0.25)',
                    animation: 'float 3s ease-in-out infinite',
                    zIndex: 10,
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-8px)' }
                    }
                  }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Users size={24} color="#56FF9E" />
                      <Typography sx={{
                        fontSize: '0.75rem',
                        color: '#56FF9E',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        Equipe
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{
                    position: 'absolute',
                    bottom: '18%',
                    left: '8%',
                    p: 2.5,
                    borderRadius: 4,
                    backgroundColor: 'rgba(26, 43, 51, 0.95)',
                    border: '2px solid rgba(78, 205, 196, 0.5)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 12px 40px rgba(78, 205, 196, 0.25)',
                    animation: 'float 4s ease-in-out infinite',
                    zIndex: 10,
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-6px)' }
                    }
                  }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Shield size={24} color="#4ECDC4" />
                      <Typography sx={{
                        fontSize: '0.75rem',
                        color: '#4ECDC4',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        Seguro
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{
                    position: 'absolute',
                    top: '45%',
                    left: '2%',
                    p: 2.5,
                    borderRadius: 4,
                    backgroundColor: 'rgba(26, 43, 51, 0.95)',
                    border: '2px solid rgba(255, 217, 61, 0.5)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 12px 40px rgba(255, 217, 61, 0.25)',
                    animation: 'float 5s ease-in-out infinite',
                    zIndex: 10,
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-10px)' }
                    }
                  }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Award size={24} color="#FFD93D" />
                      <Typography sx={{
                        fontSize: '0.75rem',
                        color: '#FFD93D',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        Qualidade
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{
                    position: 'absolute',
                    top: '25%',
                    left: '15%',
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: 'rgba(26, 43, 51, 0.95)',
                    border: '2px solid rgba(156, 39, 176, 0.5)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 12px 40px rgba(156, 39, 176, 0.25)',
                    animation: 'float 3.5s ease-in-out infinite',
                    zIndex: 10,
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-4px)' }
                    }
                  }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <BookOpen size={20} color="#9C27B0" />
                      <Typography sx={{
                        fontSize: '0.7rem',
                        color: '#9C27B0',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        Lúdico
                      </Typography>
                    </Box>
                  </Box>

                  {/* Additional floating element for better balance */}
                  <Box sx={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '15%',
                    p: 1.5,
                    borderRadius: 4,
                    backgroundColor: 'rgba(26, 43, 51, 0.95)',
                    border: '2px solid rgba(255, 152, 0, 0.5)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 12px 40px rgba(255, 152, 0, 0.25)',
                    animation: 'float 4.5s ease-in-out infinite',
                    zIndex: 10,
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-7px)' }
                    }
                  }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                      <Heart size={18} color="#FF9800" />
                      <Typography sx={{
                        fontSize: '0.65rem',
                        color: '#FF9800',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        Amor
                      </Typography>
                    </Box>
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
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Uma plataforma especializada que oferece um ambiente digital seguro e acolhedor,
              desenvolvida para apoiar cada criança de forma única em seu processo de cuidado e desenvolvimento
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ display: 'flex', flexWrap: 'nowrap', overflowX: { xs: 'auto', md: 'visible' } }}>
            <Grid item xs={12} md={4} sx={{ minWidth: { xs: '280px', md: 'auto' }, flex: { md: '1' } }}>
              <Card sx={{
                height: '100%',
                textAlign: 'center',
                p: 4,
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(26, 43, 51, 0.8) 0%, rgba(19, 31, 36, 0.9) 100%)',
                border: '1px solid rgba(86, 255, 158, 0.2)',
                backdropFilter: 'blur(20px)'
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
                    <Heart size={40} />
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600, color: 'white' }}>
                    Ambiente Lúdico e Interativo
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Jogos e atividades especialmente desenvolvidos para respeitar o ritmo único de cada criança,
                    facilitando a comunicação e expressão em um ambiente divertido e acolhedor.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} sx={{ minWidth: { xs: '280px', md: 'auto' }, flex: { md: '1' } }}>
              <Card sx={{
                height: '100%',
                textAlign: 'center',
                p: 4,
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(26, 43, 51, 0.8) 0%, rgba(19, 31, 36, 0.9) 100%)',
                border: '1px solid rgba(78, 205, 196, 0.2)',
                backdropFilter: 'blur(20px)'
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
                    Cuidado Personalizado
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Processo de avaliação adaptado às necessidades específicas de cada criança,
                    com protocolos desenvolvidos por especialistas em desenvolvimento infantil.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} sx={{ minWidth: { xs: '280px', md: 'auto' }, flex: { md: '1' } }}>
              <Card sx={{
                height: '100%',
                textAlign: 'center',
                p: 4,
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(26, 43, 51, 0.8) 0%, rgba(19, 31, 36, 0.9) 100%)',
                border: '1px solid rgba(255, 217, 61, 0.2)',
                backdropFilter: 'blur(20px)'
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
                    <Users size={40} />
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600, color: 'white' }}>
                    Suporte Familiar
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Orientação e apoio para famílias, com recursos educativos e ferramentas
                    que auxiliam no entendimento e acompanhamento do desenvolvimento da criança.
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
              Inicie uma jornada de cuidado e compreensão
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 6,
                maxWidth: '650px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Proporcione à sua criança um ambiente digital seguro e acolhedor para se expressar livremente.
              Conecte-se com especialistas e inicie um processo de cuidado respeitoso e individualizado.
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
                ✨ Ambiente seguro • Especialistas qualificados • Suporte contínuo
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
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 450 }}>
                  Plataforma digital especializada em cuidado e apoio infantil personalizado,
                  oferecendo um ambiente seguro e acolhedor para facilitar a comunicação e o desenvolvimento.
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Chip
                    label="Cuidado Individualizado"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(86, 255, 158, 0.1)',
                      color: 'primary.main',
                      border: '1px solid rgba(86, 255, 158, 0.3)'
                    }}
                  />
                  <Chip
                    label="Desenvolvimento Infantil"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(78, 205, 196, 0.1)',
                      color: 'info.main',
                      border: '1px solid rgba(78, 205, 196, 0.3)'
                    }}
                  />
                  <Chip
                    label="Ambiente Seguro"
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
                  <Grid item xs={6} sm={4}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      Plataforma
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        Casos Clínicos
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        Simulações
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        Protocolos
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        Avaliações
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      Suporte
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        Central de Ajuda
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        Tutoriais
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        FAQ
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        Contato
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      Recursos
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        Biblioteca Médica
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        Artigos
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        Webinars
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        Comunidade
                      </Typography>
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                © 2025 DoctorPixel. Todos os direitos reservados.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                Plataforma desenvolvida para cuidado infantil personalizado • Ambiente digital acolhedor e respeitoso
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
