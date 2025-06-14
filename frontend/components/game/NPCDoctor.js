import { Container, Text } from '@pixi/react'
import { useEffect, useState } from 'react'
import { TextStyle } from 'pixi.js'
import CharacterSprite from './CharacterSprite'
import { getDoctorConfig, getDoctorSpriteId } from '@/utils/characterMapping'

const NPCDoctor = ({ x, y, isInteracting, doctorConfig }) => {
  const [animationFrame, setAnimationFrame] = useState(0)
  const [isIdle, setIsIdle] = useState(true)

  // Obtém configuração do médico selecionado usando o mapeamento
  const mappedDoctor = getDoctorConfig({ doctor: doctorConfig })
  const doctorId = getDoctorSpriteId(doctorConfig)
  const doctorName = mappedDoctor.name

  // Animação idle (mantida para compatibilidade)
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(frame => (frame + 1) % 60)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container x={x} y={y}>
      {/* Sprite do médico */}
      <CharacterSprite
        characterId={doctorId}
        x={0}
        y={0}
        scale={0.5} // Reduzido para sprites HD (192x256 -> ~96x128)
        animation={isInteracting ? 'talk' : 'idle'}
        isMoving={false}
        direction="down"
        showName={true}
        name={doctorName}
        showShadow={true}
        showInteractionIndicator={isInteracting}
        fallbackColor={mappedDoctor.fallbackColor}
        onSpriteLoad={(spriteData) => {
          console.log(`✅ Sprite do médico carregado: ${doctorId}`, spriteData)
          console.log(`👨‍⚕️ Médico mapeado:`, mappedDoctor)
        }}
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
