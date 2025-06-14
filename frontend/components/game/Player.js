import { Container, Graphics, Text } from '@pixi/react'
import { useCallback, useEffect, useState } from 'react'
import { TextStyle } from 'pixi.js'
import { useGameStore } from '@/store/gameStore'
import { getCollisionSystem } from '@/utils/collisionSystem'
import CharacterSprite from './CharacterSprite'
import { getCharacterConfig, getCharacterSpriteId } from '@/utils/characterMapping'

const Player = ({ x, y, onMove, characterConfig, roomId, onMissionComplete }) => {
  const [isMoving, setIsMoving] = useState(false)
  const [direction, setDirection] = useState('down')
  const [animationFrame, setAnimationFrame] = useState(0)

  const {
    playerName,
    playerAvatar,
    missionProgress,
    incrementExploredAreas
  } = useGameStore()

  // Estado para tracking de áreas exploradas
  const [exploredAreas, setExploredAreas] = useState(new Set())

  // Obtém configuração do personagem selecionado usando o mapeamento
  const mappedCharacter = getCharacterConfig(characterConfig)
  const characterId = getCharacterSpriteId(characterConfig?.character)
  const characterName = mappedCharacter.name || playerName || 'Jogador'

  // Animação de caminhada (mantida para compatibilidade)
  useEffect(() => {
    if (!isMoving) return

    const interval = setInterval(() => {
      setAnimationFrame(frame => (frame + 1) % 4)
    }, 200)

    return () => clearInterval(interval)
  }, [isMoving])

  // Controles de movimento (sistema original restaurado)
  useEffect(() => {
    const handleKeyPress = (event) => {
      const speed = 5
      let newX = x
      let newY = y
      let newDirection = direction

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          newY = y - speed
          newDirection = 'up'
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          newY = y + speed
          newDirection = 'down'
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newX = x - speed
          newDirection = 'left'
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          newX = x + speed
          newDirection = 'right'
          break
        default:
          return
      }

      // Verifica colisão se o sistema estiver disponível
      const collisionSystem = getCollisionSystem()
      if (collisionSystem) {
        const resolvedPosition = collisionSystem.resolveCollision(
          x, y, newX, newY, 32, 32 // Tamanho do player
        )
        newX = resolvedPosition.x
        newY = resolvedPosition.y
      } else {
        // Fallback: limites básicos da tela
        newX = Math.max(50, Math.min(1150, newX))
        newY = Math.max(50, Math.min(750, newY))
      }

      if (newX !== x || newY !== y) {
        setDirection(newDirection)
        setIsMoving(true)
        onMove({ x: newX, y: newY })

        // Sistema de exploração - detectar áreas visitadas
        const currentArea = getAreaFromPosition(newX, newY)
        if (currentArea && !exploredAreas.has(currentArea)) {
          setExploredAreas(prev => {
            const newSet = new Set(prev)
            newSet.add(currentArea)

            // Incrementar contador de áreas exploradas no store
            if (newSet.size <= 3) {
              console.log(`🗺️ Nova área explorada: ${currentArea} (${newSet.size}/3)`)
              incrementExploredAreas()

              // Completar missão quando explorar 3 áreas
              if (newSet.size === 3 && onMissionComplete) {
                onMissionComplete({
                  id: 2,
                  title: "Explorar o Hospital",
                  description: "Visite todas as áreas do hospital",
                  icon: "🏥"
                })
              }
            }

            return newSet
          })
        }

        // Parar animação após um tempo
        setTimeout(() => setIsMoving(false), 300)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [x, y, direction, onMove, exploredAreas, incrementExploredAreas, onMissionComplete])

  // Função para detectar área baseada na posição
  const getAreaFromPosition = useCallback((posX, posY) => {
    // Dividir o mapa em 3 áreas principais baseadas na posição
    const mapWidth = 1200
    const mapHeight = 800

    // Área esquerda (0-400px)
    if (posX < mapWidth / 3) {
      return 'area_left'
    }
    // Área central (400-800px)
    else if (posX < (mapWidth * 2) / 3) {
      return 'area_center'
    }
    // Área direita (800-1200px)
    else {
      return 'area_right'
    }
  }, [])

  // Funções de cor mantidas para fallback
  const getAvatarColor = (avatar) => {
    const colors = {
      Jorge: 0x3182CE, // Azul
      Ana: 0xE53E3E, // Vermelho
      Zombie: 0x38A169, // Verde
      erik: 0x9F7AEA, // Roxo
      child1: 0x3182CE,
      child2: 0xE53E3E,
      child3: 0x38A169,
      child4: 0x9F7AEA,
      child5: 0xF56500  // Laranja
    }
    return colors[avatar] || colors[characterId] || colors.child1
  }



  return (
    <CharacterSprite
      characterId={characterId}
      x={x}
      y={y}
      scale={0.5} // Reduzido para sprites HD (192x256 -> ~96x128)
      isMoving={isMoving}
      direction={direction}
      showName={true}
      name={characterName}
      showShadow={true}
      fallbackColor={mappedCharacter.fallbackColor || getAvatarColor(playerAvatar)}
      onSpriteLoad={(spriteData) => {
        console.log(`✅ Sprite do jogador carregado: ${characterId}`, spriteData)
        console.log(`🎭 Personagem mapeado:`, mappedCharacter)
      }}
    />
  )
}

export default Player
