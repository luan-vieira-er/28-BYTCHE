import { Container, Graphics, Text } from '@pixi/react'
import { useCallback, useEffect, useState } from 'react'
import { TextStyle } from 'pixi.js'
import { useGameStore } from '@/store/gameStore'

const Player = ({ x, y, onMove }) => {
  const [isMoving, setIsMoving] = useState(false)
  const [direction, setDirection] = useState('down')
  const [animationFrame, setAnimationFrame] = useState(0)
  
  const { playerName, playerAvatar } = useGameStore()

  // Animação de caminhada
  useEffect(() => {
    if (!isMoving) return
    
    const interval = setInterval(() => {
      setAnimationFrame(frame => (frame + 1) % 4)
    }, 200)
    
    return () => clearInterval(interval)
  }, [isMoving])

  // Controles de movimento
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
          newY = Math.max(50, y - speed)
          newDirection = 'up'
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          newY = Math.min(750, y + speed)
          newDirection = 'down'
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newX = Math.max(50, x - speed)
          newDirection = 'left'
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          newX = Math.min(1150, x + speed)
          newDirection = 'right'
          break
        default:
          return
      }
      
      if (newX !== x || newY !== y) {
        setDirection(newDirection)
        setIsMoving(true)
        onMove({ x: newX, y: newY })
        
        // Parar animação após um tempo
        setTimeout(() => setIsMoving(false), 300)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [x, y, direction, onMove])

  // Desenhar o player
  const drawPlayer = useCallback((g) => {
    g.clear()
    
    // Sombra
    g.beginFill(0x000000, 0.2)
    g.drawEllipse(0, 35, 25, 8)
    g.endFill()
    
    // Corpo principal
    const bodyColor = getAvatarColor(playerAvatar)
    g.beginFill(bodyColor)
    g.drawRoundedRect(-15, -30, 30, 50, 8)
    g.endFill()
    
    // Cabeça
    g.beginFill(0xFFDBB3) // Cor da pele
    g.drawCircle(0, -40, 18)
    g.endFill()
    
    // Cabelo
    const hairColor = getHairColor(playerAvatar)
    g.beginFill(hairColor)
    g.drawEllipse(0, -50, 20, 15)
    g.endFill()
    
    // Olhos
    g.beginFill(0x000000)
    g.drawCircle(-6, -42, 2)
    g.drawCircle(6, -42, 2)
    g.endFill()
    
    // Sorriso
    g.lineStyle(2, 0x000000)
    g.arc(0, -35, 8, 0, Math.PI)
    
    // Braços (animação simples)
    g.lineStyle(6, 0xFFDBB3)
    const armOffset = isMoving ? Math.sin(animationFrame) * 5 : 0
    g.moveTo(-15, -15 + armOffset)
    g.lineTo(-25, 0 - armOffset)
    g.moveTo(15, -15 - armOffset)
    g.lineTo(25, 0 + armOffset)
    
    // Pernas (animação de caminhada)
    g.lineStyle(8, 0x4A5568) // Cor da calça
    const legOffset = isMoving ? Math.sin(animationFrame * 2) * 8 : 0
    g.moveTo(-8, 20)
    g.lineTo(-8 + legOffset, 40)
    g.moveTo(8, 20)
    g.lineTo(8 - legOffset, 40)
    
    // Sapatos
    g.beginFill(0x2D3748)
    g.drawEllipse(-8 + legOffset, 42, 8, 4)
    g.drawEllipse(8 - legOffset, 42, 8, 4)
    g.endFill()
    
  }, [playerAvatar, isMoving, animationFrame])

  const getAvatarColor = (avatar) => {
    const colors = {
      child1: 0x3182CE, // Azul
      child2: 0xE53E3E, // Vermelho
      child3: 0x38A169, // Verde
      child4: 0x9F7AEA, // Roxo
      child5: 0xF56500  // Laranja
    }
    return colors[avatar] || colors.child1
  }

  const getHairColor = (avatar) => {
    const colors = {
      child1: 0x8B4513, // Marrom
      child2: 0x000000, // Preto
      child3: 0xFFD700, // Loiro
      child4: 0x8B0000, // Ruivo
      child5: 0x654321  // Castanho
    }
    return colors[avatar] || colors.child1
  }

  const nameStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 14,
    fill: 0x000000,
    fontWeight: 'bold',
    dropShadow: true,
    dropShadowColor: 0xFFFFFF,
    dropShadowBlur: 2,
    dropShadowDistance: 1
  })

  return (
    <Container x={x} y={y}>
      {/* Player sprite */}
      <Graphics draw={drawPlayer} />
      
      {/* Nome do player */}
      {playerName && (
        <Text 
          text={playerName}
          style={nameStyle}
          anchor={0.5}
          x={0}
          y={-70}
        />
      )}
      
      {/* Indicador de movimento */}
      {isMoving && (
        <Graphics
          draw={(g) => {
            g.clear()
            g.beginFill(0xFFFFFF, 0.8)
            g.drawCircle(0, -80, 3)
            g.endFill()
          }}
        />
      )}
    </Container>
  )
}

export default Player
