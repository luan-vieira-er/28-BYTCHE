import { Sprite, Container, Graphics, Text } from '@pixi/react'
import { useState, useEffect, useCallback } from 'react'
import { TextStyle } from 'pixi.js'
import { useCharacterSprites } from '@/hooks/useCharacterSprites'

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
  }, [characterId])

  useEffect(() => {
    if (!spriteLoaded) return

    const interval = setInterval(() => {
      setAnimationTime(prev => prev + 100)
    }, 100)

    return () => clearInterval(interval)
  }, [spriteLoaded])

  const currentAnimation = isMoving ? `walk_${direction}` : animation

  useEffect(() => {
    if (currentAnimation !== lastAnimation) {
      setAnimationTime(0)
      setLastAnimation(currentAnimation)
    }
  }, [currentAnimation, lastAnimation])

  useEffect(() => {
    if (spriteLoaded && characterId) {
      const frame = getCurrentFrame(characterId, currentAnimation, animationTime)
      setCurrentTexture(frame)
    }
  }, [characterId, currentAnimation, animationTime, spriteLoaded, getCurrentFrame])

  const drawFallback = useCallback((g) => {
    g.clear()

    if (showShadow) {
      g.beginFill(0x000000, 0.2)
      g.drawEllipse(0, 15, 12, 4)
      g.endFill()
    }

    g.beginFill(fallbackColor)
    g.drawRoundedRect(-8, -15, 16, 25, 4)
    g.endFill()

    g.beginFill(0xFFDBB3)
    g.drawCircle(0, -20, 9)
    g.endFill()

    g.beginFill(0x000000)
    g.drawCircle(-3, -21, 1)
    g.drawCircle(3, -21, 1)
    g.endFill()

    g.lineStyle(1, 0x000000)
    g.arc(0, -18, 4, 0, Math.PI)

    if (isMoving) {
      const bob = Math.sin(animationTime * 0.01) * 2
      g.y = bob
    }
  }, [fallbackColor, showShadow, isMoving, animationTime])

  const drawShadow = useCallback((g) => {
    if (!showShadow) return

    g.clear()
    g.beginFill(0x000000, 0.3)
    g.drawEllipse(0, 0, 16, 6)
    g.endFill()
  }, [showShadow])

  const drawInteractionIndicator = useCallback((g) => {
    if (!showInteractionIndicator) return

    g.clear()
    const pulseScale = Math.sin(animationTime * 0.03) * 0.2 + 1
    const glowIntensity = Math.sin(animationTime * 0.02) * 0.3 + 0.7

    g.beginFill(0x56FF9E, 0.3 * glowIntensity)
    g.drawCircle(0, -50, 12 * pulseScale)
    g.endFill()

    g.beginFill(0x56FF9E, 0.6 * glowIntensity)
    g.drawCircle(0, -50, 8 * pulseScale)
    g.endFill()

    g.beginFill(0x4ECDC4, 0.9)
    g.drawCircle(0, -50, 4 * pulseScale)
    g.endFill()

    g.beginFill(0xFFFFFF, glowIntensity)
    g.drawCircle(0, -50, 2)
    g.endFill()

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
      {showShadow && (
        <Graphics
          draw={drawShadow}
          y={24 * scale}
        />
      )}

      {currentTexture && spriteLoaded ? (
        <Sprite
          texture={currentTexture}
          anchor={[0.5, 0.8]}
          scale={scale}
          y={0}
        />
      ) : (
        <Graphics
          draw={drawFallback}
          scale={scale}
        />
      )}

      {showInteractionIndicator && (
        <Graphics draw={drawInteractionIndicator} />
      )}

      {showName && name && (
        <Container>
          <Graphics
            draw={(g) => {
              g.clear()

              const textWidth = name.length * 6 + 12
              const textHeight = 16

              g.beginFill(0x131F24, 0.85)
              g.drawRoundedRect(-textWidth / 2, -textHeight / 2, textWidth, textHeight, 8)
              g.endFill()

              g.lineStyle(1, 0x56FF9E, 0.7)
              g.drawRoundedRect(-textWidth / 2, -textHeight / 2, textWidth, textHeight, 8)
            }}
            x={0}
            y={-170 * scale}
          />

          <Text
            text={name}
            style={nameStyle}
            anchor={0.5}
            x={0}
            y={-170 * scale}
          />
        </Container>
      )}

      {isLoading && !spriteLoaded && (
        <Container>
          <Graphics
            draw={(g) => {
              g.clear()

              g.lineStyle(2, 0x131F24, 0.3)
              g.drawCircle(0, -20, 8)

              const progress = (animationTime * 0.05) % (Math.PI * 2)
              g.lineStyle(2, 0x56FF9E, 0.9)
              g.arc(0, -20, 8, progress, progress + Math.PI * 1.5)

              g.beginFill(0x4ECDC4, 0.8)
              g.drawCircle(0, -20, 2)
              g.endFill()
            }}
          />

          <Graphics
            draw={(g) => {
              g.clear()

              g.beginFill(0x131F24, 0.8)
              g.drawRoundedRect(-25, -5, 50, 12, 6)
              g.endFill()

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
