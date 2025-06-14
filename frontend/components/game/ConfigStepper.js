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

  const steps = ['Escolha o médico', 'Escolha o personagem', 'Escolha o local']

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1)
    } else {
      // Finalizar configuração
      const config = {
        doctor: selectedDoctor,
        character: selectedCharacter,
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
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #56FF9E 0%, #3EE67A 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      fontSize: '2rem'
                    }}>
                      <img src="/dr-bot.png" alt="" />
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
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4ECDC4 0%, #3BA99F 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      fontSize: '2rem'
                    }}>
                      <img src="/dra-maria.png" alt="" />
                    </Box>
                    <Typography variant="h6" sx={{ color: 'white' }}>Dra.Maria</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )
      case 1:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ mb: 4, color: 'white' }}>
              Quem você quer ser?
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mb: 4 }}>
              <Button
                variant="outlined"
                onClick={() => setSelectedCharacter('Ana')}
                sx={{ minWidth: 50 }}
              >
                {'<'}
              </Button>
              <Card sx={{ minWidth: 200 }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFD93D 0%, #E6C235 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    fontSize: '2rem'
                  }}>
                    {selectedCharacter === 'Jorge' ? '👨' : '👩'}
                  </Box>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    {selectedCharacter}
                  </Typography>
                </CardContent>
              </Card>
              <Button
                variant="outlined"
                onClick={() => setSelectedCharacter('Jorge')}
                sx={{ minWidth: 50 }}
              >
                {'>'}
              </Button>
            </Box>
            <Grid container spacing={2} sx={{ maxWidth: 400, mx: 'auto' }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Humor: ⭐⭐⭐</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Curioso: ⭐⭐</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Energia: ⭐⭐⭐⭐</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Social: ⭐⭐⭐</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Soneca: ⭐</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Criativo: ⭐⭐⭐⭐</Typography>
              </Grid>
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
            <Grid container spacing={3} sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
              {[
                { id: 'fazendinha', name: 'Fazendinha', icon: '🚜' },
                { id: 'cidade', name: 'Cidade', icon: '🏙️' },
                { id: 'polo-norte', name: 'Polo Norte', icon: '🐧' },
                { id: 'planetario', name: 'Planetário', icon: '🚀' }
              ].map((location) => (
                <Grid item xs={6} key={location.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: selectedLocation === location.id ? '2px solid #56FF9E' : '1px solid rgba(86, 255, 158, 0.2)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(86, 255, 158, 0.3)'
                      }
                    }}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Box sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(86, 255, 158, 0.2) 0%, rgba(78, 205, 196, 0.2) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        fontSize: '1.5rem'
                      }}>
                        {location.icon}
                      </Box>
                      <Typography variant="body1" sx={{ color: 'white' }}>
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
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 4,
            '& .MuiStepLabel-label': {
              color: 'text.secondary',
              '&.Mui-active': {
                color: 'primary.main'
              },
              '&.Mui-completed': {
                color: 'primary.main'
              }
            },
            '& .MuiStepIcon-root': {
              color: 'rgba(86, 255, 158, 0.3)',
              '&.Mui-active': {
                color: 'primary.main'
              },
              '&.Mui-completed': {
                color: 'primary.main'
              }
            }
          }}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="outlined"
            sx={{ minWidth: 100 }}
          >
            Voltar
          </Button>
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
