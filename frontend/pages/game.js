import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box, Typography, Alert, Button, CircularProgress } from '@mui/material'
import { Heart, ArrowLeft } from 'lucide-react'
import websocketService from '@/services/websocket.service'

// Importação dinâmica do jogo para evitar problemas de SSR com Pixi.js
const MedicalTriageGame = dynamic(() => import('@/components/game/MedicalTriageGame'), {
  ssr: false,
  loading: () => (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
        <Typography variant="h6" sx={{ fontSize: '1.1rem', color: 'primary.main' }}>
          Carregando DoctorPixel...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Conectando ao servidor...
        </Typography>
      </Box>
    </Box>
  )
})

export default function Game() {
  const router = useRouter()
  const { code } = router.query
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!code) {
      setError('Código de acesso não fornecido')
      setConnectionStatus('error')
      return
    }

    // Conectar ao WebSocket com o código de acesso
    const connectToGame = async () => {
      try {
        setConnectionStatus('connecting')

        // Conectar ao servidor WebSocket
        websocketService.connect('http://localhost:3001')

        // Aguardar conexão
        websocketService.on('connection:success', () => {
          // Enviar código de acesso para validação
          websocketService.emit('game:join', { accessCode: code })
          setConnectionStatus('connected')
        })

        websocketService.on('connection:error', (error) => {
          setError('Erro ao conectar com o servidor')
          setConnectionStatus('error')
        })

        websocketService.on('game:access_denied', () => {
          setError('Código de acesso inválido')
          setConnectionStatus('error')
        })

        websocketService.on('game:access_granted', () => {
          setConnectionStatus('ready')
        })

      } catch (err) {
        setError('Erro ao inicializar o jogo')
        setConnectionStatus('error')
      }
    }

    connectToGame();

    setTimeout(() => {
      setConnectionStatus('ready')
    }, 5000)

    // Cleanup ao desmontar o componente
    return () => {
      websocketService.disconnect()
    }
  }, [code])

  const handleGoBack = () => {
    router.push('/')
  }

  if (connectionStatus === 'error') {
    return (
      <>
        <Head>
          <title>Erro - DoctorPixel</title>
          <meta name="description" content="Erro ao acessar DoctorPixel" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          p: 3
        }}>
          <Box sx={{ textAlign: 'center', maxWidth: 400 }}>
            <Box sx={{ mb: 3 }}>
              <Heart size={64} color="#f44336" />
            </Box>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Ops! Algo deu errado
            </Typography>

            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>

            <Button
              variant="contained"
              startIcon={<ArrowLeft size={20} />}
              onClick={handleGoBack}
              sx={{ borderRadius: 2 }}
            >
              Voltar ao Início
            </Button>
          </Box>
        </Box>
      </>
    )
  }

  if (connectionStatus !== 'ready') {
    return (
      <>
        <Head>
          <title>Conectando - DoctorPixel</title>
          <meta name="description" content="Conectando ao DoctorPixel" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ mb: 4 }}>
              <CircularProgress size={60} thickness={4} />
            </Box>
            <Typography variant="h6" sx={{ fontSize: '1.1rem', color: 'primary.main', mb: 1 }}>
              Conectando ao Jogo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Validando código de acesso: <strong>{code}</strong>
            </Typography>
          </Box>
        </Box>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Jogar - DoctorPixel</title>
        <meta name="description" content="Jogue DoctorPixel - Hospital Virtual" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MedicalTriageGame accessCode={code} />
    </>
  )
}
