/**
 * Utilitário para criar um tileset de demonstração
 * Usado quando o tileset real não está disponível
 */

export const createDemoTileset = () => {
  // Cria um canvas para desenhar o tileset
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  // Configurações do tileset
  const tileSize = 16
  const tilesPerRow = 8
  const tilesPerColumn = 4
  
  canvas.width = tilesPerRow * tileSize
  canvas.height = tilesPerColumn * tileSize
  
  // Cores para diferentes tipos de tiles
  const colors = {
    wall: '#8B7355',      // Marrom para paredes
    floor: '#F5F5DC',     // Bege para piso
    floorSpecial: '#E6E6FA', // Lavanda para áreas especiais
    waiting: '#ADD8E6',   // Azul claro para área de espera
    equipment: '#98FB98', // Verde claro para equipamentos
    treatment: '#FFB6C1', // Rosa claro para área de tratamento
    furniture: '#8B4513', // Marrom escuro para móveis
    chair: '#4169E1',     // Azul royal para cadeiras
    medical: '#FF6347',   // Vermelho tomate para equipamentos médicos
    bed: '#DC143C',       // Vermelho carmesim para camas
    sign: '#FFD700',      // Dourado para placas
    cross: '#FF0000',     // Vermelho para cruz médica
    plant: '#228B22'      // Verde floresta para plantas
  }
  
  // Função para desenhar um tile
  const drawTile = (x, y, color, pattern = 'solid') => {
    const pixelX = x * tileSize
    const pixelY = y * tileSize
    
    ctx.fillStyle = color
    ctx.fillRect(pixelX, pixelY, tileSize, tileSize)
    
    // Adiciona padrões específicos
    switch (pattern) {
      case 'border':
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 1
        ctx.strokeRect(pixelX, pixelY, tileSize, tileSize)
        break
      case 'cross':
        ctx.fillStyle = '#FF0000'
        // Cruz horizontal
        ctx.fillRect(pixelX + 2, pixelY + 6, 12, 4)
        // Cruz vertical
        ctx.fillRect(pixelX + 6, pixelY + 2, 4, 12)
        break
      case 'chair':
        ctx.fillStyle = '#1E40AF'
        ctx.fillRect(pixelX + 2, pixelY + 2, 12, 8)
        ctx.fillRect(pixelX + 2, pixelY + 2, 12, 2)
        break
      case 'equipment':
        ctx.fillStyle = '#10B981'
        ctx.beginPath()
        ctx.arc(pixelX + 8, pixelY + 8, 6, 0, 2 * Math.PI)
        ctx.fill()
        break
    }
  }
  
  // Desenha os tiles
  // Linha 0: Tiles básicos
  drawTile(0, 0, colors.wall, 'border')        // ID 1: Parede
  drawTile(1, 0, colors.floor)                 // ID 2: Piso normal
  drawTile(2, 0, colors.floorSpecial)          // ID 3: Piso especial
  drawTile(3, 0, colors.waiting)               // ID 4: Área de espera
  drawTile(4, 0, colors.equipment)             // ID 5: Área de equipamentos
  drawTile(5, 0, colors.treatment)             // ID 6: Área de tratamento
  drawTile(6, 0, colors.furniture)             // ID 7: Móveis básicos
  drawTile(7, 0, colors.floor)                 // ID 8: Reservado
  
  // Linha 1: Móveis e objetos
  drawTile(0, 1, colors.furniture, 'border')   // ID 9: Mesa/balcão
  drawTile(1, 1, colors.chair, 'chair')        // ID 10: Cadeira
  drawTile(2, 1, colors.medical, 'equipment')  // ID 11: Equipamento médico
  drawTile(3, 1, colors.bed, 'border')         // ID 12: Cama/maca
  drawTile(4, 1, colors.furniture)             // ID 13: Móvel genérico
  drawTile(5, 1, colors.floor)                 // ID 14: Reservado
  drawTile(6, 1, colors.floor)                 // ID 15: Reservado
  drawTile(7, 1, colors.floor)                 // ID 16: Reservado
  
  // Linha 2: Decorações
  drawTile(0, 2, colors.sign, 'border')        // ID 17: Placa
  drawTile(1, 2, colors.floor, 'cross')        // ID 18: Cruz médica
  drawTile(2, 2, colors.plant)                 // ID 19: Planta
  drawTile(3, 2, colors.floor)                 // ID 20: Reservado
  drawTile(4, 2, colors.floor)                 // ID 21: Reservado
  drawTile(5, 2, colors.floor)                 // ID 22: Reservado
  drawTile(6, 2, colors.floor)                 // ID 23: Reservado
  drawTile(7, 2, colors.floor)                 // ID 24: Reservado
  
  // Linha 3: Reservada para expansão
  for (let x = 0; x < tilesPerRow; x++) {
    drawTile(x, 3, colors.floor)
  }
  
  // Converte canvas para blob e retorna URL
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      resolve(url)
    })
  })
}

/**
 * Cria e salva um tileset de demonstração
 */
export const setupDemoTileset = async () => {
  try {
    const tilesetUrl = await createDemoTileset()
    console.log('Tileset de demonstração criado:', tilesetUrl)
    return tilesetUrl
  } catch (error) {
    console.error('Erro ao criar tileset de demonstração:', error)
    return null
  }
}

export default createDemoTileset
