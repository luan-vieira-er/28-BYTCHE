import { Stage, Container, Sprite, Text } from '@pixi/react'
import { useState, useCallback, useEffect } from 'react'
import { TextStyle } from 'pixi.js'
import GameUI from './GameUI'
import Player from './Player'
import NPCDoctor from './NPCDoctor'
import Hospital from './Hospital'
import DialogSystem from './DialogSystem'
import TriageSystem from './TriageSystem'
import { useGameStore } from '@/store/gameStore'

const MedicalTriageGame = ({ onExit }) => {
  const [gameState, setGameState] = useState('loading')
  const [currentDialog, setCurrentDialog] = useState(null)
  const [showTriage, setShowTriage] = useState(false)
  
  const {
    playerPosition,
    playerHealth,
    gameProgress,
    updatePlayerPosition,
    updateGameProgress
  } = useGameStore()

  // Configurações do jogo
  const GAME_WIDTH = 1200
  const GAME_HEIGHT = 800

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => {
      setGameState('intro')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handlePlayerMove = useCallback((newPosition) => {
    updatePlayerPosition(newPosition)
    
    // Verificar interações com NPCs
    const doctorPosition = { x: 600, y: 400 }
    const distance = Math.sqrt(
      Math.pow(newPosition.x - doctorPosition.x, 2) + 
      Math.pow(newPosition.y - doctorPosition.y, 2)
    )
    
    if (distance < 80 && !currentDialog) {
      setCurrentDialog({
        npc: 'doctor',
        message: 'Olá! Eu sou o Dr. Pixel! 👨‍⚕️ Bem-vindo ao nosso hospital virtual! Como você está se sentindo hoje?',
        options: [
          { text: 'Estou bem! 😊', action: 'feeling_good' },
          { text: 'Não estou me sentindo muito bem... 😔', action: 'feeling_bad' },
          { text: 'Quero fazer um check-up! 🔍', action: 'checkup' }
        ]
      })
    }
  }, [currentDialog, updatePlayerPosition])

  const handleDialogChoice = useCallback((choice) => {
    switch (choice.action) {
      case 'feeling_good':
        setCurrentDialog({
          npc: 'doctor',
          message: 'Que ótimo! 🎉 Mesmo assim, que tal fazermos alguns jogos divertidos para garantir que está tudo bem?',
          options: [
            { text: 'Vamos jogar! 🎮', action: 'start_triage' },
            { text: 'Talvez depois...', action: 'close' }
          ]
        })
        break
      case 'feeling_bad':
        setCurrentDialog({
          npc: 'doctor',
          message: 'Não se preocupe! 💙 Vamos descobrir como posso te ajudar através de alguns jogos super divertidos!',
          options: [
            { text: 'Ok, vamos começar! 🌟', action: 'start_triage' }
          ]
        })
        break
      case 'checkup':
        setCurrentDialog({
          npc: 'doctor',
          message: 'Excelente ideia! 👍 Prevenção é sempre o melhor remédio! Vamos começar nossa aventura médica!',
          options: [
            { text: 'Estou pronto! 🚀', action: 'start_triage' }
          ]
        })
        break
      case 'start_triage':
        setCurrentDialog(null)
        setShowTriage(true)
        updateGameProgress('triage_started')
        break
      case 'close':
        setCurrentDialog(null)
        break
    }
  }, [updateGameProgress])

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
        { text: 'Posso jogar de novo? 🔄', action: 'restart_triage' }
      ]
    })
  }, [updateGameProgress])

  if (gameState === 'loading') {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-bounce text-6xl mb-4">🏥</div>
          <h2 className="text-2xl font-bold mb-2">Carregando Hospital Virtual...</h2>
          <div className="animate-pulse">Preparando a aventura médica!</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden">
      {/* Interface do jogo Pixi.js */}
      <Stage 
        width={GAME_WIDTH} 
        height={GAME_HEIGHT}
        options={{ 
          backgroundColor: 0x87CEEB,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true
        }}
        className="mx-auto"
      >
        <Container>
          {/* Cenário do Hospital */}
          <Hospital />
          
          {/* NPC Doutor */}
          <NPCDoctor 
            x={600} 
            y={400} 
            isInteracting={currentDialog?.npc === 'doctor'}
          />
          
          {/* Player */}
          <Player 
            x={playerPosition.x} 
            y={playerPosition.y}
            onMove={handlePlayerMove}
          />
        </Container>
      </Stage>

      {/* UI Overlay */}
      <GameUI 
        playerHealth={playerHealth}
        gameProgress={gameProgress}
        onExit={onExit}
      />

      {/* Sistema de Diálogos */}
      {currentDialog && (
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
    </div>
  )
}

export default MedicalTriageGame
