import { Stage, Container, Sprite, Text } from '@pixi/react'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { TextStyle } from 'pixi.js'
import GameUI from './GameUI'
import Player from './Player'
import OtherPlayer from './OtherPlayer'
import NPCDoctor from './NPCDoctor'
import Hospital from './Hospital'
import DialogSystem from './DialogSystem'
import TriageSystem from './TriageSystem'
import { useGameStore } from '@/store/gameStore'
import { useAssets } from '@/hooks/useAssets'
import { HOSPITAL_MAP } from '@/data/hospitalMap'
import { CIDADE_MAP } from '@/data/cidadeMap'
import { POLO_NORTE_MAP } from '@/data/poloNorteMap'
import { PLANETA_MAP } from '@/data/planetaMap'
import { initializeCollisionSystem } from '@/utils/collisionSystem'
import websocketService from '@/services/websocket.service'
import useWebSocket from '@/hooks/useWebSocket'

const MedicalTriageGame = ({ onExit, onReconfigure, playerConfig, isDoctor = false, roomData = null }) => {
  const [gameState, setGameState] = useState('loading')
  const [currentDialog, setCurrentDialog] = useState(null)
  const [showTriage, setShowTriage] = useState(false)
  const [roomId, setRoomId] = useState(null)
  const [aiMessages, setAiMessages] = useState([])
  const [isWaitingForAI, setIsWaitingForAI] = useState(false)
  const [otherPlayers, setOtherPlayers] = useState([]) // Posições de outros players para médicos


  const {
    playerPosition,
    playerHealth,
    gameProgress,
    selectedLocation,
    updatePlayerPosition,
    updateGameProgress,
    setSelectedLocation
  } = useGameStore()

  // Hook para acessar finishRoom
  const { finishRoom } = useWebSocket()

  const { isLoading, loadingProgress, error } = useAssets()

  // Mapeamento de localização para tileset e mapa
  const gameEnvironment = useMemo(() => {
    const locationMapping = {
      'fazendinha': {
        tileset: 'tiny-town',
        mapData: HOSPITAL_MAP,
        name: 'Hospital da Fazendinha'
      },
      'cidade': {
        tileset: 'cidade',
        mapData: CIDADE_MAP,
        name: 'Hospital Urbano'
      },
      'polo-norte': {
        tileset: 'polo-norte',
        mapData: POLO_NORTE_MAP,
        name: 'Estação Médica Ártica'
      },
      'planeta': {
        tileset: 'planeta',
        mapData: PLANETA_MAP,
        name: 'Hospital Espacial'
      }
    }

    // Para médicos, usar configuração da sala (localização do paciente)
    // Para pacientes, usar configuração do player
    let gameSelectedLocation = 'fazendinha' // padrão

    if (isDoctor && roomData) {
      // Médico: usar a localização configurada pelo paciente
      try {
        if (roomData.configuracao_paciente) {
          const patientConfig = JSON.parse(roomData.configuracao_paciente)
          gameSelectedLocation = patientConfig.location || 'fazendinha'
          console.log('👨‍⚕️ Médico usando localização do paciente:', gameSelectedLocation)

          // Atualizar store com a localização do paciente para sincronização
          setSelectedLocation(gameSelectedLocation)
        } else if (playerConfig?.location) {
          // Fallback: usar configuração do playerConfig se disponível
          gameSelectedLocation = playerConfig.location
          console.log('👨‍⚕️ Médico usando localização do playerConfig:', gameSelectedLocation)
        } else if (selectedLocation && selectedLocation !== 'fazendinha') {
          // Fallback final: usar localização do store se disponível
          gameSelectedLocation = selectedLocation
          console.log('👨‍⚕️ Médico usando localização do store:', gameSelectedLocation)
        }
      } catch (error) {
        console.error('❌ Erro ao parsear configuração do paciente para localização:', error)
        gameSelectedLocation = selectedLocation || 'fazendinha' // usar store ou padrão em caso de erro
      }
    } else if (playerConfig?.location) {
      // Paciente: usar configuração do player
      gameSelectedLocation = playerConfig.location
      console.log('🎮 Paciente usando localização configurada:', gameSelectedLocation)

      // Atualizar store com a localização selecionada
      setSelectedLocation(gameSelectedLocation)
    } else if (selectedLocation && selectedLocation !== 'fazendinha') {
      // Fallback: usar localização do store se disponível
      gameSelectedLocation = selectedLocation
      console.log('🎮 Usando localização do store:', gameSelectedLocation)
    }

    console.log('🗺️ Localização selecionada:', gameSelectedLocation, 'Ambiente:', locationMapping[gameSelectedLocation]?.name)
    return locationMapping[gameSelectedLocation] || locationMapping['fazendinha']
  }, [playerConfig, isDoctor, roomData, selectedLocation, setSelectedLocation])

  // Configurações do jogo
  const GAME_WIDTH = 1200
  const GAME_HEIGHT = 800

  // Configurar listeners do WebSocket para integração com backend
  useEffect(() => {
    // Obter roomId da URL ou playerConfig
    const currentRoomId = new URLSearchParams(window.location.search).get('code') || playerConfig?.roomId
    if (currentRoomId) {
      setRoomId(currentRoomId)

      // Salvar configuração do paciente no backend (apenas para pacientes)
      if (!isDoctor && playerConfig && !playerConfig.roomData) {
        console.log('💾 Salvando configuração do paciente:', playerConfig)
        websocketService.savePatientConfig(currentRoomId, playerConfig)
      }
    }

    // Configurar listeners para mensagens da IA
    const handleNewMessage = (data) => {
      console.log('📨 Nova mensagem recebida:', data)
      if (data.message && typeof data.message === 'object') {
        const { reply, choices } = data.message
        setAiMessages(prev => [...prev, { type: 'ai', content: reply, choices }])

        // Mostrar diálogo com resposta da IA
        setCurrentDialog({
          npc: 'doctor',
          message: reply,
          options: choices ? choices.map((choice, index) => {
            console.log(`📨 Processando choice ${index}:`, choice)
            console.log(`📨 Tipo de choice ${index}:`, typeof choice)

            // Verificar se choice é um objeto com propriedades option/text ou uma string
            let choiceText = choice
            let choiceOption = choice

            if (typeof choice === 'object' && choice !== null) {
              console.log(`📨 Choice ${index} é objeto:`, Object.keys(choice))
              choiceText = choice.text || choice.option || String(choice)
              choiceOption = choice.option || choice.text || choice
            }

            console.log(`📨 Choice ${index} final text:`, choiceText)

            return {
              text: choiceText,
              action: `ai_choice_${index}`,
              originalChoice: choiceOption
            }
          }).concat([
            { text: '🚪 Encerrar conversa', action: 'close' }
          ]) : [
            { text: 'Continuar', action: 'continue' },
            { text: '🚪 Encerrar conversa', action: 'close' }
          ]
        })
        setIsWaitingForAI(false)
      }
    }

    const handleError = (error) => {
      console.error('❌ Erro do WebSocket:', error)
      setIsWaitingForAI(false)
    }

    // Handler para sincronização de diálogos (apenas para log)
    const handleDialogUpdate = (data) => {
      console.log('🔄 Atualização de diálogo recebida:', data)
      // Médicos não veem diálogos, apenas logs para debug
      if (isDoctor) {
        console.log('👨‍⚕️ Médico recebeu atualização de diálogo:', data.type)
      }
    }

    // Handler para posições de outros players (para médicos)
    const handlePlayerPosition = (data) => {
      if (isDoctor && data.sender !== websocketService.socket?.id) {
        console.log('👤 Posição do player recebida:', data)
        setOtherPlayers(prev => {
          const updated = prev.filter(p => p.id !== data.sender)
          return [...updated, {
            id: data.sender,
            position: data.position,
            timestamp: Date.now()
          }]
        })
      }
    }

    // Registrar listeners
    websocketService.on('newMessage', handleNewMessage)
    websocketService.on('error', handleError)
    websocketService.on('dialogUpdate', handleDialogUpdate)
    websocketService.on('position', handlePlayerPosition)

    return () => {
      websocketService.off('newMessage', handleNewMessage)
      websocketService.off('error', handleError)
      websocketService.off('dialogUpdate', handleDialogUpdate)
      websocketService.off('position', handlePlayerPosition)
    }
  }, [playerConfig, isDoctor])

  useEffect(() => {
    // Aguarda carregamento dos assets
    if (!isLoading && !error) {
      // Inicializa sistema de colisão com o mapa correto
      initializeCollisionSystem(gameEnvironment.mapData.collision, 16, 16, 3)

      const timer = setTimeout(() => {
        setGameState('intro')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isLoading, error, gameEnvironment])

  const handlePlayerMove = useCallback((newPosition) => {
    updatePlayerPosition(newPosition)

    // Sincronizar posição via WebSocket se roomId estiver disponível
    if (roomId) {
      websocketService.movePlayer(newPosition, roomId)
    }

    // Verificar interações com NPCs usando spawn points do mapa
    const doctorSpawn = gameEnvironment.mapData.spawnPoints.doctor
    const doctorPosition = {
      x: doctorSpawn.x * 16 * 3, // Converte tile para pixel (tileSize * scale)
      y: doctorSpawn.y * 16 * 3
    }

    const distance = Math.sqrt(
      Math.pow(newPosition.x - doctorPosition.x, 2) +
      Math.pow(newPosition.y - doctorPosition.y, 2)
    )

    if (distance < 80 && !currentDialog && !isWaitingForAI) {
      let dialogToShow = null

      if (roomId && aiMessages.length === 0) {
        // Primeira interação - usar IA do backend
        console.log('🤖 Iniciando primeira interação com IA')
        setIsWaitingForAI(true)
        websocketService.startFirstInteraction(roomId)

        // Mostrar diálogo de carregamento
        dialogToShow = {
          npc: 'doctor',
          message: 'Olá! Eu sou o Dr. Pixel! 👨‍⚕️ Deixe-me pensar na melhor forma de te ajudar...',
          options: []
        }
      } else {
        // Fallback para sistema local
        dialogToShow = {
          npc: 'doctor',
          message: 'Olá! Eu sou o Dr. Pixel! 👨‍⚕️ Bem-vindo ao nosso hospital virtual! Como você está se sentindo hoje?',
          options: [
            { text: 'Estou bem! 😊', action: 'feeling_good' },
            { text: 'Não estou me sentindo muito bem... 😔', action: 'feeling_bad' },
            { text: 'Quero fazer um check-up! 🔍', action: 'checkup' },
            { text: '🚶‍♂️ Quero explorar o hospital', action: 'close' }
          ]
        }
      }

      if (dialogToShow) {
        setCurrentDialog(dialogToShow)

        // Sincronizar diálogo para médicos (apenas se não for médico)
        if (!isDoctor && roomId) {
          websocketService.syncDialogStarted(roomId, dialogToShow)
        }
      }
    }
  }, [currentDialog, updatePlayerPosition, gameEnvironment, roomId, aiMessages, isWaitingForAI])

  const handleDialogChoice = useCallback((choice) => {
    // Sincronizar escolha para médicos (apenas se não for médico)
    if (!isDoctor && roomId) {
      websocketService.syncDialogChoice(roomId, choice)
    }

    // Verificar se é uma escolha da IA
    if (choice.action.startsWith('ai_choice_') && roomId) {
      console.log('🤖 Enviando resposta para IA:', choice.text)

      // Adicionar mensagem do usuário ao histórico
      setAiMessages(prev => [...prev, { type: 'user', content: choice.text }])

      // Enviar resposta para IA
      setIsWaitingForAI(true)
      websocketService.sendMessageToAI(roomId, choice.text)

      // Mostrar diálogo de carregamento
      setCurrentDialog({
        npc: 'doctor',
        message: 'Deixe-me pensar na melhor resposta para você... 🤔',
        options: []
      })
      return
    }

    // Lógica original para sistema local
    switch (choice.action) {
      case 'feeling_good':
        setCurrentDialog({
          npc: 'doctor',
          message: 'Que ótimo! 🎉 Mesmo assim, que tal fazermos alguns jogos divertidos para garantir que está tudo bem?',
          options: [
            { text: 'Vamos jogar! 🎮', action: 'start_triage' },
            { text: 'Talvez depois...', action: 'close' },
            { text: '🚶‍♂️ Quero explorar o hospital', action: 'close' }
          ]
        })
        break
      case 'feeling_bad':
        setCurrentDialog({
          npc: 'doctor',
          message: 'Não se preocupe! 💙 Vamos descobrir como posso te ajudar através de alguns jogos super divertidos!',
          options: [
            { text: 'Ok, vamos começar! 🌟', action: 'start_triage' },
            { text: '🚶‍♂️ Prefiro explorar primeiro', action: 'close' }
          ]
        })
        break
      case 'checkup':
        setCurrentDialog({
          npc: 'doctor',
          message: 'Excelente ideia! 👍 Prevenção é sempre o melhor remédio! Vamos começar nossa aventura médica!',
          options: [
            { text: 'Estou pronto! 🚀', action: 'start_triage' },
            { text: '🚶‍♂️ Quero conhecer o hospital primeiro', action: 'close' }
          ]
        })
        break
      case 'start_triage':
      case 'restart_triage':
        setCurrentDialog(null)
        setShowTriage(true)
        updateGameProgress('triage_started')
        break
      case 'continue':
      case 'close':
        // Sincronizar fim do diálogo para médicos (apenas se não for médico)
        if (!isDoctor && roomId) {
          websocketService.syncDialogEnded(roomId)
        }

        // Se estamos em uma sessão com IA (roomId existe), usar finishRoom
        if (roomId && aiMessages.length > 0) {
          console.log('🏁 Finalizando sessão com IA usando finishRoom')
          finishRoom(roomId, 'Paciente encerrou a conversa e está explorando o ambiente')
        }
        setCurrentDialog(null)
        break
    }
  }, [updateGameProgress, roomId, finishRoom, aiMessages.length])

  const handleTriageComplete = useCallback((results) => {
    setShowTriage(false)
    updateGameProgress('triage_completed')

    // Mostrar resultados baseados na triagem
    const severity = results.severity || 'low'
    let message = ''

    switch (severity) {
      case 'high':
        message = '🚨 Vamos cuidar de você rapidinho! Você precisa de atenção médica urgente. Não se preocupe, nossa equipe está aqui para ajudar!'
        break
      case 'medium':
        message = '⚠️ Você precisa de alguns cuidados médicos. Vamos agendar uma consulta para você em breve!'
        break
      default:
        message = '✅ Parabéns! Você está muito bem! Continue cuidando da sua saúde e volte sempre que precisar!'
    }

    setCurrentDialog({
      npc: 'doctor',
      message: message,
      options: [
        { text: 'Obrigado, Dr. Pixel! 💖', action: 'close' },
        { text: 'Posso jogar de novo? 🔄', action: 'restart_triage' },
        { text: '🚶‍♂️ Vou explorar o hospital', action: 'close' }
      ]
    })
  }, [updateGameProgress])

  if (gameState === 'loading' || isLoading) {
    return (
      <div
        className="w-full h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #131F24 0%, #1A2B33 50%, #0F1A1F 100%)'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #56FF9E 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #4ECDC4 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated Background Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-20 animate-pulse"
               style={{ background: 'radial-gradient(circle, #56FF9E 0%, transparent 70%)' }}></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15 animate-pulse"
               style={{ background: 'radial-gradient(circle, #4ECDC4 0%, transparent 70%)', animationDelay: '1s' }}></div>
        </div>

        <div className="text-center text-white relative z-10">
          {/* Hospital Icon with Glow */}
          <div className="relative mb-6">
            <div className="text-8xl mb-4 animate-bounce filter drop-shadow-lg"
                 style={{
                   filter: 'drop-shadow(0 0 20px #56FF9E)',
                   animationDuration: '2s'
                 }}>
              🏥
            </div>
            <div className="absolute inset-0 text-8xl mb-4 animate-ping opacity-30"
                 style={{ color: '#56FF9E', animationDuration: '3s' }}>
              🏥
            </div>
          </div>

          {/* Title with Gradient */}
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white via-[#56FF9E] to-[#4ECDC4] bg-clip-text text-transparent">
            Carregando Hospital Virtual...
          </h2>

          <div className="text-lg mb-6 text-gray-300 animate-pulse">
            {isLoading ? 'Carregando assets do jogo...' : 'Preparando a aventura médica!'}
          </div>

          {/* Enhanced Progress Bar */}
          {isLoading && (
            <div className="w-80 mx-auto mb-6">
              <div className="relative">
                <div className="bg-gray-700 bg-opacity-50 rounded-full h-3 mb-3 backdrop-blur-sm border border-gray-600">
                  <div
                    className="rounded-full h-3 transition-all duration-500 relative overflow-hidden"
                    style={{
                      width: `${loadingProgress}%`,
                      background: 'linear-gradient(90deg, #56FF9E 0%, #4ECDC4 50%, #56FF9E 100%)',
                      boxShadow: '0 0 20px rgba(86, 255, 158, 0.5)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                  </div>
                </div>
                <div className="text-sm text-[#56FF9E] font-medium">
                  {Math.round(loadingProgress)}% carregado
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Error Display */}
          {error && (
            <div className="mt-6 p-6 rounded-2xl border border-red-500 border-opacity-30 backdrop-blur-sm"
                 style={{
                   background: 'rgba(255, 107, 107, 0.1)',
                   boxShadow: '0 8px 32px rgba(255, 107, 107, 0.2)'
                 }}>
              <div className="text-red-300 text-sm mb-2 flex items-center justify-center">
                <span className="text-xl mr-2">⚠️</span>
                Erro ao carregar assets: {error}
              </div>
              <div className="text-xs text-red-400 opacity-80">
                O jogo continuará com gráficos básicos
              </div>
            </div>
          )}

          {/* Loading Tips */}
          <div className="mt-8 text-xs text-gray-400 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <span>💡 Dica: Use WASD para se mover</span>
              <span>•</span>
              <span>🎮 Interaja com NPCs</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #131F24 0%, #1A2B33 50%, #0F1A1F 100%)'
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, #56FF9E 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, #4ECDC4 1px, transparent 1px),
            radial-gradient(circle at 40% 60%, #FFD93D 0.5px, transparent 0.5px)
          `,
          backgroundSize: '60px 60px, 80px 80px, 40px 40px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20 animate-pulse"
            style={{
              background: i % 3 === 0 ? '#56FF9E' : i % 3 === 1 ? '#4ECDC4' : '#FFD93D',
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>

      {/* Game Container with Glass Effect */}
      <div className="relative">
        {/* Glow Effect Behind Stage */}
        <div
          className="absolute -inset-4 rounded-3xl opacity-30 blur-xl"
          style={{
            background: 'linear-gradient(45deg, #56FF9E, #4ECDC4, #56FF9E)',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />

        {/* Stage Container with Border */}
        <div
          className="relative rounded-2xl overflow-hidden border-2 backdrop-blur-sm"
          style={{
            borderColor: 'rgba(86, 255, 158, 0.3)',
            boxShadow: `
              0 0 50px rgba(86, 255, 158, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          {/* Interface do jogo Pixi.js */}
          <Stage
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            options={{
              backgroundColor: 0x1A2B33, // Cor do tema secundário
              antialias: true,
              resolution: window.devicePixelRatio || 1,
              autoDensity: true
            }}
          >
            <Container>
              {/* Cenário do Hospital */}
              <Hospital
                tilesetName={gameEnvironment.tileset}
                mapData={gameEnvironment.mapData}
              />

              {/* NPC Doutor */}
              <NPCDoctor
                x={gameEnvironment.mapData.spawnPoints.doctor.x * 16 * 3}
                y={gameEnvironment.mapData.spawnPoints.doctor.y * 16 * 3}
                isInteracting={currentDialog?.npc === 'doctor'}
                doctorConfig={playerConfig?.doctor}
              />

              {/* Player - apenas mostrar se não for médico */}
              {!isDoctor && (
                <Player
                  x={playerPosition.x}
                  y={playerPosition.y}
                  onMove={handlePlayerMove}
                  characterConfig={playerConfig}
                  roomId={roomId}
                />
              )}

              {/* Outros Players - para médicos visualizarem */}
              {isDoctor && otherPlayers.map(player => {
                // Validar dados antes de renderizar
                if (!player || !player.position || typeof player.position.x !== 'number' || typeof player.position.y !== 'number') {
                  console.warn('⚠️ Dados inválidos do player:', player)
                  return null
                }

                const playerName = roomData?.nome_paciente
                console.log('🎮 Renderizando OtherPlayer:', {
                  playerId: player.id,
                  playerName,
                  position: player.position,
                  characterConfig: playerConfig?.originalPatientConfig
                })

                return (
                  <OtherPlayer
                    key={player.id}
                    x={player.position.x}
                    y={player.position.y}
                    playerName={typeof playerName === 'string' ? playerName : 'Paciente'}
                  />
                )
              }).filter(Boolean)}
            </Container>
          </Stage>
        </div>
      </div>

      {/* UI Overlay */}
      <GameUI
        playerHealth={playerHealth}
        gameProgress={gameProgress}
        onExit={onExit}
        onReconfigure={isDoctor ? null : onReconfigure} // Médicos não podem reconfigurar
        environmentName={gameEnvironment.name}
        showInstructions={!isDoctor}
        isDoctor={isDoctor}
        roomId={roomId}
        aiMessages={aiMessages}
        roomData={roomData}
      />

      {/* Sistema de Diálogos - Apenas para pacientes */}
      {!isDoctor && currentDialog && (
        <DialogSystem
          dialog={currentDialog}
          onChoice={handleDialogChoice}
          onClose={() => setCurrentDialog(null)}
        />
      )}

      {/* Sistema de Triagem */}
      {showTriage && (
        <TriageSystem
          onComplete={handleTriageComplete}
          onClose={() => setShowTriage(false)}
        />
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default MedicalTriageGame
