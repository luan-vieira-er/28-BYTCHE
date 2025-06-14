import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid
} from '@mui/material'

export default function ConfigStepper({ open, onComplete, onClose }) {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedCharacter, setSelectedCharacter] = useState('Jorge')
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0)

  // Definição dos personagens com características
  const characters = [
    {
      id: 'Jorge',
      name: 'Jorge',
      image: '/assets/jorge.png',
      attributes: {
        humor: 3,
        curioso: 2,
        energia: 4,
        social: 3,
        soneca: 1,
        criativo: 4
      },
      description: 'Aventureiro e criativo, sempre pronto para novas descobertas!'
    },
    {
      id: 'Ana',
      name: 'Ana',
      image: '/assets/ana.png',
      attributes: {
        humor: 4,
        curioso: 4,
        energia: 3,
        social: 4,
        soneca: 2,
        criativo: 3
      },
      description: 'Sociável e curiosa, adora fazer novos amigos e aprender!'
    },
    {
      id: 'Zombie',
      name: 'Zombie',
      image: '/assets/zombie.png',
      attributes: {
        humor: 2,
        curioso: 1,
        energia: 2,
        social: 1,
        soneca: 4,
        criativo: 2
      },
      description: 'Misterioso e sonolento, mas surpreendentemente eficaz!'
    },
    {
      id: "erik",
      name: "Erik",
      image: "/assets/erik.png",
      attributes: {
        humor: 3,
        curioso: 2,
        energia: 3,
        social: 2,
        soneca: 1,
        criativo: 4
      },
      description: "Calmo e criativo, Erik prefere pensar antes de agir e encontra soluções inesperadas!"
    }
  ]

  // Locais com imagens
  const locations = [
    { id: 'fazendinha', name: 'Hospital da Fazendinha', image: '/assets/fazendinha.png' },
    { id: 'cidade', name: 'Hospital Urbano', image: '/assets/cidade.png' },
    { id: 'polo-norte', name: 'Estação Médica Ártica', image: '/assets/polo-norte.png' },
    { id: 'planeta', name: 'Hospital Espacial', image: '/assets/planeta.png' }
  ]

  const steps = ['Escolha o médico', 'Escolha o personagem', 'Escolha o local']

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1)
    } else {
      // Finalizar configuração
      const config = {
        doctor: selectedDoctor,
        character: characters[currentCharacterIndex],
        location: selectedLocation
      }
      onComplete(config)
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1)
    }
  }

  const handlePreviousCharacter = () => {
    const newIndex = currentCharacterIndex === 0 ? characters.length - 1 : currentCharacterIndex - 1
    setCurrentCharacterIndex(newIndex)
    setSelectedCharacter(characters[newIndex].id)
  }

  const handleNextCharacter = () => {
    const newIndex = currentCharacterIndex === characters.length - 1 ? 0 : currentCharacterIndex + 1
    setCurrentCharacterIndex(newIndex)
    setSelectedCharacter(characters[newIndex].id)
  }

  const renderStars = (count) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Box
            key={star}
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: star <= count
                ? 'linear-gradient(135deg, #FFD93D 0%, #FF8F00 100%)'
                : 'rgba(255, 255, 255, 0.1)',
              border: star <= count
                ? '1px solid #FFD93D'
                : '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: star <= count
                ? '0 2px 8px rgba(255, 217, 61, 0.4)'
                : 'none',
              transition: 'all 0.2s ease'
            }}
          />
        ))}
      </Box>
    )
  }

  const renderCustomStepper = () => {
    const progress = ((activeStep + 1) / steps.length) * 100

    return (
      <Box sx={{ mb: 6 }}>
        {/* Progress Bar */}
        <Box sx={{
          position: 'relative',
          height: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 3,
          mb: 3,
          overflow: 'hidden'
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #56FF9E 0%, #4ECDC4 50%, #56FF9E 100%)',
            borderRadius: 3,
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 20px rgba(86, 255, 158, 0.5)'
          }} />
        </Box>

        {/* Steps */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {steps.map((step, index) => (
            <Box key={step} sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1
            }}>
              {/* Step Circle */}
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: index <= activeStep
                  ? 'linear-gradient(135deg, #56FF9E 0%, #3EE67A 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
                border: index <= activeStep
                  ? '2px solid #56FF9E'
                  : '2px solid rgba(255, 255, 255, 0.2)',
                color: index <= activeStep ? '#131F24' : 'rgba(255, 255, 255, 0.5)',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: index <= activeStep
                  ? '0 4px 20px rgba(86, 255, 158, 0.4)'
                  : 'none',
                mb: 2
              }}>
                {index < activeStep ? '✓' : index + 1}
              </Box>

              {/* Step Label */}
              <Typography
                variant="body2"
                sx={{
                  color: index <= activeStep ? 'primary.main' : 'text.secondary',
                  fontWeight: index === activeStep ? 600 : 400,
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  transition: 'color 0.3s ease'
                }}
              >
                {step}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ mb: 4, color: 'white' }}>
              Em quem você confia mais?
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: selectedDoctor === 'dr-bot' ? '2px solid #56FF9E' : '1px solid rgba(86, 255, 158, 0.2)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(86, 255, 158, 0.3)'
                    }
                  }}
                  onClick={() => setSelectedDoctor('dr-bot')}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      background: 'rgba(26, 43, 51, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      overflow: 'hidden',
                      border: '2px solid rgba(86, 255, 158, 0.3)'
                    }}>
                      <img
                        src="/assets/dr-bot.png"
                        alt="Dr.Bot"
                        style={{
                          width: '80%',
                          height: '80%',
                          objectFit: 'contain',
                          imageRendering: 'pixelated'
                        }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ color: 'white' }}>Dr.Bot</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: selectedDoctor === 'dra-maria' ? '2px solid #56FF9E' : '1px solid rgba(86, 255, 158, 0.2)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(86, 255, 158, 0.3)'
                    }
                  }}
                  onClick={() => setSelectedDoctor('dra-maria')}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      background: 'rgba(26, 43, 51, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      overflow: 'hidden',
                      border: '2px solid rgba(78, 205, 196, 0.3)'
                    }}>
                      <img
                        src="/assets/dra-maria.png"
                        alt="Dra.Maria"
                        style={{
                          width: '80%',
                          height: '80%',
                          objectFit: 'contain',
                          imageRendering: 'pixelated'
                        }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ color: 'white' }}>Dra.Maria</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )
      case 1:
        const currentCharacter = characters[currentCharacterIndex]
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ mb: 4, color: 'white' }}>
              Quem você quer ser?
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mb: 4 }}>
              <Button
                variant="outlined"
                onClick={handlePreviousCharacter}
                sx={{
                  minWidth: 50,
                  height: 50,
                  borderRadius: '50%',
                  border: '2px solid rgba(86, 255, 158, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(86, 255, 158, 0.1)',
                    border: '2px solid #56FF9E'
                  }
                }}
              >
                {'<'}
              </Button>

              <Card sx={{
                minWidth: 280,
                background: 'linear-gradient(135deg, rgba(86, 255, 158, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)',
                border: '2px solid rgba(86, 255, 158, 0.3)'
              }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    background: 'rgba(26, 43, 51, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    overflow: 'hidden',
                    border: '2px solid rgba(86, 255, 158, 0.3)'
                  }}>
                    <img
                      src={currentCharacter.image}
                      alt={currentCharacter.name}
                      style={{
                        width: '80%',
                        height: '80%',
                        objectFit: 'contain',
                        imageRendering: 'pixelated'
                      }}
                    />
                  </Box>
                  <Typography variant="h5" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
                    {currentCharacter.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {currentCharacter.description}
                  </Typography>
                </CardContent>
              </Card>

              <Button
                variant="outlined"
                onClick={handleNextCharacter}
                sx={{
                  minWidth: 50,
                  height: 50,
                  borderRadius: '50%',
                  border: '2px solid rgba(86, 255, 158, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(86, 255, 158, 0.1)',
                    border: '2px solid #56FF9E'
                  }
                }}
              >
                {'>'}
              </Button>
            </Box>

            <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>
              Características
            </Typography>
            <Grid container spacing={2} sx={{ width: '100%', mx: 'auto' }}>
              {Object.entries(currentCharacter.attributes).map(([attr, value]) => (
                <Grid item xs={12} sm={6} md={4} key={attr}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: 'rgba(26, 43, 51, 0.5)'
                  }}>
                    <Typography variant="body2" sx={{ color: 'white', textTransform: 'capitalize' }}>
                      {attr}:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main' }}>
                      {renderStars(value)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Vamos começar?{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Escolha seu local
              </Box>
            </Typography>
            <Grid container spacing={2} sx={{ width: '100%' }}>
              {locations.map((location) => (
                <Grid item xs={6} key={location.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: selectedLocation === location.id ? '3px solid #56FF9E' : '2px solid rgba(86, 255, 158, 0.2)',
                      borderRadius: 3,
                      background: selectedLocation === location.id
                        ? 'linear-gradient(135deg, rgba(86, 255, 158, 0.15) 0%, rgba(78, 205, 196, 0.15) 100%)'
                        : 'linear-gradient(135deg, rgba(26, 43, 51, 0.8) 0%, rgba(19, 31, 36, 0.8) 100%)',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 12px 32px rgba(86, 255, 158, 0.4)',
                        border: '3px solid #56FF9E'
                      }
                    }}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                      <Box sx={{
                        width: 120,
                        height: 120,
                        borderRadius: 3,
                        background: 'rgba(26, 43, 51, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        overflow: 'hidden',
                        border: selectedLocation === location.id
                          ? '3px solid #56FF9E'
                          : '2px solid rgba(86, 255, 158, 0.3)',
                        boxShadow: selectedLocation === location.id
                          ? '0 8px 25px rgba(86, 255, 158, 0.3)'
                          : '0 4px 15px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease'
                      }}>
                        <img
                          src={location.image}
                          alt={location.name}
                          style={{
                            width: '85%',
                            height: '85%',
                            objectFit: 'contain',
                            imageRendering: 'pixelated'
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: selectedLocation === location.id ? 'primary.main' : 'white',
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {location.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (activeStep) {
      case 0: return selectedDoctor !== null
      case 1: return selectedCharacter !== null
      case 2: return selectedLocation !== null
      default: return true
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          background: 'linear-gradient(135deg, #1A2B33 0%, #131F24 100%)',
          border: '1px solid rgba(86, 255, 158, 0.2)',
          borderRadius: 4,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.4)'
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', color: 'white', py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Criação do Personagem
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Configure sua experiência no DoctorPixel
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pb: 4 }}>

        {renderCustomStepper()}

        {renderStepContent()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          { activeStep !== 0 ? (
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlined"
              sx={{ minWidth: 100 }}
            >
              Voltar
            </Button>
          ) : (
            <Box sx={{ minWidth: 100 }} />
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            variant="contained"
            sx={{ minWidth: 120 }}
          >
            {activeStep === steps.length - 1 ? 'Finalizar' : 'Avançar'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
