import { Sprite, Container, Graphics, Text } from '@pixi/react'
import { useState, useEffect, useCallback } from 'react'
import { TextStyle } from 'pixi.js'
import { useCharacterSprites } from '@/hooks/useCharacterSprites'

/**
 * Componente para renderizar sprites de personagens com animações
 */
const CharacterSprite = ({
  characterId,
  x = 0,
  y = 0,
  scale = 3,
  animation = 'idle',
  isMoving = false,
  direction = 'down',
  showName = true,
  name = '',
  showShadow = true,
  showInteractionIndicator = false,
  onSpriteLoad = null,
  fallbackColor = 0x3182CE
}) => {
  const [animationTime, setAnimationTime] = useState(0)
  const [currentTexture, setCurrentTexture] = useState(null)
  const [spriteLoaded, setSpriteLoaded] = useState(false)
  const [lastAnimation, setLastAnimation] = useState('')

  const {
    loadCharacterSprite,
    getCurrentFrame,
    isSpriteLoaded,
    getCharacterInfo,
    isLoading
  } = useCharacterSprites()

  // Carrega o sprite quando o componente monta
  useEffect(() => {
    if (!characterId) return

    const loadSprite = async () => {
      try {
        if (!isSpriteLoaded(characterId)) {
          const spriteData = await loadCharacterSprite(characterId)
          if (spriteData) {
            setSpriteLoaded(true)
            if (onSpriteLoad) {
              onSpriteLoad(spriteData)
            }
          }
        } else {
          setSpriteLoaded(true)
        }
      } catch (error) {
        console.error('Erro ao carregar sprite:', error)
        setSpriteLoaded(false)
      }
    }

    loadSprite()
  }, [characterId]) // Removidas dependências problemáticas

  // Atualiza animação
  useEffect(() => {
    if (!spriteLoaded) return

    const interval = setInterval(() => {
      setAnimationTime(prev => prev + 100)
    }, 100)

    return () => clearInterval(interval)
  }, [spriteLoaded])

  // Determina animação baseada no movimento e direção
  const currentAnimation = isMoving ? `walk_${direction}` : animation

  // Reseta tempo de animação apenas quando a animação muda
  useEffect(() => {
    if (currentAnimation !== lastAnimation) {
      setAnimationTime(0)
      setLastAnimation(currentAnimation)
    }
  }, [currentAnimation, lastAnimation])

  // Atualiza texture atual
  useEffect(() => {
    if (spriteLoaded && characterId) {
      const frame = getCurrentFrame(characterId, currentAnimation, animationTime)
      setCurrentTexture(frame)
    }
  }, [characterId, currentAnimation, animationTime, spriteLoaded, getCurrentFrame])

  // Fallback: desenha personagem simples se sprite não carregar
  const drawFallback = useCallback((g) => {
    g.clear()

    // Sombra
    if (showShadow) {
      g.beginFill(0x000000, 0.2)
      g.drawEllipse(0, 15, 12, 4)
      g.endFill()
    }

    // Corpo
    g.beginFill(fallbackColor)
    g.drawRoundedRect(-8, -15, 16, 25, 4)
    g.endFill()

    // Cabeça
    g.beginFill(0xFFDBB3)
    g.drawCircle(0, -20, 9)
    g.endFill()

    // Olhos
    g.beginFill(0x000000)
    g.drawCircle(-3, -21, 1)
    g.drawCircle(3, -21, 1)
    g.endFill()

    // Sorriso
    g.lineStyle(1, 0x000000)
    g.arc(0, -18, 4, 0, Math.PI)

    // Animação simples de movimento
    if (isMoving) {
      const bob = Math.sin(animationTime * 0.01) * 2
      g.y = bob
    }
  }, [fallbackColor, showShadow, isMoving, animationTime])

  // Desenha sombra
  const drawShadow = useCallback((g) => {
    if (!showShadow) return

    g.clear()
    g.beginFill(0x000000, 0.3)
    g.drawEllipse(0, 0, 16, 6)
    g.endFill()
  }, [showShadow])

  // Desenha indicador de interação moderno
  const drawInteractionIndicator = useCallback((g) => {
    if (!showInteractionIndicator) return

    g.clear()
    const pulseScale = Math.sin(animationTime * 0.03) * 0.2 + 1
    const glowIntensity = Math.sin(animationTime * 0.02) * 0.3 + 0.7

    // Anel externo com glow
    g.beginFill(0x56FF9E, 0.3 * glowIntensity)
    g.drawCircle(0, -50, 12 * pulseScale)
    g.endFill()

    // Anel médio
    g.beginFill(0x56FF9E, 0.6 * glowIntensity)
    g.drawCircle(0, -50, 8 * pulseScale)
    g.endFill()

    // Centro com gradiente
    g.beginFill(0x4ECDC4, 0.9)
    g.drawCircle(0, -50, 4 * pulseScale)
    g.endFill()

    // Ponto central brilhante
    g.beginFill(0xFFFFFF, glowIntensity)
    g.drawCircle(0, -50, 2)
    g.endFill()

    // Partículas flutuantes
    for (let i = 0; i < 3; i++) {
      const angle = (animationTime * 0.01 + i * 2) % (Math.PI * 2)
      const radius = 15 + Math.sin(animationTime * 0.02 + i) * 3
      const particleX = Math.cos(angle) * radius
      const particleY = -50 + Math.sin(angle) * radius * 0.3

      g.beginFill(0x56FF9E, 0.6)
      g.drawCircle(particleX, particleY, 1.5)
      g.endFill()
    }
  }, [showInteractionIndicator, animationTime])

  // Estilo moderno para o nome
  const nameStyle = new TextStyle({
    fontFamily: 'Inter, Arial, sans-serif',
    fontSize: 11,
    fill: 0xFFFFFF,
    fontWeight: '600',
    dropShadow: true,
    dropShadowColor: 0x000000,
    dropShadowBlur: 4,
    dropShadowDistance: 1,
    dropShadowAlpha: 0.8
  })

  return (
    <Container x={x} y={y}>
      {/* Sombra */}
      {showShadow && (
        <Graphics
          draw={drawShadow}
          y={24 * scale}
        />
      )}

      {/* Sprite do personagem ou fallback */}
      {currentTexture && spriteLoaded ? (
        <Sprite
          texture={currentTexture}
          anchor={[0.5, 0.8]} // Ancora na base do sprite para melhor posicionamento
          scale={scale}
          y={0} // Sem offset adicional, o anchor já posiciona corretamente
        />
      ) : (
        <Graphics
          draw={drawFallback}
          scale={scale}
        />
      )}

      {/* Indicador de interação */}
      {showInteractionIndicator && (
        <Graphics draw={drawInteractionIndicator} />
      )}

      {/* Nome do personagem - apenas acima */}
      {showName && name && (
        <Container>
          {/* Fundo do nome com gradiente */}
          <Graphics
            draw={(g) => {
              g.clear()

              // Calcula dimensões do texto
              const textWidth = name.length * 6 + 12
              const textHeight = 16

              // Fundo com gradiente escuro
              g.beginFill(0x131F24, 0.85)
              g.drawRoundedRect(-textWidth/2, -textHeight/2, textWidth, textHeight, 8)
              g.endFill()

              // Borda com cor do tema
              g.lineStyle(1, 0x56FF9E, 0.7)
              g.drawRoundedRect(-textWidth/2, -textHeight/2, textWidth, textHeight, 8)
            }}
            x={0}
            y={-45 * scale}
          />

          {/* Texto do nome */}
          <Text
            text={name}
            style={nameStyle}
            anchor={0.5}
            x={0}
            y={-45 * scale}
          />
        </Container>
      )}

      {/* Indicador de carregamento moderno */}
      {isLoading && !spriteLoaded && (
        <Container>
          {/* Spinner animado */}
          <Graphics
            draw={(g) => {
              g.clear()

              // Círculo de fundo
              g.lineStyle(2, 0x131F24, 0.3)
              g.drawCircle(0, -20, 8)

              // Arco de progresso animado
              const progress = (animationTime * 0.05) % (Math.PI * 2)
              g.lineStyle(2, 0x56FF9E, 0.9)
              g.arc(0, -20, 8, progress, progress + Math.PI * 1.5)

              // Ponto central
              g.beginFill(0x4ECDC4, 0.8)
              g.drawCircle(0, -20, 2)
              g.endFill()
            }}
          />

          {/* Texto de carregamento com estilo moderno */}
          <Graphics
            draw={(g) => {
              g.clear()

              // Fundo do texto
              g.beginFill(0x131F24, 0.8)
              g.drawRoundedRect(-25, -5, 50, 12, 6)
              g.endFill()

              // Borda
              g.lineStyle(1, 0x56FF9E, 0.5)
              g.drawRoundedRect(-25, -5, 50, 12, 6)
            }}
            y={-5}
          />

          <Text
            text="Carregando..."
            style={new TextStyle({
              fontFamily: 'Inter, Arial, sans-serif',
              fontSize: 9,
              fill: 0x56FF9E,
              fontWeight: '500'
            })}
            anchor={0.5}
            x={0}
            y={1}
          />
        </Container>
      )}
    </Container>
  )
}

export default CharacterSprite
