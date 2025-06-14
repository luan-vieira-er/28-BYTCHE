import { Container, Graphics, Text } from '@pixi/react'
import { useCallback, useState, useEffect } from 'react'
import { TextStyle } from 'pixi.js'
import TileMap from './TileMap'
import { HOSPITAL_MAP } from '@/data/hospitalMap'
import { useAssets } from '@/hooks/useAssets'

const Hospital = () => {
  const [animationFrame, setAnimationFrame] = useState(0)
  const { isAssetLoaded } = useAssets()

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(frame => (frame + 1) % 120)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Desenhar o piso do hospital
  const drawFloor = useCallback((g) => {
    g.clear()

    // Piso base
    g.beginFill(0xF8FAFC)
    g.drawRect(0, 0, 1200, 800)
    g.endFill()

    // Padrão de azulejos
    g.lineStyle(1, 0xE2E8F0, 0.5)
    for (let x = 0; x < 1200; x += 50) {
      g.moveTo(x, 0)
      g.lineTo(x, 800)
    }
    for (let y = 0; y < 800; y += 50) {
      g.moveTo(0, y)
      g.lineTo(1200, y)
    }

    // Linha central decorativa
    g.lineStyle(4, 0x3B82F6, 0.3)
    g.moveTo(0, 400)
    g.lineTo(1200, 400)

  }, [])

  // Desenhar as paredes
  const drawWalls = useCallback((g) => {
    g.clear()

    // Parede superior
    g.beginFill(0xE5E7EB)
    g.drawRect(0, 0, 1200, 50)
    g.endFill()

    // Parede inferior
    g.beginFill(0xE5E7EB)
    g.drawRect(0, 750, 1200, 50)
    g.endFill()

    // Parede esquerda
    g.beginFill(0xE5E7EB)
    g.drawRect(0, 0, 50, 800)
    g.endFill()

    // Parede direita
    g.beginFill(0xE5E7EB)
    g.drawRect(1150, 0, 50, 800)
    g.endFill()

    // Detalhes das paredes
    g.lineStyle(2, 0xD1D5DB)
    g.drawRect(0, 0, 1200, 800)

  }, [])

  // Desenhar móveis e equipamentos médicos
  const drawFurniture = useCallback((g) => {
    g.clear()

    // Recepção
    g.beginFill(0x8B5CF6)
    g.drawRoundedRect(100, 100, 200, 80, 10)
    g.endFill()

    g.beginFill(0xFFFFFF)
    g.drawRoundedRect(110, 110, 180, 60, 5)
    g.endFill()

    // Cadeiras de espera
    for (let i = 0; i < 4; i++) {
      const chairX = 400 + i * 60
      const chairY = 150

      g.beginFill(0x3B82F6)
      g.drawRoundedRect(chairX, chairY, 40, 40, 5)
      g.endFill()

      g.beginFill(0x1E40AF)
      g.drawRoundedRect(chairX + 5, chairY - 30, 30, 35, 3)
      g.endFill()
    }

    // Equipamentos médicos
    // Máquina de pressão
    g.beginFill(0x6B7280)
    g.drawRoundedRect(800, 200, 60, 80, 8)
    g.endFill()

    g.beginFill(0x10B981)
    g.drawCircle(830, 230, 15)
    g.endFill()

    // Balança
    g.beginFill(0xF59E0B)
    g.drawRoundedRect(900, 250, 50, 30, 5)
    g.endFill()

    // Maca médica
    g.beginFill(0xEF4444)
    g.drawRoundedRect(200, 500, 120, 60, 10)
    g.endFill()

    g.beginFill(0xFFFFFF)
    g.drawRoundedRect(210, 510, 100, 40, 5)
    g.endFill()

    // Armário de medicamentos
    g.beginFill(0x374151)
    g.drawRoundedRect(900, 500, 80, 120, 8)
    g.endFill()

    g.lineStyle(2, 0x6B7280)
    g.moveTo(940, 520)
    g.lineTo(940, 600)

    // Prateleiras
    for (let i = 0; i < 3; i++) {
      g.lineStyle(1, 0x9CA3AF)
      g.moveTo(910, 540 + i * 20)
      g.lineTo(970, 540 + i * 20)
    }

    // Plantas decorativas
    g.beginFill(0x059669)
    g.drawCircle(150, 300, 20)
    g.drawCircle(1000, 300, 20)
    g.endFill()

    g.beginFill(0x7C2D12)
    g.drawRect(145, 315, 10, 15)
    g.drawRect(995, 315, 10, 15)
    g.endFill()

  }, [])

  // Desenhar sinalizações
  const drawSigns = useCallback((g) => {
    g.clear()

    // Placa da recepção
    g.beginFill(0x3B82F6)
    g.drawRoundedRect(150, 60, 100, 30, 5)
    g.endFill()

    // Cruz médica na parede
    g.beginFill(0xEF4444)
    g.drawRect(580, 70, 40, 10)
    g.drawRect(595, 55, 10, 40)
    g.endFill()

    // Setas direcionais
    g.beginFill(0x10B981)
    // Seta para triagem
    g.moveTo(500, 300)
    g.lineTo(520, 290)
    g.lineTo(520, 295)
    g.lineTo(540, 295)
    g.lineTo(540, 305)
    g.lineTo(520, 305)
    g.lineTo(520, 310)
    g.closePath()
    g.endFill()

  }, [])

  // Efeitos de iluminação
  const drawLighting = useCallback((g) => {
    g.clear()

    // Luzes do teto (efeito pulsante)
    const lightIntensity = Math.sin(animationFrame * 0.1) * 0.1 + 0.9

    for (let x = 200; x < 1000; x += 200) {
      for (let y = 200; y < 600; y += 200) {
        g.beginFill(0xFEF3C7, lightIntensity * 0.3)
        g.drawCircle(x, y, 80)
        g.endFill()

        g.beginFill(0xFFFFFF, lightIntensity * 0.1)
        g.drawCircle(x, y, 40)
        g.endFill()
      }
    }

  }, [animationFrame])

  const labelStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 14,
    fill: 0xFFFFFF,
    fontWeight: 'bold'
  })

  const signStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    fill: 0x1F2937,
    fontWeight: 'bold'
  })

  // Verifica se deve usar tilemap ou fallback
  const useTilemap = isAssetLoaded('tiny-town')

  if (useTilemap) {
    // Renderiza usando tilemap
    return (
      <Container>
        {/* Tilemap do hospital */}
        <TileMap
          mapData={HOSPITAL_MAP}
          tilesetName="tiny-town"
          tileWidth={16}
          tileHeight={16}
          scale={3}
          offsetX={0}
          offsetY={0}
        />

        {/* Efeitos de iluminação */}
        <Graphics draw={drawLighting} />

        {/* Textos e labels */}
        <Text
          text="RECEPÇÃO"
          style={labelStyle}
          anchor={0.5}
          x={200}
          y={75}
        />

        <Text
          text="ÁREA DE ESPERA"
          style={signStyle}
          anchor={0.5}
          x={520}
          y={120}
        />

        <Text
          text="TRIAGEM ➜"
          style={signStyle}
          anchor={0.5}
          x={570}
          y={300}
        />

        <Text
          text="EQUIPAMENTOS"
          style={signStyle}
          anchor={0.5}
          x={830}
          y={170}
        />

        <Text
          text="FARMÁCIA"
          style={signStyle}
          anchor={0.5}
          x={940}
          y={470}
        />

        {/* Instruções de movimento */}
        <Text
          text="Use as setas ↑↓←→ ou WASD para se mover"
          style={new TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 0x6B7280,
            fontStyle: 'italic'
          })}
          anchor={0.5}
          x={600}
          y={750}
        />
      </Container>
    )
  }

  // Fallback: renderiza usando Graphics (sistema atual)
  return (
    <Container>
      {/* Camadas do cenário */}
      <Graphics draw={drawFloor} />
      <Graphics draw={drawLighting} />
      <Graphics draw={drawWalls} />
      <Graphics draw={drawFurniture} />
      <Graphics draw={drawSigns} />

      {/* Textos e labels */}
      <Text
        text="RECEPÇÃO"
        style={labelStyle}
        anchor={0.5}
        x={200}
        y={75}
      />

      <Text
        text="ÁREA DE ESPERA"
        style={signStyle}
        anchor={0.5}
        x={520}
        y={120}
      />

      <Text
        text="TRIAGEM ➜"
        style={signStyle}
        anchor={0.5}
        x={570}
        y={300}
      />

      <Text
        text="EQUIPAMENTOS"
        style={signStyle}
        anchor={0.5}
        x={830}
        y={170}
      />

      <Text
        text="FARMÁCIA"
        style={signStyle}
        anchor={0.5}
        x={940}
        y={470}
      />

      {/* Instruções de movimento */}
      <Text
        text="Use as setas ↑↓←→ ou WASD para se mover"
        style={new TextStyle({
          fontFamily: 'Arial',
          fontSize: 12,
          fill: 0x6B7280,
          fontStyle: 'italic'
        })}
        anchor={0.5}
        x={600}
        y={750}
      />
    </Container>
  )
}

export default Hospital
