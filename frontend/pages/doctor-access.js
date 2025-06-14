import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, TextField, Button, Card, CardContent, Alert } from '@mui/material'
import { Stethoscope, ArrowRight } from 'lucide-react'

export default function DoctorAccess() {
  const router = useRouter()
  const [roomCode, setRoomCode] = useState('')
  const [error, setError] = useState('')

  const handleAccessSession = () => {
    if (!roomCode.trim()) {
      setError('Por favor, insira o código da sessão')
      return
    }

    // Redirecionar para a página do jogo com parâmetro type=doctor
    router.push(`/game?code=${roomCode.trim()}&type=doctor`)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAccessSession()
    }
  }

  return (
    <>
      <Head>
        <title>Acesso Médico - DoctorPixel</title>
        <meta name="description" content="Acesso para médicos acompanharem sessões de pacientes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #131F24 0%, #0A1015 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
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
            radial-gradient(circle at 80% 20%, rgba(86, 255, 158, 0.05) 0%, transparent 50%)
          `,
          zIndex: 0
        }} />

        <Card sx={{
          maxWidth: 500,
          width: '100%',
          background: 'rgba(26, 43, 51, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(86, 255, 158, 0.2)',
          borderRadius: 4,
          position: 'relative',
          zIndex: 1
        }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #56FF9E 0%, #4ECDC4 100%)',
                mb: 3,
                boxShadow: '0 8px 32px rgba(86, 255, 158, 0.3)'
              }}>
                <Stethoscope size={40} color="#131F24" />
              </Box>
              
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                color: 'white',
                mb: 1,
                background: 'linear-gradient(135deg, #56FF9E 0%, #4ECDC4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Acesso Médico
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Acompanhe sessões de pacientes em tempo real
              </Typography>
            </Box>

            {/* Form */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Insira o código da sessão que deseja acompanhar:
              </Typography>
              
              <TextField
                fullWidth
                label="Código da Sessão"
                value={roomCode}
                onChange={(e) => {
                  setRoomCode(e.target.value)
                  setError('')
                }}
                onKeyPress={handleKeyPress}
                placeholder="Ex: 9fd458d0-61d7-4139-895e-d7fe1ca46517"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    '& fieldset': {
                      borderColor: 'rgba(86, 255, 158, 0.3)'
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(86, 255, 158, 0.5)'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#56FF9E'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)'
                  },
                  '& .MuiInputBase-input': {
                    color: 'white'
                  }
                }}
              />

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleAccessSession}
                endIcon={<ArrowRight size={20} />}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #56FF9E 0%, #4ECDC4 100%)',
                  color: '#131F24',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4ECDC4 0%, #56FF9E 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(86, 255, 158, 0.4)'
                  }
                }}
              >
                Acessar Sessão
              </Button>
            </Box>

            {/* Info */}
            <Box sx={{ 
              p: 2, 
              borderRadius: 2, 
              backgroundColor: 'rgba(86, 255, 158, 0.1)',
              border: '1px solid rgba(86, 255, 158, 0.2)'
            }}>
              <Typography variant="body2" sx={{ color: '#56FF9E', fontWeight: 500, mb: 1 }}>
                💡 Como funciona:
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                • Você poderá visualizar o jogo em tempo real<br/>
                • Acompanhar a conversa entre paciente e IA<br/>
                • Finalizar a sessão quando necessário<br/>
                • Não é possível controlar o personagem do paciente
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
