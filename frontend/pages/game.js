import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box, Typography, Alert, Button, CircularProgress } from '@mui/material'
import { Heart, ArrowLeft } from 'lucide-react'
import websocketService from '@/services/websocket.service'
import ConfigStepper from '@/components/game/ConfigStepper'

// Importação dinâmica do jogo para evitar problemas de SSR com Pixi.js
const MedicalTriageGame = dynamic(() => import('@/components/game/MedicalTriageGame'), {
  ssr: false,
  loading: () => (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #131F24 0%, #0A1015 100%)'
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
        </Box>
        <Typography variant="h6" sx={{ fontSize: '1.1rem', color: 'primary.main' }}>
          Carregando DoctorPixel...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Preparando o jogo...
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
  const [showConfigStepper, setShowConfigStepper] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [playerConfig, setPlayerConfig] = useState(null)

  // Verificar se há configuração salva para este código
  const getStorageKey = (code) => `doctorPixel-playerConfig-${code}`

  useEffect(() => {
    if (!code) {
      setError('Código de acesso não fornecido')
      setConnectionStatus('error')
      return
    }

    // Verificar se há configuração salva para este código
    const savedConfig = localStorage.getItem(getStorageKey(code))
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        console.log('🔄 Configuração encontrada para reload:', parsedConfig)
        setPlayerConfig(parsedConfig)
      } catch (err) {
        console.warn('⚠️ Erro ao carregar configuração salva:', err)
        localStorage.removeItem(getStorageKey(code))
      }
    }

    // Conectar ao WebSocket com o código de acesso
    const connectToGame = async () => {
      try {
        setConnectionStatus('connecting')

        // Conectar ao servidor WebSocket passando o código de acesso
        // O websocket service agora chama automaticamente patientJoinRoom após conexão
        websocketService.connect('http://localhost:3001', code)

        websocketService.on('connection:error', (error) => {
          console.error('❌ Erro de conexão:', error)
          setError('Erro ao conectar com o servidor')
          setConnectionStatus('error')
        })

        // Eventos do backend
        websocketService.on('error', (errorMessage) => {
          console.error('❌ Erro do backend:', errorMessage)
          setError(errorMessage || 'Código de acesso inválido')
          setConnectionStatus('error')
        })

        websocketService.on('patientJoined', (message) => {
          console.log('✅ Paciente entrou na sala:', message)
          setConnectionStatus('ready')

          // Verificar se já há configuração salva
          const savedConfig = localStorage.getItem(getStorageKey(code))
          if (savedConfig) {
            try {
              const parsedConfig = JSON.parse(savedConfig)
              console.log('🎮 Configuração encontrada, indo direto para o jogo:', parsedConfig)
              setPlayerConfig(parsedConfig)
              setShowGame(true)
            } catch (err) {
              console.warn('⚠️ Erro ao carregar configuração salva:', err)
              localStorage.removeItem(getStorageKey(code))
              setShowConfigStepper(true)
            }
          } else {
            console.log('⚙️ Nenhuma configuração encontrada, mostrando ConfigStepper')
            setShowConfigStepper(true)
          }
        })

        // Fallback - se não receber resposta em 5 segundos, assumir sucesso para desenvolvimento
        setTimeout(() => {
          if (connectionStatus === 'connecting') {
            console.log('⚠️ Timeout - assumindo sucesso para desenvolvimento')
            setConnectionStatus('ready')

            // Verificar se já há configuração salva
            const savedConfig = localStorage.getItem(getStorageKey(code))
            if (savedConfig) {
              try {
                const parsedConfig = JSON.parse(savedConfig)
                console.log('🎮 Configuração encontrada no timeout, indo direto para o jogo:', parsedConfig)
                setPlayerConfig(parsedConfig)
                setShowGame(true)
              } catch (err) {
                console.warn('⚠️ Erro ao carregar configuração salva no timeout:', err)
                localStorage.removeItem(getStorageKey(code))
                setShowConfigStepper(true)
              }
            } else {
              console.log('⚙️ Nenhuma configuração encontrada no timeout, mostrando ConfigStepper')
              setShowConfigStepper(true)
            }
          }
        }, 5000)

      } catch (err) {
        console.error('❌ Erro ao inicializar:', err)
        setError('Erro ao inicializar o jogo')
        setConnectionStatus('error')
      }
    }

    connectToGame();

    // Simulação removida - agora usando integração real com backend

    // Cleanup ao desmontar o componente
    return () => {
      websocketService.disconnect()
    }
  }, [code])

  const handleGoBack = () => {
    // Limpar configuração salva ao sair do jogo
    if (code) {
      localStorage.removeItem(getStorageKey(code))
      console.log('🗑️ Configuração removida ao sair do jogo')
    }
    router.push('/')
  }

  const handleConfigStepperComplete = (config) => {
    console.log('💾 Salvando configuração do jogador:', config)

    // Salvar configuração no localStorage para este código específico
    localStorage.setItem(getStorageKey(code), JSON.stringify(config))

    setPlayerConfig(config)
    setShowConfigStepper(false)
    setShowGame(true)
  }

  const handleConfigStepperClose = () => {
    // Se o usuário fechar o stepper sem completar, volta para a landing page
    router.push('/')
  }

  const handleReconfigure = () => {
    console.log('🔄 Reconfigurando personagem...')
    // Limpar configuração salva
    if (code) {
      localStorage.removeItem(getStorageKey(code))
    }
    // Voltar para o ConfigStepper
    setPlayerConfig(null)
    setShowGame(false)
    setShowConfigStepper(true)
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
          background: 'linear-gradient(135deg, #131F24 0%, #0A1015 100%)'
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

  // Se deve mostrar o jogo
  if (showGame) {
    return (
      <>
        <Head>
          <title>Jogar - DoctorPixel</title>
          <meta name="description" content="Jogue DoctorPixel - Hospital Virtual" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <MedicalTriageGame
          accessCode={code}
          playerConfig={playerConfig}
          onExit={handleGoBack}
          onReconfigure={handleReconfigure}
        />
      </>
    )
  }

  // Se deve mostrar o ConfigStepper
  if (showConfigStepper) {
    return (
      <>
        <Head>
          <title>Configuração - DoctorPixel</title>
          <meta name="description" content="Configure seu personagem no DoctorPixel" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #131F24 0%, #0A1015 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
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

          <ConfigStepper
            open={true}
            onComplete={handleConfigStepperComplete}
            onClose={handleConfigStepperClose}
          />
        </Box>
      </>
    )
  }

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
        background: 'linear-gradient(135deg, #131F24 0%, #0A1015 100%)'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 4 }}>
            <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
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
