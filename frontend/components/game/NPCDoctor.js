import { Container, Graphics, Text } from '@pixi/react'
import { useCallback, useEffect, useState } from 'react'
import { TextStyle } from 'pixi.js'

const NPCDoctor = ({ x, y, isInteracting }) => {
  const [animationFrame, setAnimationFrame] = useState(0)
  const [isIdle, setIsIdle] = useState(true)

  // Animação idle
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(frame => (frame + 1) % 60)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Desenhar o Dr. Pixel
  const drawDoctor = useCallback((g) => {
    g.clear()

    // Sombra
    g.beginFill(0x000000, 0.2)
    g.drawEllipse(0, 45, 30, 10)
    g.endFill()

    // Corpo - jaleco branco
    g.beginFill(0xFFFFFF)
    g.drawRoundedRect(-20, -25, 40, 60, 10)
    g.endFill()

    // Contorno do jaleco
    g.lineStyle(2, 0xE2E8F0)
    g.drawRoundedRect(-20, -25, 40, 60, 10)

    // Cabeça
    g.beginFill(0xFFDBB3) // Cor da pele
    g.drawCircle(0, -45, 22)
    g.endFill()

    // Cabelo grisalho
    g.beginFill(0x9CA3AF)
    g.drawEllipse(0, -60, 25, 18)
    g.endFill()

    // Óculos
    g.lineStyle(2, 0x374151)
    g.drawCircle(-8, -45, 8)
    g.drawCircle(8, -45, 8)
    g.moveTo(0, -45)
    g.lineTo(0, -43)

    // Olhos atrás dos óculos
    g.beginFill(0x000000)
    g.drawCircle(-8, -45, 3)
    g.drawCircle(8, -45, 3)
    g.endFill()

    // Sorriso amigável
    g.lineStyle(3, 0x000000)
    g.arc(0, -38, 10, 0, Math.PI)

    // Estetoscópio
    g.lineStyle(4, 0x3B82F6)
    g.moveTo(-15, -10)
    g.bezierCurveTo(-25, -5, -25, 5, -15, 10)
    g.moveTo(15, -10)
    g.bezierCurveTo(25, -5, 25, 5, 15, 10)

    // Peças do estetoscópio
    g.beginFill(0x1E40AF)
    g.drawCircle(-15, 10, 4)
    g.drawCircle(15, 10, 4)
    g.endFill()

    // Braços
    g.lineStyle(8, 0xFFDBB3)
    const armBob = Math.sin(animationFrame * 0.1) * 2
    g.moveTo(-20, -15 + armBob)
    g.lineTo(-35, 5 - armBob)
    g.moveTo(20, -15 - armBob)
    g.lineTo(35, 5 + armBob)

    // Mãos
    g.beginFill(0xFFDBB3)
    g.drawCircle(-35, 5 - armBob, 6)
    g.drawCircle(35, 5 + armBob, 6)
    g.endFill()

    // Pernas
    g.lineStyle(10, 0x374151) // Calça escura
    g.moveTo(-10, 35)
    g.lineTo(-10, 55)
    g.moveTo(10, 35)
    g.lineTo(10, 55)

    // Sapatos médicos
    g.beginFill(0xFFFFFF)
    g.drawRoundedRect(-15, 55, 12, 8, 2)
    g.drawRoundedRect(3, 55, 12, 8, 2)
    g.endFill()

    // Crachá
    g.beginFill(0x3B82F6)
    g.drawRoundedRect(-8, -5, 16, 8, 2)
    g.endFill()

    // Texto do crachá (Dr. Pixel)
    g.beginFill(0xFFFFFF)
    g.drawRect(-6, -3, 2, 1)
    g.drawRect(-3, -3, 2, 1)
    g.drawRect(1, -3, 2, 1)
    g.drawRect(4, -3, 2, 1)
    g.endFill()

    // Efeito de brilho quando interagindo
    if (isInteracting) {
      const glowIntensity = Math.sin(animationFrame * 0.3) * 0.3 + 0.7
      g.beginFill(0x60A5FA, glowIntensity * 0.3)
      g.drawCircle(0, -20, 50)
      g.endFill()
    }

    // Partículas de "sabedoria" flutuando
    for (let i = 0; i < 3; i++) {
      const sparkleX = Math.sin(animationFrame * 0.1 + i * 2) * 30
      const sparkleY = -70 + Math.cos(animationFrame * 0.15 + i * 1.5) * 10
      const sparkleAlpha = Math.sin(animationFrame * 0.2 + i) * 0.5 + 0.5

      g.beginFill(0xFBBF24, sparkleAlpha)
      // Desenhar estrela customizada usando polígono
      const starSize = 3
      const starPoints = []
      for (let j = 0; j < 10; j++) {
        const angle = (j * Math.PI) / 5
        const radius = j % 2 === 0 ? starSize : starSize * 0.5
        starPoints.push(
          sparkleX + Math.cos(angle) * radius,
          sparkleY + Math.sin(angle) * radius
        )
      }
      g.drawPolygon(starPoints)
      g.endFill()
    }

  }, [animationFrame, isInteracting])

  // Indicador de interação
  const drawInteractionIndicator = useCallback((g) => {
    if (!isInteracting) return

    g.clear()
    const pulseScale = Math.sin(animationFrame * 0.3) * 0.2 + 1

    g.beginFill(0x10B981, 0.8)
    g.drawCircle(0, -90, 8 * pulseScale)
    g.endFill()

    g.beginFill(0xFFFFFF)
    g.drawCircle(0, -90, 4 * pulseScale)
    g.endFill()
  }, [animationFrame, isInteracting])

  const nameStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 16,
    fill: 0x1F2937,
    fontWeight: 'bold',
    dropShadow: true,
    dropShadowColor: 0xFFFFFF,
    dropShadowBlur: 3,
    dropShadowDistance: 1
  })

  const titleStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    fill: 0x6B7280,
    fontStyle: 'italic'
  })

  return (
    <Container x={x} y={y}>
      {/* Sprite do doutor */}
      <Graphics draw={drawDoctor} />

      {/* Indicador de interação */}
      <Graphics draw={drawInteractionIndicator} />

      {/* Nome */}
      <Text
        text="Dr. Pixel"
        style={nameStyle}
        anchor={0.5}
        x={0}
        y={-110}
      />

      {/* Título */}
      <Text
        text="Especialista em IA Médica"
        style={titleStyle}
        anchor={0.5}
        x={0}
        y={-95}
      />

      {/* Dica de interação */}
      {Math.abs(x - 300) < 100 && Math.abs(y - 500) < 100 && !isInteracting && (
        <Container>
          <Text
            text="Pressione ESPAÇO para conversar"
            style={new TextStyle({
              fontFamily: 'Arial',
              fontSize: 12,
              fill: 0x059669,
              fontWeight: 'bold',
              dropShadow: true,
              dropShadowColor: 0xFFFFFF,
              dropShadowBlur: 2
            })}
            anchor={0.5}
            x={0}
            y={70}
          />
        </Container>
      )}
    </Container>
  )
}

export default NPCDoctor
