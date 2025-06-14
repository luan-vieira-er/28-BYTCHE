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
  const { code, type } = router.query // Adicionar type para identificar se é médico
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  const [error, setError] = useState('')
  const [showConfigStepper, setShowConfigStepper] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [playerConfig, setPlayerConfig] = useState(null)
  const [isDoctor, setIsDoctor] = useState(false)
  const [roomData, setRoomData] = useState(null)
  const [waitingForPlayer, setWaitingForPlayer] = useState(false)

  // Verificar se há configuração salva para este código
  const getStorageKey = (code) => `doctorPixel-playerConfig-${code}`

  // Função para buscar dados da sala do backend (para médicos)
  const fetchRoomData = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:3000/room/${roomId}`)
      if (response.ok) {
        const data = await response.json()
        console.log('🏥 Dados da sala obtidos:', data)
        return data
      }
    } catch (error) {
      console.error('❌ Erro ao buscar dados da sala:', error)
    }
    return null
  }

  // Função para criar configuração do médico baseada na configuração do paciente
  const createDoctorConfigFromRoom = (roomData) => {
    if (!roomData || !roomData.configuracao_paciente) {
      console.warn('⚠️ Dados da sala ou configuração do paciente não encontrados')
      return null
    }

    try {
      const patientConfig = JSON.parse(roomData.configuracao_paciente)
      console.log('👨‍⚕️ Configuração do paciente encontrada:', patientConfig)

      // Médico usa a mesma configuração de ambiente que o paciente
      return {
        character: 'erik', // Médico sempre usa erik (ou pode ser configurável)
        doctor: 'erik',
        location: patientConfig.location || 'fazendinha',
        playerName: roomData.nome_paciente || 'Paciente',
        roomData: roomData,
        // Manter configuração original do paciente para referência
        originalPatientConfig: patientConfig
      }
    } catch (error) {
      console.error('❌ Erro ao parsear configuração do paciente:', error)
      return null
    }
  }



  useEffect(() => {
    if (!code) {
      setError('Código de acesso não fornecido')
      setConnectionStatus('error')
      return
    }

    // Verificar se é médico baseado no parâmetro type
    const isDoctorAccess = type === 'doctor'
    setIsDoctor(isDoctorAccess)
    console.log('👨‍⚕️ Tipo de acesso:', isDoctorAccess ? 'Médico' : 'Paciente')

    // Se for médico, verificar se player já configurou a sala
    if (isDoctorAccess) {
      console.log('👨‍⚕️ Acesso de médico detectado - verificando status da sala')
      setWaitingForPlayer(true)

      fetchRoomData(code).then(data => {
        if (data && data.status && data.status !== 'AGUARDANDO_PACIENTE') {
          // Player já configurou e entrou
          console.log('👨‍⚕️ Player já configurou a sala:', data)
          setRoomData(data)

          // Criar configuração do médico baseada na configuração do paciente
          const doctorConfig = createDoctorConfigFromRoom(data)
          if (doctorConfig) {
            setPlayerConfig(doctorConfig)
            console.log('👨‍⚕️ Configuração do médico criada:', doctorConfig)
          }

          setWaitingForPlayer(false)
        } else {
          // Player ainda não configurou
          console.log('👨‍⚕️ Aguardando player configurar a sala...')
          setWaitingForPlayer(true)
        }
      })
    } else {
      // Verificar se há configuração salva para este código (apenas para pacientes)
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
    }

    // Conectar ao WebSocket com o código de acesso
    const connectToGame = async () => {
      try {
        setConnectionStatus('connecting')

        // Conectar ao servidor WebSocket passando o código de acesso
        if (isDoctorAccess) {
          // Para médicos, só conectar se player já configurou
          if (!waitingForPlayer) {
            websocketService.connect('http://localhost:3001')
            // Aguardar conexão e então entrar na sala como médico
            setTimeout(() => {
              websocketService.joinRoomAsDoctor(code)
            }, 1000)
          }
        } else {
          // Para pacientes, usar o fluxo normal
          websocketService.connect('http://localhost:3001', code)
        }

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

          if (isDoctorAccess) {
            // Para médicos, ir direto para o jogo sem configuração
            console.log('👨‍⚕️ Médico conectado, indo direto para visualização')
            setWaitingForPlayer(false)
            setShowGame(true)
          } else {
            // Para pacientes, verificar configuração salva
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
          }
        })

        // Listener para médicos aguardando player configurar
        websocketService.on('playerConfigured', (roomData) => {
          console.log('👨‍⚕️ Player configurou a sala:', roomData)
          if (isDoctorAccess && waitingForPlayer) {
            setRoomData(roomData)

            // Criar configuração do médico baseada na configuração do paciente
            const doctorConfig = createDoctorConfigFromRoom(roomData)
            if (doctorConfig) {
              setPlayerConfig(doctorConfig)
              console.log('👨‍⚕️ Configuração do médico criada:', doctorConfig)
            }

            setWaitingForPlayer(false)
            // Conectar agora que player configurou
            websocketService.connect('http://localhost:3001')
            setTimeout(() => {
              websocketService.joinRoomAsDoctor(code)
            }, 1000)
          }
        })

        // Fallback - se não receber resposta em 5 segundos, assumir sucesso para desenvolvimento
        setTimeout(() => {
          if (connectionStatus === 'connecting') {
            console.log('⚠️ Timeout - assumindo sucesso para desenvolvimento')
            setConnectionStatus('ready')

            if (isDoctorAccess) {
              // Para médicos, só ir para o jogo se não estiver aguardando player
              if (!waitingForPlayer) {
                console.log('👨‍⚕️ Médico conectado via timeout, indo direto para visualização')
                setShowGame(true)
              } else {
                console.log('👨‍⚕️ Médico ainda aguardando player configurar...')
              }
            } else {
              // Para pacientes, verificar configuração salva
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
  }, [code, type])

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

  // Tela de espera para médicos aguardando player
  if (isDoctor && waitingForPlayer) {
    return (
      <>
        <Head>
          <title>Aguardando Paciente - DoctorPixel</title>
          <meta name="description" content="Aguardando paciente configurar sessão" />
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
          <Card sx={{
            maxWidth: 600,
            width: '100%',
            background: 'rgba(26, 43, 51, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(86, 255, 158, 0.2)',
            borderRadius: 4,
            textAlign: 'center'
          }}>
            <CardContent sx={{ p: 6 }}>
              <Box sx={{ mb: 4 }}>
                <div className="animate-pulse text-6xl mb-4">👨‍⚕️</div>
                <Typography variant="h4" sx={{
                  fontWeight: 700,
                  color: 'white',
                  mb: 2,
                  background: 'linear-gradient(135deg, #56FF9E 0%, #4ECDC4 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Aguardando Paciente
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  O paciente ainda não configurou a sessão. Aguarde enquanto ele escolhe seu personagem e ambiente.
                </Typography>
              </Box>

              <Box sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(86, 255, 158, 0.1)',
                border: '1px solid rgba(86, 255, 158, 0.2)',
                mb: 4
              }}>
                <Typography variant="body2" sx={{ color: '#56FF9E', fontWeight: 500, mb: 2 }}>
                  📋 Código da Sessão
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', fontFamily: 'monospace' }}>
                  {code}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <CircularProgress size={24} sx={{ color: '#56FF9E', mr: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Conectando automaticamente quando o paciente estiver pronto...
                </Typography>
              </Box>

              <Button
                variant="outlined"
                onClick={handleGoBack}
                sx={{
                  borderColor: '#4ECDC4',
                  color: '#4ECDC4',
                  '&:hover': {
                    borderColor: '#56FF9E',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    color: '#56FF9E'
                  }
                }}
              >
                Voltar
              </Button>
            </CardContent>
          </Card>
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
          isDoctor={isDoctor}
          roomData={roomData}
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
