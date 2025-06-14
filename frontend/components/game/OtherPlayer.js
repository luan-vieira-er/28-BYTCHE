import { useMemo } from 'react'
import { Container, Text, Graphics } from '@pixi/react'

const OtherPlayer = ({ x, y, playerName = 'Paciente' }) => {
  // Garantir que playerName seja sempre uma string válida
  const safeName = useMemo(() => {
    if (!playerName || typeof playerName !== 'string') {
      return 'Paciente'
    }
    return playerName.trim() || 'Paciente'
  }, [playerName])

  // Estilo do texto para Pixi.js
  const nameTextStyle = useMemo(() => ({
    fontFamily: 'Arial',
    fontSize: 12,
    fill: 0xFFFFFF,
    align: 'center',
    fontWeight: 'bold'
  }), [])

  const indicatorTextStyle = useMemo(() => ({
    fontFamily: 'Arial',
    fontSize: 10,
    fill: 0xFFFFFF,
    align: 'center'
  }), [])

  // Desenhar um personagem simples
  const drawPlayer = useMemo(() => (g) => {
    g.clear()

    // Sombra
    g.beginFill(0x000000, 0.3)
    g.drawEllipse(0, 20, 16, 6)
    g.endFill()

    // Corpo
    g.beginFill(0x4ECDC4)
    g.drawRoundedRect(-12, -20, 24, 35, 6)
    g.endFill()

    // Cabeça
    g.beginFill(0xFFDBB3)
    g.drawCircle(0, -30, 12)
    g.endFill()

    // Olhos
    g.beginFill(0x000000)
    g.drawCircle(-4, -32, 2)
    g.drawCircle(4, -32, 2)
    g.endFill()

    // Sorriso
    g.lineStyle(2, 0x000000)
    g.arc(0, -26, 6, 0, Math.PI)

    // Borda para destacar que é visualização médica
    g.lineStyle(2, 0x56FF9E, 0.8)
    g.drawRoundedRect(-12, -20, 24, 35, 6)
  }, [])

  return (
    <Container x={x} y={y}>
      {/* Sprite simples do personagem */}
      <Graphics draw={drawPlayer} />

      {/* Nome do player acima do personagem */}
      <Text
        text={safeName}
        style={nameTextStyle}
        x={0}
        y={-55}
        anchor={0.5}
      />

      {/* Indicador de que é visualização médica */}
      <Text
        text="👁️ Médico"
        style={indicatorTextStyle}
        x={0}
        y={35}
        anchor={0.5}
      />
    </Container>
  )
}

export default OtherPlayer
